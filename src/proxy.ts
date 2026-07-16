import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Optimistic gate for the admin area (real checks also happen in each route
// handler via requireSession). Redirects unauthenticated visitors to the
// login page, and authenticated ones away from it.
export async function proxy(request: NextRequest) {
  const valid = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = request.nextUrl.pathname === "/admin/login";

  if (!valid && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (valid && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
