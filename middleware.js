import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the path is public
  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Get auth token from headers
  const authHeader = request.headers.get('Authorization');
  
  // Get user from localStorage on client side
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    
    // Redirect to login if no user and trying to access protected route
    if (!user && !isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to game if user exists and trying to access public routes
    if (user && isPublicPath) {
      return NextResponse.redirect(new URL('/game', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};