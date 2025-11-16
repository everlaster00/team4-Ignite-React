// src/app/fire_board/hooks/usePostLike.jsx

'use client'
import { useState, useCallback, useTransition } from 'react';
// 오빠야의 규칙에 따라 postActions.js 파일에서 임포트하도록 경로를 수정합니다.
// 이 파일 안에 togglePostLike 함수를 나중에 추가할 예정입니다.
import { togglePostLike } from "@/server_actions/fireboard/postActions"; 

/**
 * 게시글 좋아요 상태를 관리하고 토글하는 커스텀 훅
 * @param {number} postId - 게시글 ID
 * @param {boolean} initialIsLiked - 초기 좋아요 여부
 * @param {number} initialLikeCount - 초기 좋아요 수
 */
export default function usePostLike(postId, initialIsLiked, initialLikeCount) {
  
  // UI 상태 관리
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isPending, startTransition] = useTransition();

  // 좋아요 토글 핸들러
  const handleToggleLike = useCallback(() => {
    
    if (isPending) return;

    // 1. 낙관적 업데이트 (UI 먼저 변경)
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    // 2. 서버 액션 호출 시작
    startTransition(async () => {
      
      const { 
        success, 
        isLiked: serverIsLiked, 
        likeCount: serverLikeCount, 
        error 
      } = await togglePostLike(postId);

      if (!success) {
        // 3. 서버 처리 실패 시: 상태 롤백
        console.error("좋아요 토글 실패:", error);
        alert(error || "좋아요 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        
        // 롤백 (이전 상태로 되돌리기)
        setIsLiked(initialIsLiked);
        setLikeCount(initialLikeCount);
        return;
      }
      
      // 4. 서버 처리 성공 시: 최종 상태 반영
      setIsLiked(serverIsLiked);
      setLikeCount(serverLikeCount);
    });

  }, [isLiked, likeCount, postId, initialIsLiked, initialLikeCount, isPending]);

  return {
    isLiked,
    likeCount,
    isPending,
    handleToggleLike,
  };
}