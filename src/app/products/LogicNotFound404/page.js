// src/app/products/LogicNotFound404/page.js
"use client";
import { useEffect, useState } from "react";
import { FiRefreshCw, FiCopy, FiCheck } from "react-icons/fi";

export default function QuotesPage() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [copied,  setCopied]  = useState(false);

  async function fetchRandom() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products/LogicNotFound404/random", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`명언을 가져오지 못했어요. (HTTP ${res.status})`);
      const data = await res.json();

      // 응답 스키마 검증 (방어코드)
      if (
        !data?.quote ||
        typeof data.quote.text !== "string" ||
        typeof data.quote.author !== "string"
      ) {
        throw new Error("서버 응답 형식이 올바르지 않습니다.");
      }
      setQuote(data.quote);
    } catch (e) {
      setQuote(null);
      setError(e.message || "알 수 없는 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandom(); // 첫 렌더 시 항상 서버에서 가져옴 (로컬 스토리지 사용 안 함)
  }, []);

  async function copyToClipboard() {
    if (!quote) return;
    try {
      await (navigator.clipboard?.writeText?.(
        `"${quote.text}" — ${quote.author}`
      ));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      alert("클립보드 복사에 실패했어요. 브라우저 권한을 확인해 주세요.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center pt-12 pb-20">
      <div className="mx-auto max-w-3xl px-6 w-full">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2 tracking-wide">
          <span className="text-yellow-400/90">오늘의</span> 개발자 명언 ✨
        </h1>
        <p className="text-gray-500 mb-10">당신의 코딩 영감을 깨워줄 한 줄의 지혜</p>

        <div className="relative rounded-2xl p-8 shadow-2xl bg-gray-800/80 
                        border border-indigo-500/50 transform transition-all duration-500 
                        hover:shadow-indigo-500/30">

          {loading && <p className="text-indigo-400">명언을 우주에서 불러오는 중…</p>}
          {error && !loading && <p className="text-red-400">{error}</p>}

          {quote && !loading && (
            <>
              <p className="text-2xl italic leading-relaxed text-gray-50">
                “{quote.text}”
              </p>
              <p className="mt-6 text-right text-base text-indigo-300 font-semibold border-t border-gray-700 pt-4">
                — {quote.author}
              </p>

              <div className="mt-8 flex justify-end gap-3 border-t border-gray-700 pt-5">
                <button
                  onClick={fetchRandom}
                  className="flex items-center gap-2 bg-indigo-600 text-white font-medium 
                             px-4 py-2 rounded-full shadow-lg transition-transform duration-200 
                             hover:bg-indigo-500 hover:scale-105 active:scale-95 disabled:opacity-50"
                  disabled={loading}
                >
                  <FiRefreshCw className={loading ? "animate-spin" : ""} />
                  다른 명언 보기
                </button>

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

          {!quote && !loading && !error && (
            <p className="text-gray-400">아직 명언이 없습니다. “다른 명언 보기”를 눌러보세요.</p>
          )}
        </div>

        {/* 로컬 스토리지 안내 문구 삭제 */}
      </div>
    </div>
  );
}