'use client'; 

import { FaArrowUp, FaArrowDown, FaRegSquare} from 'react-icons/fa'; 

// 🌟 [수정!] <main> 태그의 ID를 사용한다 안 카나!
const MAIN_ID = 'MainFrame'; 
// NAV_HEIGHT는 중앙 계산에 불필요하므로 제거해도 되지만, 코드는 유지할께요.
// const NAV_HEIGHT = 80; 

// 스크롤 액션 함수 정의
// 💡 [수정!] 'ppt-center'를 'main-center'로 변경!
const handleScrollToTarget = (target: 'doc-top' | 'doc-bottom' | 'main-center') => {
  if (typeof window === 'undefined') return;

  let targetTop = 0;

  if (target === 'doc-top') {
    targetTop = 0;
  } else if (target === 'doc-bottom') {
    targetTop = document.body.scrollHeight;
  } else if (target === 'main-center') { // 💡 'main-center' 로직!
    
    // 💡 [수정!] 메인 요소를 찾아본다!
    const mainElement = document.getElementById(MAIN_ID);
    
    if (mainElement) {
      // 1. 메인 영역의 중심까지의 거리 (페이지 맨 위 기준)
      const mainCenterY = mainElement.offsetTop + (mainElement.offsetHeight / 2); 
      
      // 2. 화면(뷰포트) 높이의 절반
      const viewportHalfHeight = window.innerHeight / 2;
      
      // 3. 💖 스크롤 목표 위치 = 중심 위치 - 화면 높이 절반
      targetTop = Math.max(0, mainCenterY - viewportHalfHeight); 
    } else {
      // 메인 영역이 없으면, 페이지 최상단으로 폴백
      targetTop = 0; 
    }
  }
  
  window.scrollTo({
    top: targetTop, 
    behavior: 'smooth',
  });
};


export default function ScrollToTopBottom() {
  
  // 오빠야가 정리한 스타일
  const cssStyle = "p-1 bg-white/10 hover:bg-white text-gray-800 rounded-full shadow-lg transition-colors backdrop-blur-sm"; 

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-row space-x-2"> 

      <button
        onClick={() => handleScrollToTarget('doc-top')}
        className={cssStyle}
        aria-label="화면 최상단으로 이동"
      >
        <FaArrowUp className="w-2 h-2" />
      </button>

      {/* 🌟 메인 콘텐츠 중앙 이동 버튼 */}
      <button
        onClick={() => handleScrollToTarget('main-center')} // 💡 'main-center'로 변경!
        className={cssStyle}
        aria-label="메인 콘텐츠 중앙으로 이동"
      >
        <FaRegSquare className="w-2 h-2" />
      </button>

      <button
        onClick={() => handleScrollToTarget('doc-bottom')}
        className={cssStyle}
        aria-label="화면 최하단으로 이동"
      >
        <FaArrowDown className="w-2 h-2" />
      </button>
    </div>
  );
}