import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "walaalaha-restaurant-super-secret-jwt-key-2026-auth";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public customer-facing routes and assets without login
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/website") ||
    pathname.startsWith("/order") ||
    pathname.startsWith("/api/customer") ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 2. Check session token cookie
  const token = request.cookies.get("walaalaha_session")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  try {
    // 3. Verify token authenticity with unified JWT_SECRET
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    // Invalid or expired token -> redirect to login & clear cookie
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("from", pathname);
    }
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("walaalaha_session");
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
