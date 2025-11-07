// src/app/api/products/LogicNotFound404/random/route.js
import { NextResponse } from "next/server";
import { prismaJH as prisma } from "@/lib/prismaJH"; // <= 실제 사용하는 클라이언트로 변경

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 활성화된 명언 개수
    const total = await prisma.devQuote.count({
      where: { isActive: true },
    });

    if (total === 0) {
      return NextResponse.json(
        { error: "등록된 명언이 없습니다." },
        { status: 404 }
      );
    }

    // 랜덤 offset
    const skip = Math.floor(Math.random() * total);

    const quote = await prisma.devQuote.findFirst({
      where: { isActive: true },
      skip,
      take: 1,
      select: {
        id: true,
        text: true,
        author: true,
      },
    });

    if (!quote) {
      return NextResponse.json(
        { error: "명언을 가져오지 못했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      quote,
      at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("GET /LogicNotFound404/random error:", err);
    return NextResponse.json(
      { error: "서버 내부 오류로 명언을 가져오지 못했습니다." },
      { status: 500 }
    );
  }
}