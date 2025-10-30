"use client";

import { useEffect, useState } from "react";

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
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">오늘의 개발자 명언 🔥</h1>

      <div className="rounded-2xl border p-6 shadow-sm bg-white/70">
        {loading && <p>불러오는 중…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {quote && (
          <>
            <p className="text-xl leading-relaxed">“{quote.text}”</p>
            <p className="mt-3 text-right text-sm text-gray-600">— {quote.author}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={fetchRandom}
                className="btn border px-4 py-2 rounded-xl text-sm hover:opacity-90"
              >
                다른 명언 보기
              </button>
              <button
                onClick={copyToClipboard}
                className="btn border px-4 py-2 rounded-xl text-sm hover:opacity-90"
              >
                {copied ? "복사됨!" : "복사하기"}
              </button>
              
            </div>
          </>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        매일 첫 접속 시 나온 문구를 “오늘의 명언”으로 로컬에 저장해 하루 동안 유지합니다.
      </p>
    </div>
  );
}