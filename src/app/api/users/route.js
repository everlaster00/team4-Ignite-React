import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  return NextResponse.json({
    message: `${searchParams.get('id')}번 사용자에 대한 조회 요청을 받았습니다.`,
  });
}
