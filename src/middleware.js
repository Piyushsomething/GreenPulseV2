// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("access_token_login");
  const isadmin = request.cookies.get("IsAdmin");

  // Protect Dashboard route
  if (url.pathname.startsWith("/Dashboard") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Protect Admin route
  if (url.pathname.startsWith("/admin") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  

  return NextResponse.next();
}


export const config = {
  matcher: ["/Dashboard/:path*", "/admin/:path*"],
};
