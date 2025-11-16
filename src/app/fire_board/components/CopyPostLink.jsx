// src/app/fire_board/components/CopyPostLink.jsx

'use client';
import { useCallback, useState } from 'react';
import { Copy, Check } from 'lucide-react'; 
import { usePathname } from 'next/navigation'; // <-- Next.js 라우팅 정보 훅 임포트

/**
 * 현재 게시글의 URL을 클립보드에 복사하는 버튼 컴포넌트
 * @param {number} postId - 게시글 ID
 * @param {boolean} [showInput=false] - 게시글 주소를 텍스트 필드로 보여줄지 여부
 */
export default function CopyPostLink({ postId, showInput = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  
  // 현재 URL 경로를 가져옵니다. (예: /fire_board/123)
  const pathname = usePathname(); 

  // 현재 게시글 ID가 포함된 경로 (예: /fire_board/123)를 base로 사용합니다.
  const postPath = pathname.replace(`/${postId}`, `/${postId}`);
  
  // 복사할 최종 URL
  // window.location.origin (http://localhost:3000)과 postPath (/fire_board/123)를 합칩니다.
  const postUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${postPath}` 
    : '';

  const handleCopy = useCallback(async () => {
    if (isCopying || !postUrl) return;
    setIsCopying(true);

    try {
      await navigator.clipboard.writeText(postUrl);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      alert("링크 복사에 실패했습니다. 브라우저 설정을 확인해 주세요.");
    } finally {
      setIsCopying(false);
    }
  }, [postUrl, isCopying]);

  return (
    <div className="flex items-center gap-2">
      
      {/* 복사 버튼 */}
      <button
        onClick={handleCopy}
        disabled={isCopying}
        className={`
          flex items-center gap-1 px-1 py-2 rounded-lg text-sm font-semibold whitespace-nowrap 
          transition-colors duration-300 min-w-fit font-overwatch
          ${isCopied 
            ? 'bg-green-500/90 text-white' 
            : 'bg-igniteOrange-500/85 text-white hover:bg-amber-600'
          }
          `}
          title="게시글 주소 복사"
          >
        {isCopied 
          ? <Check className="w-4 h-4" /> 
          : <Copy className="w-4 h-4" />
        }
        {isCopied ? '복사 완료' : '주소 복사'}
      </button>

      {/* 텍스트 필드 표시 옵션 */}
      {showInput && (
        <input
          type="text"
          readOnly
          value={postUrl}
          className="font-overwatch flex-1 p-2 text-sm FBOARD-border-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 min-w-70 overflow-ellipsis"
          title="게시글 주소"
          // 인풋 필드를 클릭했을 때도 복사가 되도록 합니다.
          onClick={handleCopy} 
        />
      )}
    </div>
  );
}