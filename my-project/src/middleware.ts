import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const authPages = ['/signup', '/login'];
const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;
  const isAuthenticated = !!token;

  // ✅ Redirect logged-in users away from login/signup
  if (isAuthenticated && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard/pets', request.url));
  }

  // 🔒 Protect dashboard routes
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup',
  ],
};
