// src/LoadingSpinner.jsx 
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="
          animate-spin        /* 빙글빙글 돌게 하는 애니메이션 */
          rounded-full        /* 완벽한 원 형태로 */
          h-8 w-8             /* 스피너의 크기 (높이 32px, 너비 32px) */
          border-4            /* 테두리 두께 */
          border-solid        /* 실선 테두리 */
          border-t-transparent /* 위쪽 테두리만 투명하게 해서 움직이는 느낌 */
          border-blue-500     /* 나머지 테두리 색상 */
          dark:border-t-transparent /* 다크 모드에서도 위쪽은 투명하게 */
          dark:border-white   /* 다크 모드에서는 흰색 스피너 */
        "
      ></div>
    </div>
  );
}
