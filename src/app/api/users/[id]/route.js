import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  return NextResponse.json({
    message: `${id}번 사용자에 대한 조회 요청을 받았습니다.`,
  });
}
