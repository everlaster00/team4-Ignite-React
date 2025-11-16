// src/app/fire_board/components/CommentForm.jsx

"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAnonyMemo, saveAnonyMemo } from "@/utlls/anonyMemo"; // 익명 메모 헬퍼
import { createComment } from "@/server_actions/fireboard/commentActions"; // 서버 액션
import LoadingSpinner from "@@/LoadingSpinner";
import IgniteFont from "@@/IgniteFont";

/**
 * 땔감 (댓글) 작성 폼 컴포넌트 (Client Component)
 * @param {number} postId - 현재 게시글의 ID
 */
export default function CommentForm({ postId }) {
  const router = useRouter();
  
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("이그나이터"); // 기본값 설정
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  // 컴포넌트 로드 시 로컬 스토리지에서 익명 정보 불러오기
  useEffect(() => {
    const { nickname: savedNickname, password: savedPassword } = getAnonyMemo();
    if (savedNickname) setNickname(savedNickname);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사 (서버 액션에서도 하지만 클라이언트에서도 1차 방어)
    if (!content.trim() || !nickname.trim() || !password.trim()) {
      alert("내용, 닉네임, 비밀번호를 모두 채워주세요!");
      return;
    }
    
    if (content.trim().length < 1 || content.trim().length > 500) {
        alert("땔감 내용은 최소 2자, 최대 500자까지 작성할 수 있습니다.");
        return;
    }
    
    startTransition(async () => {
      const formData = new FormData(e.target);
      
      // 1. 서버 액션 호출 (postId는 인자로, formData는 두 번째 인자로 전달)
      const result = await createComment(String(postId), formData); 
      
      if (result.success) {
        // 2. 성공 시 로컬 스토리지에 정보 저장
        saveAnonyMemo(nickname.trim(), password.trim());
        
        // 3. UI 초기화 및 페이지 갱신 (댓글 목록을 최신화)
        setContent("");
        router.refresh(); 
      } else {
        alert("땔감 던지기 실패: " + result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="CommentForm mb-6 p-4 border border-amber-600/30 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-bold mb-3 text-gray-700">새로운 땔감 던지기 <IgniteFont>🪵</IgniteFont></h3>
      
      {/* 내용 입력 */}
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="최소 2자, 최대 500자까지 작성할 수 있습니다."
        rows="3"
        className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-igniteOrange-500 resize-none"
        maxLength={500}
        required
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        {/* 닉네임 & 비밀번호 입력 */}
        <div className="flex gap-3 w-full md:w-auto">
          <input
            name="anonym"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            className="p-2 border border-gray-300 rounded-md w-full md:w-32"
            maxLength={20}
            required
          />
          <input
            name="anonyPass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="p-2 border border-gray-300 rounded-md w-full md:w-32"
            required
            autoComplete="off"
          />
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          disabled={isPending}
          className={`px-6 py-2 rounded-lg font-bold w-full md:w-40 transition-colors duration-200
            ${isPending 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-igniteOrange-500 hover:bg-amber-600 text-white shadow-lg'
            }`}
        >
          {isPending ? <LoadingSpinner size="sm" /> : "땔감 던지기"}
        </button>
      </div>
    </form>
  );
}