import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user");

  let userData: { token?: string } | null = null;
  if (userCookie) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/u/home", request.url));
  }

  if (pathname === "/u/home") {
    return NextResponse.next();
  }

  if (userData?.token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/u/home", request.url));
  }

  return NextResponse.next();
}
