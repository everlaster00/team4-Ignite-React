"use client";

import { useState } from "react";

export default function FireForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("nomal");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    return
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-h-full flex-1 border-2 space-y-5 bg-white/60 p-6 FBOARD-border-1 overflow-auto">
      <div className="PostTitleBox border-2 border-double border-amber-600/30 rounded-md p-1 ">
        <label className="block p-1 mb-1 border-b-1 bg-igniteOrange-50/30 border-b-amber-900/30 text-gray-700 font-semibold">제목</label>
        <input
          className="w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="🔥 어떤 아이디어에 불을 붙이시겠어요?"
          required
        />
      </div>

      <div className="PostContentBox min-h-full rounded-md border-2 border-amber-600/30 p-1 border-double">
        <label className="block border-b-1 border-b-amber-900/30 bg-igniteOrange-50/30 p-1 mb-1 text-gray-700 font-semibold">
          내용
        </label>
        <textarea
          className="w-full p-2"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="자세히 작성해주세요."
          required
        />
      </div>


      <div className="ActionBox flex flex-col md:flex-row gap-2 justify-between items-center">
        <div className="CategoryBox">
          <label className="block mb-1 p-1 text-gray-700 font-semibold">태그</label>
          <select className="border border-gray-300 rounded-lg p-2" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="nomal">🗣 일반</option>
            <option value="idea">💡 아이디어</option>
            <option value="bug">🐞 버그 제보</option>
          </select>
        </div>
        <div className="userInfoBox flex flex-col md:flex-row gap-3" >
          <div className="userIdBox">
            <label className="block mb-1 p-1 text-gray-700 font-semibold overflow-x-auto">닉네임</label>
            <input
              className="p-1 FBOARD-border-1"
              type="text"
            />
          </div>
          <div className="userPasswordBox">
            <label className="block mb-1 p-1 text-gray-700 font-semibold overflow-x-auto">비밀번호</label>
            <input
              className="p-1 FBOARD-border-1 rounded-md"
              type="password"
            />
          </div>
        </div>
        <div className="SubmitBox min-w-35">
          <buttun type="submit" className="bg-ignite shadow-sm hover:bg-igniteOrange-600 text-shadow-md text-shadow-rose-400 text-white font-semibold p-1 rounded-lg" disabled={submitting}>
            {submitting ? "전송 중..." : "🔥 IGNIGHTING"}
          </buttun>
        </div>
      </div>
    </form>
  );
}
