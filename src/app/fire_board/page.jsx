//src/app/fire_board/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FireCard from "./components/FireCard";
import LoadingSpinner from "@@/LoadingSpinner";

export default function FireBoardPage() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/fireboard?sort=${sort}`);
        if (!mounted) return;
        const data = res.ok ? await res.json() : [];
        setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("Fireboard list fetch failed:", e);
        setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sort]);

  return (
    <>
      <div className="flex justify-between items-center pb-3 border-b-1 border-amber-200">
        <h1 className="text-4xl font-bold  flex items-center gap-2">
          🔥<span className="bg-gradient-to-t from-igniteOrange-500 to-amber-400/80 bg-clip-text text-transparent">Fire Board</span>
        </h1>
        <Link href="/fire_board/write">
          <button className="bg-igniteOrange-500 hover:bg-amber-700 text-white font-semibold rounded-lg p-2">
            점화하기
          </button>
        </Link>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setSort("latest")} className={`px-3 py-1 rounded ${sort === "latest" ? "bg-amber-500 text-white" : "bg-white border"}`}>
          최신순
        </button>
        <button onClick={() => setSort("flame")} className={`px-3 py-1 rounded ${sort === "flame" ? "bg-amber-500 text-white" : "bg-white border"}`}>
          불꽃순🔥
        </button>
      </div>

      <div className="FBOARD-border-1 grid gap-4">
        {loading ? (
          <div className="text-center py-20"><LoadingSpinner/>로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 truncate">아직 점화된 글이 없습니다. 먼저 한 줄 점화해보세요!</div>
        ) : (
          posts.map((p) => <FireCard key={p.id} post={p} />)
        )}
      </div>
    </>
  );
}
