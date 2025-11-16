import { NextResponse } from "next/server";
import { prismaMain } from "@/lib/prismaMain";

const POSTS_PER_PAGE = 10; // 페이지당 게시물 수 기본값

/**
 * GET 요청 처리: 게시물 목록을 조회하고, 정렬 및 페이지네이션을 적용합니다.
 * @param {Request} request - Next.js Request 객체
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. 쿼리 파라미터 파싱
    const sort = searchParams.get("sort") || "latest";
    
    // ⭐ [핵심 수정] 클라이언트가 보낸 "offset" 파라미터를 읽어 skip에 사용
    const offset = parseInt(searchParams.get("offset") || "0", 10); 
    const take = parseInt(
      searchParams.get("take") || String(POSTS_PER_PAGE),
      10
    );

    // 2. 정렬 조건 설정
    let orderBy = {};

    if (sort === "flame") {
      orderBy = {
        likes: {
          _count: "desc",
        },
      };
    } else {
      // '최신순' (latest) 정렬
      orderBy = { createdAt: "desc" };
    }

    // ⭐ [핵심 추가] 전체 게시글 개수를 계산
    const totalCount = await prismaMain.post.count({
      where: {
          status: "PUBLISHED",
      },
    });

    // 3. Prisma 쿼리 실행
    const posts = await prismaMain.post.findMany({
      where: {
        status: "PUBLISHED", // 게시된 글만 조회
      },
      orderBy: orderBy,
      skip: Math.max(0, offset), // ⭐ [핵심 적용] offset 변수 사용
      take: Math.max(1, take),

      select: {
        id: true, 
        title: true, 
        anonym: true, 
        clientIp: true, 
        category: true, 
        createdAt: true, 
        views: true, 
        _count: {
          select: {
            likes: true, 
            comments: true, 
          },
        },
      },
    });

    // 4. 결과 가공 (카운트 평탄화)
    const formattedPosts = posts.map((post) => ({
      ...post,
      likeCount: post._count.likes, 
      commentCount: post._count.comments, 
      _count: undefined,
    }));

    // ⭐ [핵심 수정] posts와 totalCount를 함께 반환
    return NextResponse.json(
    { posts: formattedPosts, totalCount: totalCount }, 
    { status: 200 }
);
  } catch (error) {
    console.error("❌ Fireboard list API error:", error);
    return NextResponse.json(
      { error: "게시물 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}