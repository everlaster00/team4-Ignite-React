// src/test/ServerToast.js 
'use client'
import { useEffect } from 'react'; 

export default function ServerToast({msg}) {
  
  // 💡 렌더링이 완료된 후, 딱 한 번 실행되게(메인 랜더링 파일이 그리고 있는 중에 간섭 없게)
  useEffect(() => {
    // 렌더링 중에는 실행 안 함
    const trimmedMsg = msg.trim();
    
    // 윈도우 객체 확인하는 로직은 이미 클라이언트 컴포넌트라 필요 없지만, 안정성을 위해 남김!
    if ( trimmedMsg !== '' ) {
      if ( typeof window !== 'undefined' && window.showToast ) {
        window.showToast(trimmedMsg);
      }
    }
  }, [msg]); 

  return null; 
}