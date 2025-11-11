"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FireCard from "./components/FireCard";

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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-igniteOrange-500 flex items-center gap-2">
          🔥 Fire Board
        </h1>
        <Link href="/fireboard/write">
          <button className="bg-amber-500 hover:bg-amber-700 text-white font-semibold rounded-sm p-1">
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

      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-20">로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">아직 점화된 글이 없습니다. 먼저 한 줄 점화해보세요!</div>
        ) : (
          posts.map((p) => <FireCard key={p.id} post={p} />)
        )}
      </div>
    </div>
  );
}
