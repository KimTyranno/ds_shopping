import { locales } from '@/i18n/routing'
import { NextResponse, type NextRequest } from 'next/server'

export function updateSession(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get('sb-access-token')?.value

  // locale을 제거한 경로 추출
  const localePrefixPattern = new RegExp(`^/(${locales.join('|')})`)
  // locale만 있는 경로(/en, /ko)라면 빈문자열이 되니까 루트경로(/)로 대체
  const pathname =
    request.nextUrl.pathname.replace(localePrefixPattern, '') || '/'

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/signup')

  const isPublicPage =
    pathname === '/' ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/categories')

  if (!token && !isAuthPage && !isPublicPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  return response
}
