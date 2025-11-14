//src/app/fire_board/[id]/page.jsx
import { getPost } from "@/server_actions/fireboard/postActions";;

export default async function PostDetailsPage({params}) {
  const { id: postId } = params;
  
  const result = await getPost(postId);

  const post = result.post;

  return (
        <div className="FireBoard-Detail p-5 bg-white/70 FBOARD-border-1">
            <h1 className="text-3xl font-bold mb-4 border-b pb-2 text-igniteOrange-800">
                {post.title}
            </h1>
            
            <div className="MetaData text-sm text-gray-500 mb-6 flex justify-between">
                <span>익명 닉네임: {post.anonym}{`(${post.clientIp})`}</span>
                <span>카테코리: #{post.category}</span>
            </div>
            
            <div className="ContentBox whitespace-pre-wrap p-4 bg-gray-50 rounded-lg border">
                {post.content}
            </div>

            {/* TODO: 여기에 댓글 섹션이나 수정/삭제 버튼! */}
        </div>
    );
}
