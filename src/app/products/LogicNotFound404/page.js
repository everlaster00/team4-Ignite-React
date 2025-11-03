"use client";

import { useEffect, useState } from "react";
// 아이콘 추가를 위해 react-icons 라이브러리가 필요할 수 있습니다. (예: npm install react-icons)
import { FiRefreshCw, FiCopy, FiCheck } from 'react-icons/fi'; 

export default function QuotesPage() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function fetchRandom() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/LogicNotFound404/random", { cache: "no-store" });
      if (!res.ok) throw new Error("명언을 가져오지 못했어요.");
      const data = await res.json();
      setQuote(data.quote);
      
      // “오늘의 명언” 로컬 저장 (하루 1개 유지)
      const todayKey = new Date().toISOString().slice(0, 10);
      localStorage.setItem("todayQuote", JSON.stringify({ date: todayKey, quote: data.quote }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // 첫 진입 시 “오늘의 명언” 캐시 있으면 사용
  useEffect(() => {
    const saved = localStorage.getItem("todayQuote");
    const todayKey = new Date().toISOString().slice(0, 10);
    if (saved) {
      const { date, quote } = JSON.parse(saved);
      if (date === todayKey) {
        setQuote(quote);
        return;
      }
    }
    fetchRandom();
  }, []);

  function copyToClipboard() {
    if (!quote) return;
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  
  return (
    // 배경을 다크 그레이로, 전체 폰트를 밝은 톤으로 변경하여 대비를 줍니다.
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center pt-12 pb-20">
      <div className="mx-auto max-w-3xl px-6 w-full">
        {/* 헤더: 강조된 색상과 굵은 폰트로 시선 집중 */}
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2 tracking-wide">
          <span className="text-yellow-400/90">오늘의</span> 개발자 명언 ✨
        </h1>
        <p className="text-gray-500 mb-10">당신의 코딩 영감을 깨워줄 한 줄의 지혜</p>

        {/* 명언 카드: 네온 효과의 테두리와 깊이감을 줍니다. */}
        <div className="relative rounded-2xl p-8 shadow-2xl bg-gray-800/80 
                      border border-indigo-500/50 transform transition-all duration-500 
                      hover:shadow-indigo-500/30">
            
          {loading && <p className="text-indigo-400">명언을 우주에서 불러오는 중…</p>}
          {error && <p className="text-red-400">{error}</p>}
          
          {quote && (
            <>
              {/* 명언 본문: 큰 폰트, 이탤릭체로 강조 */}
              <p className="text-2xl italic leading-relaxed text-gray-50">
                “{quote.text}”
              </p>
              
              {/* 저자: 오른쪽 아래 배치, 옅은 색상으로 깔끔하게 */}
              <p className="mt-6 text-right text-base text-indigo-300 font-semibold border-t border-gray-700 pt-4">
                — {quote.author}
              </p>

              {/* 버튼 영역: 2개의 버튼을 Flex로 배치, 세련된 디자인 적용 */}
              <div className="mt-8 flex justify-end gap-3 border-t border-gray-700 pt-5">
                
                {/* 다른 명언 보기 버튼 */}
                <button
                  onClick={fetchRandom}
                  className="flex items-center gap-2 bg-indigo-600 text-white font-medium 
                            px-4 py-2 rounded-full shadow-lg transition-transform duration-200 
                            hover:bg-indigo-500 hover:scale-105 active:scale-95 disabled:opacity-50"
                  disabled={loading}
                >
                  <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                  다른 명언 보기
                </button>
                
                {/* 복사하기 버튼 */}
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 font-medium px-4 py-2 rounded-full shadow-lg transition-colors duration-200 
                              ${copied ? "bg-green-500 text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
                  disabled={!quote}
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? "복사 완료!" : "복사하기"}
                </button>
                
              </div>
            </>
          )}
        </div>

        {/* 하단 정보 텍스트 */}
        <p className="mt-8 text-sm text-gray-600 text-center">
          💡 오늘의 명언은 매일 첫 접속 시 로컬에 저장되어 하루 동안 유지됩니다.
        </p>
      </div>
    </div>
  );
}