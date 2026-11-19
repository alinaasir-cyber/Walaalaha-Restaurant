import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signSessionToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { logAudit } from "@/lib/audit";

// In-Memory Rate Limiter for Brute-Force Protection
// Tracks attempts per IP: max 5 attempts per 15-minute window
const rateLimitMap = new Map<string, { attempts: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { attempts: 1, resetAt: now + 15 * 60 * 1000 });
    return { allowed: true };
  }

  if (record.attempts >= 5) {
    const waitSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  record.attempts += 1;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // 1. Rate Limiting Check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // 2. Validate Input with Zod
    const body = await req.json();
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // 3. Find User in NeonDB
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { branch: true },
    });

    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Verify Hashed Password using bcrypt
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5. Generate Secure JWT Token & Set HttpOnly Cookie
    const token = await signSessionToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      branchId: user.branchId,
    });

    await setSessionCookie(token);

    // 6. Record Audit Log
    await logAudit({
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      action: "USER_LOGIN",
      entityType: "AUTH",
      entityId: user.id,
      ipAddress: ip,
      details: { branch: user.branch?.name || "None" },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch?.name,
      },
    });
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
