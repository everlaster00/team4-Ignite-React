// src/app/fire_board/components/PostInteractions.jsx

'use client'
import { Heart } from 'lucide-react'; 
import usePostLike from "../hooks/usePostLike"; 

/**
 * 게시글 좋아요 버튼과 카운트를 표시하고 상호작용을 처리하는 클라이언트 컴포넌트
 */
export default function PostInteractions({ postId, initialIsLiked, initialLikeCount }) {
  
  const { 
    isLiked, 
    likeCount, 
    isPending, 
    handleToggleLike 
  } = usePostLike(postId, initialIsLiked, initialLikeCount);
  
  // 버튼 스타일 정의
  const buttonClass = isLiked 
    ? "bg-red-500 hover:bg-red-600 text-white" 
    : "bg-gray-100 hover:bg-gray-200 text-gray-500";
    
  const iconClass = isLiked ? "fill-white" : "fill-gray-500";
  
  return (
    <button
      onClick={handleToggleLike}
      disabled={isPending}
      className={`
        ${buttonClass} 
        flex items-center gap-1 p-2 rounded-full 
        font-semibold transition-all duration-200 
        ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <Heart className={`w-5 h-5 ${iconClass}`} />
      <span className="text-sm">
        {isPending ? isLiked ? '불 지피는 중' : '물 뿌리는 중' : `불씨 주기 ${likeCount}`}
      </span>
    </button>
  );
}