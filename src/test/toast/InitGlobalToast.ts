// src/test/initGlobalToast.ts 
'use server';

import { getSocketIoPromise } from '@/lib/socket_io/socketPromise';
// 전역 객체(globalThis)에 io 속성이 있을 수 있음을 선언해요.
// Next.js가 타입스크립트 환경에서 globalThis에 io 속성이 있음을 알게 해요.
export {};

declare global {
  var io: import('socket.io').Server | undefined;
  var showToast: (msg: string) => void;
}

// 1. 메시지 큐와 전송 스케줄링 변수
const serverTrunk: string[] = [];
let isScheduled = false;

// 2. globalThis.showToast 함수 정의
if (typeof globalThis.showToast === 'undefined') {
  globalThis.showToast = function(msg: string) { // msg 타입 지정 유지
    if (typeof msg === 'string' && msg.trim() !== '') {
        serverTrunk.push(msg);
        console.log(`[Server] 토스트 메시지 큐에 추가됨: ${msg}`);
        
        scheduleToastFlush();
    }
};}

/**
 * Node.js의 다음 이벤트 루프에서 큐를 비우고 클라이언트로 전송하는 함수
 */
function scheduleToastFlush() {
    if (isScheduled) return;
    isScheduled = true;

    process.nextTick(() => {// ⬅️ nextTick으로 배칭 (메시지 큐 통합)
      console.log("소켓 연결을 시도합니다. io=",io);
      getSocketIoPromise().then((io) => { // ⬅️ Promise로 io 인스턴스 대기
        console.log("소켓 연결 성공");
        if (serverTrunk.length > 0) {
            // io 인스턴스를 받은 후 메시지 큐를 전송
            io.emit('toastMessages', serverTrunk); 
            console.log(`[Socket.IO] ${serverTrunk.length}개의 메시지 api로 전송 완료.`);
            serverTrunk.length = 0; 
        }
      }).catch(error => {
          console.error('[Socket.IO] 토스트 전송 실패 (Promise 에러):', error);
      }).finally(() => {
          isScheduled = false; // 배칭 완료 또는 실패 후 플래그 해제
      });
    });
}

console.log('initGlobalToast 서버 초기화 완료.');
