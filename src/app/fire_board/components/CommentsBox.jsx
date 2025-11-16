// src/app/fire_board/components/CommentsBox.jsx

// ⭐ [조립 1] 서버 액션 임포트
import { getComments } from "@/server_actions/fireboard/commentActions";
// ⭐ [조립 2] 클라이언트 컴포넌트 임포트
import CommentForm from "./CommentForm"; 
import CommentList from "./CommentList"; 

/**
 * 게시글의 '땔감' (댓글) 시스템의 메인 컨테이너 컴포넌트입니다.
 * @param {number} postId - 현재 게시글의 ID
 */
export default async function CommentsBox({ postId }) {
    
    // ⭐ [핵심 1] 서버 액션을 통해 땔감 목록을 비동기적으로 불러옵니다.
    // getComments 함수는 postId를 문자열로 받도록 구현되어 있습니다.
    const result = await getComments(String(postId)); 
    
    const commentsData = result.success ? result.comments : [];
    
    return (
        <div className="CommentsBox bg-igniteOrange-50/50 p-4 rounded-xl shadow-inner mt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-700">
                <span className="text-igniteOrange-500">🪵</span> 
                땔감들 ({commentsData.length}) 
            </h2>
            
            {/* 1. 땔감 작성 폼 (CommentForm 컴포넌트로 대체) */}
            {/* PostId를 props로 전달하여 해당 게시글에 댓글을 작성하도록 합니다. */}
            <CommentForm postId={postId} />
            

            {/* 2. 땔감 목록 (CommentList 컴포넌트로 대체) */}
            <div className="CommentList space-y-4">
                <CommentList comments={commentsData} postId={postId} />
            </div>
            
        </div>
    );
}