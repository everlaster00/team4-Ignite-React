// app/api/auth/identify/route.js
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prismaMain } from '@/lib/prismaMain';
import { v4 as uuidv4 } from 'uuid';

// IP 추출 헬퍼 함수 (Vercel, Cloudflare, 일반 서버 대응)
function getClientIp(headersList) {
  return (
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    'unknown'
  );
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();
    
    const existingConnectionId = cookieStore.get('connection_id')?.value;
    const clientIp = getClientIp(headersList);
    // const needsIdentification = headersList.get('X-Needs-Identification');
    
    let connectionId = existingConnectionId;
    let isNewConnection = false;
    let action = 'refresh'; // 'create', 'refresh', 'recreate'

    // 케이스 1: 쿠키 없음 → 신규 방문자
    if (!connectionId) {
      connectionId = uuidv4();
      isNewConnection = true;
      action = 'create';

      await prismaMain.connection.create({
        data: {
          id: connectionId,
          ipAddress: clientIp,
        },
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('✨ 신규 Connection 생성:', connectionId);
      }
    } 
    // 케이스 2: 쿠키 있음 → DB 검증
    else {
      const connection = await prismaMain.connection.findUnique({
        where: { id: connectionId },
      });

      // 케이스 2-1: DB에 없는 connection_id (쿠키 조작 의심)
      if (!connection) {
        const oldId = connectionId;
        connectionId = uuidv4();
        isNewConnection = true;
        action = 'recreate';

        await prismaMain.connection.create({
          data: {
            id: connectionId,
            ipAddress: clientIp,
          },
        });

        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ 유효하지 않은 Connection 발견, 재생성:', {
            old: oldId,
            new: connectionId,
          });
        }
      } 
      // 케이스 2-2: 정상 방문자 → updateAt 갱신 + IP 업데이트
      else {
        await prismaMain.connection.update({
          where: { id: connectionId },
          data: { 
            ipAddress: clientIp, // IP 변경 추적 (Wi-Fi → LTE 등)
          },
        });

        action = 'refresh';
      }
    }

    // 쿠키 설정/갱신 (1년 유효)
    cookieStore.set('connection_id', connectionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      connectionId,
      isNewConnection,
      action,
      ipAddress: clientIp,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Connection identify error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Identification failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// GET: 현재 connection 상태 조회
export async function GET() {
  try {
    const cookieStore = await cookies();
    const connectionId = cookieStore.get('connection_id')?.value;
    
    if (!connectionId) {
      return NextResponse.json({
        connectionId: null,
        hasConnection: false,
      });
    }

    const connection = await prismaMain.connection.findUnique({
      where: { id: connectionId },
      select: {
        id: true,
        ipAddress: true,
        updateAt: true,
        _count: {
          select: {
            postLikes: true,
            commentLikes: true,
          },
        },
      },
    });

    if (!connection) {
      return NextResponse.json({
        connectionId,
        hasConnection: false,
        valid: false,
      });
    }

    return NextResponse.json({
      connectionId: connection.id,
      hasConnection: true,
      valid: true,
      ipAddress: connection.ipAddress,
      lastUpdate: connection.updateAt,
      activity: {
        postLikes: connection._count.postLikes,
        commentLikes: connection._count.commentLikes,
      },
    });

  } catch (error) {
    console.error('❌ Get connection error:', error);
    return NextResponse.json(
      { error: 'Failed to get connection' },
      { status: 500 }
    );
  }
}