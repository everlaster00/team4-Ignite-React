// src/app/fire_board/page.jsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FireCard from "./components/FireCard";
import LoadingSpinner from "@@/LoadingSpinner";
import FireCardHeader from "./components/FireCardHeader";

const POSTS_PER_PAGE = 10;

export default function FireBoardPage() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const limit = POSTS_PER_PAGE;
        const offset = (currentPage - 1) * limit;
        
        // ⭐ API 호출 수정 (limit과 offset 포함)
        const url = `/api/fireboard?sort=${sort}&limit=${limit}&offset=${offset}`;
        const res = await fetch(url);

        if (!mounted) return;

        const result = res.ok ? await res.json() : { posts: [], totalCount: 0 };
        
        setPosts(Array.isArray(result.posts) ? result.posts : []);
        setTotalCount(result.totalCount || 0); 
      } catch (e) {
        console.warn("게시글 목록 읽어오기 실패:", e);
        setPosts([]);
        setTotalCount(0);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sort, currentPage]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const pageNumbers = [];
  // 현재 페이지를 중심으로 최대 5개의 페이지 번호만 표시
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

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
        {/* ⭐ [수정] 최신순 버튼: 정렬 변경 시 페이지 1로 초기화 */}
        <button 
          onClick={() => { setSort("latest"); setCurrentPage(1); }} 
          className={`px-3 py-1 FBOARD-border-1 ${sort === "latest" ? "bg-igniteOrange-500/85 text-white" : "bg-white border"}`}
        >
          최신순
        </button>
        {/* ⭐ [수정] 불꽃순 버튼: 정렬 변경 시 페이지 1로 초기화 */}
        <button 
          onClick={() => { setSort("flame"); setCurrentPage(1); }} 
          className={`px-3 py-1 FBOARD-border-1 ${sort === "flame" ? "bg-igniteOrange-500/85 text-white" : "bg-white border"}`}
        >
          불꽃순🔥
        </button>
      </div>

      <div className="FBOARD-border-1 p-2 space-y-2 mb-4">
        <FireCardHeader />
        {loading ? (
          <div className="text-center py-20"><LoadingSpinner/>로딩 중...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 truncate">아직 점화된 글이 없습니다. 먼저 한 줄 점화해보세요!</div>
        ) : (          
          posts.map((p) => <FireCard key={p.id} post={p} />)
        )}
      </div>
      
      {/* ⭐ [추가] 페이지네이션 UI ⭐ */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-3">
          
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg bg-white disabled:opacity-50"
          >
            이전
          </button>
          
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg outline-2 outline-white border-1 border-amber-500/30 font-semibold transition ${
                currentPage === page ? "bg-igniteOrange-500 text-white" : "bg-igniteOrange-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg bg-white disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </>
  );
}