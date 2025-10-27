// src/lib/socket_io/SocketInitializer.jsx
'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client'; 
import { useSocketStore } from '@/stores/useSocketStore'; // 💡 Zustand 스토어 임포트

export default function SocketInitializer() {
    
    // 💡 Zustand 스토어에서 setSocket 함수를 가져옵니다.
    const setSocket = useSocketStore((state) => state.setSocket);
    
    useEffect(() => {
        // 1. 서버 초기화를 먼저 트리거합니다.
        fetch('/api/sockets'); 
        
        let socket;
        
        // 💡 이미 소켓이 연결되어 있는지 확인하는 로직 (선택 사항)
        // const existingSocket = useSocketStore.getState().socket;
        // if (existingSocket) return;

        // 2. 올바른 경로로 소켓 연결 시도
        socket = io({ 
            path: '/api/socket', 
            reconnectionAttempts: 10, 
            reconnectionDelay: 1000 
        });

        socket.on('connect', () => {
            console.log('클라이언트: 소켓 연결 성공 (Zustand 저장)');
            // 💡 연결 성공 시 Zustand에 소켓 인스턴스를 저장합니다.
            setSocket(socket); 
        });
        
        socket.on('connect_error', (err) => {
            console.error('클라이언트: 소켓 연결 오류 발생', err.message);
        });

        // 3. 컴포넌트 언마운트 시 연결 정리
        return () => {
            if (socket) {
                socket.disconnect();
                // 💡 Zustand에서 소켓 상태를 null로 지워줄 수도 있음.
                // setSocket(null); 
            }
        };
    }, [setSocket]); // 💡 setSocket이 변경될 일은 없지만, useEffect의 룰을 따름.

    return null; 
}