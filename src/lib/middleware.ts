import { NextResponse, type NextRequest } from 'next/server'

export function updateSession(request: NextRequest) {
  const token = request.cookies.get('sb-access-token')?.value

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  const isPublicPage =
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/products') ||
    request.nextUrl.pathname.startsWith('/categories')

  if (!token && !isAuthPage && !isPublicPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
