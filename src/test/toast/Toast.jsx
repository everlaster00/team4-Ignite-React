//src/test/Toast.jsx
'use client';
import { useEffect , useRef } from 'react';
import { useToast } from './useToast'
// import io from 'socket.io-client';

let socket;
console.log('토스트 시스템 임포트');
export default function Toast() {
  const { toastMsgs , showToast } = useToast();
  const showToastRef = useRef(showToast);
  
  useEffect (()=>{
    globalThis.showToast = showToast;
    showToastRef.current = showToast;
  },[showToast])

  useEffect (() => {
    // //경로는 URL경로 입력형
    // fetch('/api/socket').then(()=>{
    //   //소켓 클라이언트 연결 (개발 환경에서는 포트를 명시하지 않으면 현재 URL을 사용해요.)
    //   if (!socket) {
    //     // socket.io-client를 사용하여 서버에 접속
    //     socket = io();
        
    //     // 2-3. 연결 성공 리스너 (선택 사항)
    //     socket.on('connect', () => {
    //       console.log('클라이언트 소켓 연결 성공!');
    //     });
        
    //     //🚨 서버 메시지 큐 수신 리스너 (가장 중요)
    //     socket.on('toastMessages', (messages) => {
    //       console.log('서버로부터 토스트 메시지 큐 수신:', messages);
          
    //       // 받은 메시지 배열을 순서대로 showToast로 출력해요.
    //       messages.forEach( (msg) => {
    //         showToastRef.current(msg);
    //       });
    //     });
    
    //     //컴포넌트 언마운트 시 소켓 연결을 정리해요.
    //     return () => {
    //       if (socket) {
    //         socket.disconnect();
    //         socket = null; // 정리 후 null로 초기화해요.
    //       }
    //     };
    //   }
    // });

    
  },[])
  
  
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