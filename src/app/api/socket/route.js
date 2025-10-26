// src/app/api/socket/route.js

import { Server } from 'socket.io';
import { setSocketIoInstance } from '@/lib/socket_io/socketPromise';
import { NextResponse } from 'next/server'; // ⬅️ 응답을 위한 Next.js 유틸리티 임포트

// Next.js App Router의 GET 함수로 Socket.IO 초기화 로직을 감쌉니다.
export async function GET(req, res) { 
  
  // 1. 소켓 서버가 이미 존재하는지 확인해요.
  if (res.socket.server.io) {
    console.log('[서버] Socket.IO 서버가 이미 실행 중입니다.');
    return NextResponse.json({ message: 'Socket.IO running' }); // ⬅️ JSON 응답 반환
  }

  // 2. 소켓 서버가 존재하지 않으면 새로 생성하고 Next.js 서버에 붙여요.
  const io = new Server(res.socket.server, {
        path: '/api/socket', 
        addTrailingSlash: false,
    });
  res.socket.server.io = io; 
  global.io = io;

  setSocketIoInstance(io);

  // 3. 소켓 연결 이벤트 리스너를 설정해요.
  io.on('connection', (socket) => {
    console.log(`[서버] 새로운 클라이언트 연결: ${socket.id}`);
    
    socket.on('disconnect', () => {
      console.log(`[서버] 클라이언트 연결 끊김: ${socket.id}`);
    });
  });

  console.log('[서버] Socket.IO 서버 초기화 완료.');

  // ⬅️ 초기화 후에도 응답을 반환해야 라우트 핸들러가 종료됩니다.
  return NextResponse.json({ message: 'Socket.IO initialized' });
}

// ⬅️ 이전의 getIO 함수는 여기서 사용하지 않습니다.

// ⬅️ App Router에서는 export const config 설정을 보통 route.js 옆에 두지 않습니다.