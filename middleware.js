// middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  // 보호할 경로들
  const protectedPaths = ['/dashboard', '/profile', '/write']
  const path = request.nextUrl.pathname

  // 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some(protectedPath =>
    path.startsWith(protectedPath)
  )

  if (isProtectedPath) {
    // 토큰(세션) 확인
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    // 로그인하지 않았으면 로그인 페이지로 리다이렉트
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/write/:path*']
}
