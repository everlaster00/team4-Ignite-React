"use client";

import AjeaLayout from "./layout";
import { useEffect, useState } from "react";

export default function Page() {

  /* -------------------------------
     🪄 본편: TimeTravelerShowCase
  ------------------------------- */
  function TimeTravelerShowCase() {
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

    // 🧭 기능 카드
    const features = [
      { title: "현재 시간 보기", desc: "지금 이 순간의 시간을 확인할 수 있습니다.", icon: "🕰" },
      { title: "과거 기록 확인", desc: "과거의 시간과 이벤트를 되돌아보세요.", icon: "📜" },
      { title: "미래 예측 보기", desc: "앞으로의 가능성을 시각화해보세요.", icon: "🔮" },
      { title: "별자리 예언 읽기", desc: "오늘의 별자리 운세와 미래 예언을 확인하세요.", icon: "✨" },
    ];

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black flex flex-col items-center justify-center overflow-hidden text-white font-sans">
        {/* ✨ 별빛 배경 */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* 🪶 콘텐츠 */}
        <div className="relative z-10 w-11/12 max-w-6xl flex flex-col items-center gap-10 text-center">
          {/* 제목 영역 */}
          <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500 backdrop-blur-md shadow-lg">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-200 mb-2 animate-fadeInDown">
              시간의 마법사 ✦ TimeTraveler
            </h1>
            <p className="text-indigo-300 italic text-sm">
              “당신은 지금 어느 순간에 서 있나요?”
            </p>
          </div>

          {/* 현재 시간 카드 */}
          <div className="p-6 bg-slate-900/80 text-white rounded-xl shadow-lg border border-indigo-400 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">🕰 현재 시간</h2>
            <p className="text-lg">{year}년 {month}월 {date}일 ({day})</p>
            <p className="text-4xl font-mono mt-3 text-indigo-300">{time}</p>
            <p className="text-sm mt-4 text-gray-400 italic">
              “시간은 멈추지 않는다, 다만 네가 바라볼 뿐.”
            </p>
          </div>

          {/* 🧭 기능 카드 4개 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full">
            {features.map((f, i) => (
              <div
                key={i}
                className="relative p-6 rounded-xl shadow-md border border-indigo-300 bg-gradient-to-br from-indigo-50/10 to-indigo-900/20 text-indigo-200 transform transition-all duration-500 hover:scale-105 hover:shadow-indigo-500/30 hover:bg-indigo-800/40 backdrop-blur-sm group"
              >
                <div className="text-4xl mb-3 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-indigo-300 mb-2 transition-colors duration-300 group-hover:text-indigo-100">
                  {f.title}
                </h3>
                <p className="text-sm text-indigo-200/80">{f.desc}</p>

                {/* 카드 하단 빛나는 라인 */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AjeaLayout>
      <TimeTravelerShowCase />
    </AjeaLayout>
  );
}

/* -------------------------------
🌟 twinkle 애니메이션 (global.css)
------------------------------- */
/*
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
.animate-twinkle {
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes fadeInDown {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fadeInDown {
  animation: fadeInDown 1.5s ease-out;
}
*/
