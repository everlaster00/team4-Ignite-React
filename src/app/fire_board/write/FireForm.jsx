"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FireForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("idea");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/fireboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tag })
      });
      if (res.ok) {
        router.push("/fireboard");
      } else {
        console.warn("작성 실패", res.status);
      }
    } catch (err) {
      console.error("작성 중 오류:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white/80 p-6 rounded-2xl shadow-md border border-igniteOrange-200">
      <div>
        <label className="block mb-1 text-gray-700 font-semibold">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="🔥 어떤 아이디어에 불을 붙이시겠어요?"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700 font-semibold">내용</label>
        <textarea
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="자세히 작성해주세요."
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700 font-semibold">태그</label>
        <select className="w-full border border-gray-300 rounded-lg p-2" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="idea">💡 아이디어</option>
          <option value="bug">🐞 버그 제보</option>
          <option value="praise">✨ 칭찬</option>
          <option value="opinion">🗣 의견</option>
        </select>
      </div>

      <buttun type="submit" className="bg-ignite-orange-100 hover:bg-igniteOrange-600 text-white font-semibold px-6 py-2 rounded-lg" disabled={submitting}>
        {submitting ? "전송 중..." : "🔥 점화하기"}
      </buttun>
    </form>
  );
}
