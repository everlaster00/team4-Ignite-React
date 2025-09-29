// app/api/users/routeModule.js
import Prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    const user = await Prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      {
        error: '사용자를 생성할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}

// GET 요청 - 모든 사용자 가져오기
export async function GET() {
  try {
    // 모든 사용자를 데이터베이스에서 가져옵니다
    const users = await prisma.user.findMany({
      // 각 사용자가 쓴 글도 함께 가져옵니다
      include: {
        posts: true
      }
    })

    return NextResponse.json(users)

  } catch (error) {
    return NextResponse.json(
      { error: "사용자를 가져올 수 없습니다" },
      { status: 500 }
    )
  }
}
