//root/middleware.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secsecsecey-key-my';
const GUEST_COOKIE_NAME = 'auth_token_guest';
const IDENTIFY_API_ROUTE = '/api/auth/identify';

export const config = {
  matcher: ['/api/:path*'],
};

export async function middleware(request: NextRequest) {
  console.log("미들웨어 작동");
  if (request.nextUrl.pathname === IDENTIFY_API_ROUTE ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(GUEST_COOKIE_NAME)?.value;

  let connectionId: string | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(token,JWT_SECRET) as { connectionId: string };
      connectionId = decoded.connectionId;
    } catch (error){
      console.warn("Middleware: JWT 검증 실패, 신규 발급 요청 필요.", error)
    }
  }

  if (!connectionId) {

    console.log("미들웨어:검문소로 보냅니다")
    return NextResponse.redirect(new URL(IDENTIFY_API_ROUTE, request.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Connection-ID',connectionId);

  return response;
}