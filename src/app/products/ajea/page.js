"use client";
import { useEffect, useState } from "react";

// Next.js App Router 메타데이터 (선택 사항)
export async function generateMetadata() {
  return {
    title: "TimeTraveler | 시간의 마법사",
    description: "현재 날짜와 시간을 알려주는 마법 같은 페이지",
  };
}

function TimeMachine() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[now.getDay()];
  const time = now.toLocaleTimeString("ko-KR", { hour12: false });

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-indigo-400 max-w-sm w-full text-center">
      <h2 className="text-2xl font-bold mb-2">🕰 현재 시간</h2>
      <p className="text-lg">{year}년 {month}월 {date}일 ({day})</p>
      <p className="text-4xl font-mono mt-3 text-indigo-300">{time}</p>
      <p className="text-sm mt-4 text-gray-400 italic">
        “시간은 멈추지 않는다, 다만 네가 바라볼 뿐.”
      </p>
    </div>
  );
}

export default function TimeTravelerShowCase() {
  return (
    <div className="flex flex-col items-center mt-6 mx-8 font-sans">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <section className="flex flex-col items-center text-center w-full">
          <p className="text-3xl md:text-4xl font-bold text-indigo-600">
            TimeTraveler ⚙️
          </p>

          <div className="border-2 border-indigo-500 rounded-xl p-6 mt-4 max-w-lg bg-indigo-50 shadow-md">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-2">
              시간의 마법사
            </h1>
            <p className="text-gray-600 text-lg italic mb-3">
              “당신은 지금 어느 순간에 서 있나요?”
            </p>
            <p className="text-sm text-gray-500">
              TimeTraveler’s Interactive Showcase ⏳
            </p>
          </div>
        </section>

        <section className="flex justify-center items-center">
          <TimeMachine />
        </section>

      </div>
    </div>
  );
}
