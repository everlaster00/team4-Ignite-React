"use client";
import React, { useState } from "react";
import GameBoard from "./GameBoard";

const NiceCocoPage = () => {
  const [started, setStarted] = useState(false);

  if (started) return <GameBoard onExit={() => setStarted(false)} />;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 text-center">
      <h1 className="text-3xl font-bold mb-4">🦖 공룡 달리기 게임 🌵</h1>
      <p className="max-w-md text-gray-700 mb-6 leading-relaxed">
        스페이스바를 눌러 공룡이 선인장을 피하도록 도와주세요!
        <br />
        시간에 따라 점수가 올라가며, 100점마다 속도가 점점 빨라집니다.
      </p>

      <button
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
        onClick={() => setStarted(true)}
      >
        ▶ 게임 시작
      </button>
    </div>
  );
};

export default NiceCocoPage;
