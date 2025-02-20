import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("ebazar")?.value;
  const adminToken = req.cookies.get("e_bazar")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard/admin/")) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!adminToken && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if ((token || adminToken) && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
