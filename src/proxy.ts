import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = Boolean(getSessionCookie(request));

  if (loggedIn && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !loggedIn &&
    (pathname === "/profile" || pathname.startsWith("/profile/"))
  ) {
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("reason", "protected");
    signIn.searchParams.set("next", pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/profile", "/profile/:path*"],
};
