// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const connectionId = request.cookies.get('connection_id')?.value;
  const pathname = request.nextUrl.pathname;
  
  // API 라우트는 건너뛰기 (팀원들 작업 보호)
  if (pathname.startsWith('/api')) {
    return response;
  }
  
  // connection_id 없는 첫 방문자
  if (!connectionId) {
    // 클라이언트에게 즉시 식별 필요하다고 알림
    response.headers.set('X-Needs-Identification', 'true');
    response.headers.set('X-First-Visit', 'true');
  } else {
    // 기존 방문자 - connection_id를 헤더로 전달 (옵션)
    response.headers.set('X-Connection-Id', connectionId);
  }
  
  return response;
}

export const config = {
  matcher: [
    // 정적 파일, API 제외한 모든 경로
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};