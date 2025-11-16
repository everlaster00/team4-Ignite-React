// src/app/fire_board/components/CommentList.jsx

import CommentItem from "./CommentItem";

/**
 * 땔감 (댓글) 목록을 표시하는 컴포넌트 (Client Component로 가정)
 * @param {Array<object>} comments - 댓글 데이터 배열
 */
export default function CommentList({ comments , postId}) {
    
    if (!comments || comments.length === 0) {
        return (
            <p className="text-center text-gray-500 py-4">
                아직 첫 번째 땔감이 없습니다. 땔감을 던져 불을 키워보세요! 🔥
            </p>
        );
    }
    
    // 댓글이 많아지면 성능을 위해 reverse() 대신 CSS flex-direction: column-reverse를 고려할 수 있지만, 
    // 여기서는 간단하게 배열을 역순으로 표시 (최신 댓글이 상단에 오도록)
    // *주의: getCommentsByPostId에서 이미 `createdAt: 'asc'`로 가져오고 있으므로, 
    // 최신 댓글을 하단에 두는 것이 일반적인 댓글 UI 패턴입니다. (현재는 asc 유지)

    return (
        <div className="CommentList space-y-4">
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} postId={postId} />
            ))}
        </div>
    );
}