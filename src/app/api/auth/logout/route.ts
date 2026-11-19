import { NextResponse } from "next/server";
import { deleteSessionCookie, getSessionFromCookies } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST() {
  try {
    const session = await getSessionFromCookies();

    if (session) {
      await logAudit({
        userId: session.userId,
        userEmail: session.email,
        userRole: session.role,
        action: "USER_LOGOUT",
        entityType: "AUTH",
        entityId: session.userId,
      });
    }

    await deleteSessionCookie();

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
