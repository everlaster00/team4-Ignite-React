import { getPost } from "@/server_actions/fireboard/postActions";
import { getCategoryDisplay } from "@/app/fire_board/components/categoryParse"; 
import PostInteractions from "../components/PostInteractions"; 
import { formatTimeAgo } from "@/utlls/timeUtils";
import CopyPostLink from "../components/CopyPostLink";
import CommentsBox from "../components/CommentsBox";


// ------------------------------------------------------------------
// IP 마스킹 헬퍼 함수 (최소화 - 118.223. 형태로 축약)
// *주의: 이 함수는 원래 commentActions.js에 정의되어 있었습니다. 
// 추후 utlls 폴더와 같은 공통 유틸리티 파일로 이동하여 사용하는 것을 권장합니다.
// ------------------------------------------------------------------

/**
 * IP 주소의 앞 두 옥텟만 표시하고 나머지는 생략합니다. (예: 118.223.)
 * IPv6 로컬호스트 주소 (::1)는 그대로 반환합니다.
 * @param {string} ip - 클라이언트 IP 주소
 * @returns {string} 축약된 IP 주소
 */
function maskIp(ip) {
    if (!ip) return '0.0.0.0';
    
    // IPv6 로컬호스트 주소 (::1)는 그대로 반환합니다.
    if (ip === '::1') {
        return ip; 
    }
    
    // IPv4 주소 축약 로직: 앞 두 옥텟만 반환 + 마침표
    const parts = ip.split('.');
    
    if (parts.length === 4) {
        // 예: 118.223.100.50 -> 118.223.
        return `${parts[0]}.${parts[1]}.`;
    }
    
    // 그 외 형식은 원본 IP를 반환
    return ip;
}


export default async function PostDetailsPage({params, searchParams}) {
  const awaitedParams = await params;
  const { id: postId } = awaitedParams;
  
  const awaitedSearchParams = await searchParams;
  const shouldIncrementView = awaitedSearchParams.justPosted !== 'true'; 
  const result = await getPost(postId, shouldIncrementView);

  const post = result.post;
  
  if (!post) {
      return (
          <div className="FireBoard-Detail p-5 bg-white/70 FBOARD-border-1 text-center text-red-500">
              <h1 className="text-3xl font-bold mb-4">게시글을 찾을 수 없습니다.</h1>
          </div>
      );
  }
  
  // 카테고리 표시를 위한 정보 파싱
  const categoryInfo = getCategoryDisplay(post.category);
  const formattedTime = formatTimeAgo(post.createdAt); 

  const initialIsLiked = post.isLiked || false; 
  const initialLikeCount = post.likeCount || 0;


  return (
        <div className="FireBoard-Detail p-5 bg-white/70 FBOARD-border-1">
            <h1 className="truncate text-xl md:text-3xl font-bold mb-4 border-b pb-2 border-igniteOrange-100" title={post.title}>
              <span className="text-base md:text-xl font-normal mr-2 text-blue-600/80">{categoryInfo.label}</span>
                {post.title}
            </h1>
            
            <div className="MetaData pb-4 border-b-1 border-igniteOrange-100 text-sm lg:text-base text-gray-500 mb-6 flex flex-col md:flex-row justify-between items-center gap-2">
                <span className="flex flex-col justify-center items-start">
                  <span className="AuthorInfo mr-4">
                    {/* ⭐ IP 마스킹 적용 ⭐ */}
                    점화자: {post.anonym}{`(${maskIp(post.clientIp)})`}
                  </span>
                  <span>
                    버닝 타임: {formattedTime}
                  </span>
                </span>
                <CopyPostLink postId={post.id} showInput={true} />
            </div>
            
            <div className="ContentBox whitespace-pre-wrap break-all p-4 bg-igniteOrange-50/40 FBOARD-border-1">
                {post.content}
            </div>
            
            {/* 불씨 주기 버튼 UI */}
            <div className="flex justify-center items-center pr-4 mt-4 pb-4 gap-4 border-b-4 border-double border-amber-600/30">
              <span className="ViewsInfo">
                조회수: {post.views ?? 0}
              </span>
                <PostInteractions 
                    postId={post.id} 
                    initialIsLiked={initialIsLiked} 
                    initialLikeCount={initialLikeCount} 
                />
            </div>

            <div className="CommentField mt-4 ">
              <CommentsBox postId={post.id} />
            </div>
        </div>
    );
}