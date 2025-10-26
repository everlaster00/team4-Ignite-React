// src/lib/SocketInitializer.jsx 
'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'; 

export default function SocketInitializer() {
    
    // ⬅️ isMounted 상태 복구
    const [isMounted, setIsMounted] = useState(false); 

    // 1. 마운트 시점에 isMounted를 true로 바꾸는 useEffect
    useEffect(() => {
        // 컴포넌트가 마운트되면 isMounted를 true로 설정합니다.
        setIsMounted(true);
    }, []); 

    // 2. isMounted가 true가 되면 소켓 연결 로직을 실행하는 useEffect
    useEffect(() => {
        // isMounted가 true일 때만 소켓 연결 로직을 실행합니다.
        if (!isMounted) return; 

        // 1. 올바른 경로로 소켓 연결 시도
        const socket = io({ 
            path: '/api/socket', 
            reconnectionAttempts: 3 
        });

        socket.on('connect', () => {
            console.log('클라이언트: 소켓 연결 성공 (서버 인스턴스 활성화됨)');
        });
        
        socket.on('connect_error', (err) => {
            console.error('클라이언트: 소켓 연결 오류 발생', err.message);
        });

        // 3. 컴포넌트 언마운트 시 연결 정리
        return () => {
            socket.disconnect();
        };
    }, [isMounted]); // ⬅️ isMounted에 의존하도록 설정

    // ⬅️ 렌더링은 null로 복구 (실제 앱 로직에 영향 없도록)
    return null; 
}