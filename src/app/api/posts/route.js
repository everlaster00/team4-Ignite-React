// app/api/posts/route.js
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

// 새 글 작성하기
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, content, authorEmail } = body

    // 먼저 작성자를 찾습니다
    const author = await prisma.user.findUnique({
      where: { email: authorEmail }
    })

    if (!author) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다" },
        { status: 404 }
      )
    }

    // 글을 작성합니다
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: author.id
      }
    })

    return NextResponse.json(post)

  } catch (error) {
    return NextResponse.json(
      { error: "글을 작성할 수 없습니다" },
      { status: 500 }
    )
  }
}

// 모든 글 가져오기
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true // 작성자 정보도 함께 가져옵니다
      },
      orderBy: {
        createdAt: 'desc' // 최신 글이 먼저 나오도록
      }
    })

    return NextResponse.json(posts)

  } catch (error) {
    return NextResponse.json(
      { error: "글을 가져올 수 없습니다" },
      { status: 500 }
    )
  }
}
