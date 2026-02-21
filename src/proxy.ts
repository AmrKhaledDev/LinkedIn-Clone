import { auth as proxy } from "@/auth";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./lib/GetUser";
// ==============================================================
export default proxy(async (req: NextRequest) => {
  const authRoutes = ["/login", "/register", "/credential-login"];
  const pathname = req.nextUrl.pathname;
  const user: User | null = await GetUser();

  if (authRoutes.includes(pathname)) {
    if (user)
      return NextResponse.redirect(new URL("/linkedin", req.nextUrl.origin));
  }
  if (pathname.startsWith("/linkedin")) {
    if (!user)
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  if (pathname == "/") {
    if (user)
      return NextResponse.redirect(new URL("/linkedin", req.nextUrl.origin));
    if (!user)
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  if (pathname.startsWith("/verify") && user)
    return NextResponse.redirect(new URL("/linkedin", req.nextUrl.origin));
});

export const config = {
  matcher: [
    "/login",
    "/linkedin/:path*",
    "/",
    "/register",
    "/credential-login",
    "/verify",
  ],
};
