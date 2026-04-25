import { NextResponse } from 'next/server'

// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/'
  }

  if (code) {
    const supabase = await createClient()
    // Supabase client가 session 자동 저장
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const user = data.user
      await supabase.from('profiles').upsert({
        id: user.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name: user.user_metadata.user_name,
        email: user.email || null,
        last_sign_in_at: user.last_sign_in_at,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        avatar: user.user_metadata.avatar_url,
      })

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
      console.error('auth error:', error)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
