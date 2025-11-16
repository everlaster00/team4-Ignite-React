"use client";

import { useState, useTransition, useEffect } from "react"; // ⭐ [수정] useEffect 임포트
import { useRouter } from "next/navigation";
import { Trash2, Heart } from "lucide-react"; 
import { formatTimeAgo } from "@/utlls/timeUtils";
import { deleteComment, toggleCommentLike } from "@/server_actions/fireboard/commentActions"; 
import LoadingSpinner from "@@/LoadingSpinner";

/**
 * 개별 땔감 (댓글) 항목 컴포넌트
 * @param {object} comment - 댓글 데이터 객체 ({ id, content, ..., isLiked, likeCount })
 * @param {string} postId - 해당 댓글이 속한 게시글 ID (캐시 갱신을 위해 부모로부터 전달받음)
 */
export default function CommentItem({ comment, postId }) { 
  const router = useRouter();
  
  // 삭제 관련 상태
  const [isDeleting, startDeleteTransition] = useTransition(); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  
  // ⭐ [수정] 좋아요 상태를 서버에서 받은 값(comment.isLiked)으로 초기화합니다.
  const [isLiked, setIsLiked] = useState(comment.isLiked); 
  // ⭐ [수정] 좋아요 카운트를 서버에서 받은 값(comment.likeCount)으로 초기화합니다.
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [isLiking, startLikeTransition] = useTransition(); 

  const formattedTime = formatTimeAgo(comment.createdAt);

  // ------------------------------------------------------------------
  // ⭐ [개선] comment props가 변경될 때마다 상태를 재설정합니다. 
  // (router.refresh() 후 새로운 comment prop이 들어왔을 때 상태 동기화)
  // ------------------------------------------------------------------
  useEffect(() => {
    setIsLiked(comment.isLiked);
    setLikeCount(comment.likeCount || 0);
  }, [comment.isLiked, comment.likeCount]);


  // ------------------------------------------------------------------
  // 땔감 삭제 핸들러 (기존 로직 유지)
  // ------------------------------------------------------------------
  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!deletePassword.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    startDeleteTransition(async () => {
      const formData = new FormData();
      formData.append('anonyPass', deletePassword);
      
      const result = await deleteComment(comment.id, formData);
      
      if (result.success) {
        setShowDeleteModal(false);
        setDeletePassword("");
        router.refresh(); 
      } else {
        alert("삭제 실패: " + result.error);
        setDeletePassword("");
      }
    });
  };

  // ------------------------------------------------------------------
  // ⭐ [수정/개선] 좋아요 토글 핸들러
  // ------------------------------------------------------------------
  const handleToggleLike = () => {
    // postId가 없거나, 이미 좋아요 처리 중이라면 중복 실행 방지
    if (isLiking || !postId) return;

    // 1. 낙관적 업데이트 (Optimistic Update)
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    const newIsLiked = !isLiked;
    // 좋아요는 +1, 좋아요 취소는 -1
    const newLikeCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1); 

    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    // 2. 서버 액션 호출 (comment.id와 postId 전달)
    startLikeTransition(async () => {
        const result = await toggleCommentLike(comment.id, postId);

        if (result.success) {
            // 3. 성공 시: 서버 값으로 상태 재확정 및 페이지 갱신
            // 서버의 최신 값으로 UI 상태를 최종 동기화합니다.
            setIsLiked(result.isLiked);
            setLikeCount(result.likeCount);
            router.refresh(); // 전체 댓글 목록 캐시 갱신
            
        } else {
            // 3. 실패 시: 상태 롤백
            console.error("댓글 좋아요 토글 실패:", result.error);
            alert(result.error || "좋아요 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.");

            // 롤백 (이전 상태로 되돌리기)
            setIsLiked(previousIsLiked);
            setLikeCount(previousLikeCount);
        }
    });
  };
  
  // 좋아요 버튼 스타일 클래스
  const likeButtonClass = isLiked
    ? "text-red-500 hover:text-red-600"
    : "text-gray-400 hover:text-red-500";

  const likeIconClass = isLiked ? "fill-red-500" : "fill-transparent";


  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm relative">
      <div className="flex justify-between items-start mb-1">
        
        {/* 닉네임 및 IP (마스킹됨) */}
        <span className="font-semibold text-igniteOrange-500">
          {comment.anonym} <span className="text-xs text-gray-400">({comment.clientIp})</span>
        </span>
        
        {/* 시간 및 액션 버튼 그룹 */}
        <div className="flex items-center gap-2 text-sm text-gray-500">

          {/* ⭐ 좋아요 버튼 ⭐ */}
          <button
            onClick={handleToggleLike}
            disabled={isLiking}
            className={`flex items-center gap-1 transition ${likeButtonClass} ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="땔감에 불씨 지피기"
          >
            <Heart className={`w-4 h-4 transition ${likeIconClass}`} />
            <span className="text-sm font-semibold">{likeCount}</span>
          </button>
          
          <span title={new Date(comment.createdAt).toLocaleString()}>{formattedTime}</span>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="text-red-400 hover:text-red-600 transition"
            title="땔감 치우기"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* 내용 */}
      <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>

      {/* ⭐ 삭제 모달 UI ⭐ */}
      {showDeleteModal && (
        // z-index는 이미 사용자님이 추가하셨으므로 유지합니다.
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 rounded-lg z-50">
          <form onSubmit={handleDelete} className="bg-white p-5 rounded-lg shadow-2xl border border-red-300 w-full max-w-sm">
            <h4 className="font-bold text-lg mb-3 text-red-600">땔감 치우기</h4>
            <p className="text-sm text-gray-600 mb-3">삭제 비밀번호를 입력해 주세요.</p>
            
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              required
              autoComplete="off"
            />
            
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={isDeleting}
                className={`px-3 py-1 text-sm rounded-md text-white font-semibold transition ${
                  isDeleting 
                    ? 'bg-red-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isDeleting ? <LoadingSpinner size="sm" /> : "삭제 확인"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
                disabled={isDeleting}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}