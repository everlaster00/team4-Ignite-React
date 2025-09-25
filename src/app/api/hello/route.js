import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({
    message: '안녕하세요! 저는 GET 요청에 대한 응답입니다.',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'POST 요청을 받았습니다.',
    receivedData: body,
  });
}

export async function PUT(request) {
  const body = await request.json();

  return NextResponse.json({
    message: 'PUT 요청을 받았습니다.',
    updatedData: body,
  });
}

export async function DELETE(request) {
  return NextResponse.json({
    message: 'DELETE 요청으로 데이터를 삭제했습니다.',
  });
}
