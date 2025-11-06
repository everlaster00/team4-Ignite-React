'use client'
import { useEffect, useRef } from "react"

const REFRESH_TIME = 15 * 60 * 1000; // 15분

export default function AuthRefresher() {
  const intervalRef = useRef(null);
  const isRefreshingRef = useRef(false);

  async function refreshConnection() {
    // 중복 호출 방지
    if (isRefreshingRef.current) return;
    
    isRefreshingRef.current = true;
    
    try {
      const response = await fetch("/api/auth/identify", {
        method: "POST",
        credentials: "include",
      });
      
      if (!response.ok) {
        console.warn("⚠️ Connection 갱신 실패:", response.status);
        return;
      }
      
      const data = await response.json();
      
      // 개발 환경에서만 로그
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Connection 갱신:', {
          connectionId: data.connectionId,
          timestamp: new Date().toLocaleTimeString(),
        });
      }
      
    } catch (error) {
      console.error("❌ Connection 갱신 오류:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }

  useEffect(() => {
    // 15분마다 주기적 갱신
    intervalRef.current = setInterval(refreshConnection, REFRESH_TIME);
    
    // 페이지 포커스 시 갱신 (탭 전환 후 돌아왔을 때)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshConnection();
      }
    };
    
    // 브라우저 포커스 시 갱신 (창 최소화 후 돌아왔을 때)
    const handleFocus = () => {
      refreshConnection();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null;
}