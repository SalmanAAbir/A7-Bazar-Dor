import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = Boolean(getSessionCookie(request));

  if (loggedIn && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !loggedIn &&
    (pathname === "/profile" || pathname.startsWith("/profile/"))
  ) {
    const signIn = new URL("/signin", request.url);
    signIn.searchParams.set("reason", "protected");
    signIn.searchParams.set("next", pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/profile", "/profile/:path*"],
};
