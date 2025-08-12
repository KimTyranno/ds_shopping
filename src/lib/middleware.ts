import { locales } from '@/i18n/routing'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  let supabaseResponse = response

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

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

  if (!user && !isAuthPage && !isPublicPage) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  return response
}
