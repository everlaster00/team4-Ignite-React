"use client";
import { useEffect, useState } from "react";
import { createPost, updatePost } from "@/server_actions/fireboard/postActions"; 
import { useRouter } from "next/navigation"; 
import { getAnonyMemo, saveAnonyMemo } from "@/utlls/anonyMemo";
import LoadingSpinner from "@@/LoadingSpinner";

const initialMemo = getAnonyMemo();
export default function FireForm({post}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("nomal");
  const [submitting, setSubmitting] = useState(false);

  const [nickname, setNickname ] = useState(initialMemo.nickname || "이그나이터");
  const [password, setPassword ] = useState(initialMemo.password || "");

  const isEditing = !!post?.id;
  const isFormValid = title && content && nickname && password; 

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setCategory(post.category || "nomal");
      setNickname(post.anonym || ""); 
    } 
    
  }, [post, isEditing])

  const handleAction = async (formData) => {
    setSubmitting(true);
    let result;
    
    try {
        if (isEditing) {
            // TODO: updatePost 로직 구현 필요
            result = await updatePost(post.id, formData); 
        } else {
            result = await createPost(formData); 
        }

        if (result?.success) {
            alert(isEditing ? "게시글이 수정되었습니다!" : "새로운 게시글이 점화되었습니다!");
            
            const currentNickname = formData.get('anonym');
            const currentPassword = formData.get('anonyPass');
            saveAnonyMemo(currentNickname, currentPassword);
            
            const redirectPath = `/fire_board/${isEditing ? post.id : result.postId}`;
            router.push(`${redirectPath}?justPosted=true`); // 새 글임을 알리는 플래그 전달
        } else {
            alert(result?.error || (isEditing ? "게시글 수정에 실패했습니다." : "게시글 작성에 실패했습니다."));
        }
    } catch (error) {
        console.error("Action execution error:", error);
        alert("처리 중 서버 오류가 발생했습니다.");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <form action={handleAction} className="w-full min-h-full flex-1 border-2 space-y-5 bg-white/60 p-6 FBOARD-border-1 overflow-auto">
      <div className="PostTitleBox border-2 border-double border-amber-600/30 rounded-md p-1 ">
        <label className="block outline-1 outline-amber-400/20 p-1 mb-1 border-b-1 bg-igniteOrange-50/30 border-b-amber-900/30 text-gray-700 font-semibold">제목</label>
        <input
          name="title" 
          className="w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="🔥 어떤 아이디어에 불을 붙이시겠어요?"
          required
        />
      </div>

      <div className="PostContentBox min-h-full rounded-md border-2 border-amber-600/30 p-1 border-double">
        <label className="block border-b-1 outline-1 outline-amber-400/20 border-b-amber-900/30 bg-igniteOrange-50/30 p-1 mb-1 text-gray-700 font-semibold">
          내용
        </label>
        <textarea
          name="content" 
          className="w-full p-2 resize-none"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="자세히 작성해주세요."
          required
        />
      </div>

      <div className="ActionBox flex flex-col md:flex-row gap-2 justify-between items-center">
        <div className="CategoryBox">
          <label className="block mb-1 p-1 text-gray-700 font-semibold">카테코리</label>
          <select 
            name="category" 
            className="border border-gray-300 rounded-lg p-2" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="nomal">🗣 일반</option>
            <option value="idea">💡 아이디어</option>
            <option value="bug">🐞 버그 제보</option>
          </select>
        </div>
        <div className="userInfoBox flex flex-col md:flex-row gap-3" >
          <div className="userIdBox">
            <label className="block mb-1 p-1 text-gray-700 font-semibold overflow-x-auto">닉네임</label>
            <input
              name="anonym" 
              className="p-1 FBOARD-border-1"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="익명 닉네임"
              required
            />
          </div>
          <div className="userPasswordBox">
            <label className="block mb-1 p-1 text-gray-700 font-semibold overflow-x-auto">비밀번호</label>
            <input
              name="anonyPass" 
              className="p-1 FBOARD-border-1 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="글 수정/삭제용 비밀번호"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="SubmitBox min-w-35 md:self-end mb-1">
          <button 
            type="submit" 
            className="bg-ignite shadow-sm hover:bg-igniteOrange-600 text-shadow-md text-shadow-rose-400 text-white font-semibold p-1 rounded-lg" 
            disabled={submitting} 
          >
            {submitting ? <><LoadingSpinner />전송 중</> : (isEditing ? "🔥 수정하기" : "🔥 IGNIGHTING")}
          </button>
        </div>
      </div>
    </form>
  );
}