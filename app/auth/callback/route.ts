import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}&error_description=${encodeURIComponent(errorDescription || '')}`, requestUrl.origin)
    )
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(
          new URL(`/?error=${encodeURIComponent('auth_error')}&error_description=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
        )
      }

      if (data.user) {
        // Successful authentication
        console.log('User authenticated:', data.user.email)
        
        // Redirect to the intended page or dashboard
        const redirectUrl = next.startsWith('/') ? next : '/'
        return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
      }
    } catch (error) {
      console.error('Unexpected auth error:', error)
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('unexpected_error')}&error_description=${encodeURIComponent('An unexpected error occurred during authentication')}`, requestUrl.origin)
      )
    }
  }

  // No code parameter, redirect to home
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}