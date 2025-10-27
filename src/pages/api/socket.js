import { Server } from 'socket.io';
import { setSocketIoInstance } from '@/lib/socket_io/socketPromise';

// Pages Router API 핸들러 함수는 (req, res)를 받습니다.
export default async function handler(req, res) {
  // 1. 소켓 서버가 이미 존재하는지 확인해요.
  if (res.socket.server.io) {
    console.log('[서버] Socket.IO 서버가 이미 실행 중입니다.');
    // 💡 Pages Router에서는 res.status().json()으로 응답을 보냅니다.
    res.status(200).json({ message: 'Socket.IO running' });
    return; // 응답을 보냈으니 함수 종료
  }

  // 2. 소켓 서버가 존재하지 않으면 새로 생성하고 Next.js 서버에 붙여요.
  const io = new Server(res.socket.server, {
    // 💡 Socket.IO 클라이언트가 접속할 경로입니다.
    path: '/api/socket', 
    addTrailingSlash: false,
  });
  
  // 💡 Next.js 서버 객체에 Socket.IO 인스턴스를 저장하여 재사용합니다.
  res.socket.server.io = io;
  // 💡 필요하다면 전역 객체에도 저장할 수 있습니다.
  global.io = io; 

  setSocketIoInstance(io);

  // 3. 소켓 연결 이벤트 리스너를 설정해요.
  io.on('connection', (socket) => {
    console.log(`[서버] 새로운 클라이언트 연결: [소켓 ]${socket.id}`);
    
    // 🚨 여기서 클라이언트로 텍스트를 전송하는 로직을 추가할 수 있습니다.
    // socket.emit('message', '클라이언트로 보내는 텍스트데이!');

    socket.on('disconnect', () => {
      console.log(`[서버] 클라이언트 연결 끊김: [소켓]${socket.id}`);
    });
  });

  console.log('[서버] Socket.IO 서버 초기화 완료.');

  // 💡 초기화 후, 성공 응답을 반드시 보내줘야 Next.js가 응답 완료를 인식합니다.
  res.status(201).json({ message: 'Socket.IO initialized' });
}