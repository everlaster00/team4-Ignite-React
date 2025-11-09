//src/lib/auth/AuthRefresher.js

'use client'
import { useCallback, useEffect, useRef } from "react"

const REFRESH_TIME = 30 * 60 * 1000; // 30분

export default function AuthRefresher() {
  const intervalRef = useRef(null);
  const isRefreshingRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);

  const shouldRefresh = () => {
    return Date.now() - lastRefreshTimeRef.current >= REFRESH_TIME;
  }

  
  const refreshConnection = useCallback(async () => {
    // 중복 호출 방지
    if (isRefreshingRef.current) return;

    if (!shouldRefresh()) {
      return;
    }
    
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
      lastRefreshTimeRef.current = Date.now();
      
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
  },[]);

  useEffect(() => {
    // 주기적 갱신
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
  }, [refreshConnection]);

  return null;
}