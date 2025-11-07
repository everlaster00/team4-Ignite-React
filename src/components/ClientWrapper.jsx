//src/components/ClientWrapper.jsx
'use client'
import { useEffect, useState } from 'react';
import AuthRefresher from '@/lib/auth/AuthRefresher';
// import SocketInitializer from '@/lib/socket_io/SocketInitializer';

export default function ClientWrapper({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 앱 시작 시 즉시 식별 수행
    async function initialize() {
      try {
        const response = await fetch('/api/auth/identify', {
          method: 'POST',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (process.env.NODE_ENV === 'development') {
            console.log('🔐 Connection 초기화:', {
              connectionId: data.connectionId,
              isNew: data.isNewConnection,
              ip: data.ipAddress,
            });
          }
        }
      } catch (error) {
        console.error('초기 식별 실패:', error);
      } finally {
        setIsInitialized(true);
      }
    }

    initialize();
  }, []);

  //여기 컴포넌트들은 클라이언트에서 실행됩니다
  return (
    <>
      {/* 초기화 후 주기적 갱신 시작 */}
      {isInitialized && <AuthRefresher />}
      {/* <DynamicSocketInitializer />; */}
      {children}
    </>
  );
}