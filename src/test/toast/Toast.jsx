//src/test/Toast.jsx
'use client';
import { useEffect , useRef } from 'react';
import { useToast } from './useToast'
import { useSocketStore } from '@/stores/useSocketStore';

let socket;
console.log('토스트 시스템 임포트');
export default function Toast() {
  const { toastMsgs , showToast } = useToast();
  const showToastRef = useRef(showToast);
  const socket = useSocketStore((state) => state.socket);
  console.log('주스탄드로 연결된 소켓 = ',socket);
  
  useEffect (()=>{
    globalThis.showToast = showToast;
    showToastRef.current = showToast;
  },[showToast])

  useEffect (() => {
    // 💡 소켓 인스턴스가 연결되었을 때만 로직을 실행합니다.
    if (socket) {
        
        // 🚨 서버 메시지 큐 수신 리스너 (가장 중요)
        // 리스너가 중복 등록되는 것을 방지하기 위해 off를 먼저 하거나, 
        // hasListeners 체크를 할 수 있지만, 간단하게 등록만 할게이.
        const handleToastMessages = (messages) => {
          console.log('서버로부터 토스트 메시지 큐 수신:', messages);
          
          // 받은 메시지 배열을 순서대로 showToast로 출력해요.
          messages.forEach( (msg) => {
            showToastRef.current(msg);
          });
        };
        
        socket.on('toastMessages', handleToastMessages);
        console.log('클라이언트: toastMessages 리스너 등록 완료.');
    
        // 컴포넌트 언마운트 시 소켓 리스너를 정리해요.
        // 💡 소켓 연결 자체는 SocketInitializer가 담당하므로 리스너만 제거합니다.
        return () => {
          socket.off('toastMessages', handleToastMessages);
          console.log('클라이언트: toastMessages 리스너 정리 완료.');
        };
    }
    // 💡 소켓이 Zustand에 저장될 때 이 useEffect가 다시 실행될 겁니다.
  },[socket])
  
  const isShow = toastMsgs.length !== 0;
  
  return (
    <div className={`ToastBody ${isShow? 'fixed left-1/3 top-3' : 'hidden'} flex flex-col p-1 rounded-md bg-red-800/75 z-100 pointer-events-none`}>
      { toastMsgs.map( (msg) => ( 
        <p key={msg.key} className='ToastMsg  text-amber-50 text-shadow-md text-shadow-amber-800 px-2 py-1 rounded-md border-1 border-amber-950'>
          <>{msg.stack>1 && <span className='text-lime-300'>{`[${msg.stack}]`}</span>}
          {msg.message}</>
        </p>
      ))}
    </div>
  )
};