import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'

/** 이메일 인증관련은 여기로 오는듯? */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // 인증이 완료되면 next로 지정된 경로로 이동시킴
      redirect(next)

      /**
       * next가 /로 시작하는 절대경로면 http://localhost:3000/next경로
       * /없이 상대경로면 http://localhost:3000/api/auth/next경로
       */
      // return NextResponse.redirect(new URL(next, request.url))
    }
  }
  // 오류페이지로 이동시킴
  redirect('/auth/auth-code-error')
}
