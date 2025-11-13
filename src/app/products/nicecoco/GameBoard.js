"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const GameBoard = ({ onExit }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoBottom, setDinoBottom] = useState(0);
  const [cactusRight, setCactusRight] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rankings, setRankings] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);

  const gravity = 3;

  // ---------------- 점프 기능 ----------------
  const handleJump = (e) => {
    if (e.code !== "Space" || isJumping || gameOver) return;
    setIsJumping(true);

    let upInterval = setInterval(() => {
      setDinoBottom((prev) => {
        if (prev >= 120) {
          clearInterval(upInterval);
          let downInterval = setInterval(() => {
            setDinoBottom((prev) => {
              if (prev <= 0) {
                clearInterval(downInterval);
                setIsJumping(false);
                return 0;
              }
              return prev - gravity;
            });
          }, 20);
          return prev;
        }
        return prev + 5;
      });
    }, 20);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("keydown", handleJump);
    return () => window.removeEventListener("keydown", handleJump);
  }, [isJumping, gameOver]);

  // ---------------- 선인장 이동 ----------------
  useEffect(() => {
    if (gameOver) return;
    const cactusTimer = setInterval(() => {
      setCactusRight((prev) => (prev >= 600 ? 0 : prev + 5));
    }, 20);
    return () => clearInterval(cactusTimer);
  }, [gameOver]);

  // ---------------- 충돌 감지 ----------------
  useEffect(() => {
    if (cactusRight > 520 && cactusRight < 580 && dinoBottom < 40) {
      setGameOver(true);
    }
  }, [cactusRight, dinoBottom]);

  // ---------------- 점수 증가 ----------------
  useEffect(() => {
    if (gameOver) return;
    const scoreInterval = setInterval(() => setScore((prev) => prev + 1), 500);
    return () => clearInterval(scoreInterval);
  }, [gameOver]);

  // ---------------- Supabase 저장 ----------------
  const saveScore = async (name, score) => {
    try {
      console.log("🎯 Supabase 연결 테스트:", supabase);

      const { data, error } = await supabase
        .from("scores")
        .insert([{ player_name: name || "익명", score }])
        .select();

      if (error) {
        console.error("❌ 점수 저장 실패:", error.message);
        alert("점수 저장 중 오류가 발생했습니다.\n" + error.message);
        return;
      }

      console.log("✅ 점수 저장 성공:", data);
      alert("점수 저장 성공!");
    } catch (err) {
      console.error("🔥 예외 발생:", err);
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  // ---------------- 랭킹 불러오기 ----------------
  async function fetchRankings() {
    const { data, error } = await supabase
      .from("scores")
      .select("id, player_name, score")
      .order("score", { ascending: false })
      .limit(5);

    if (error) {
      console.error("❌ 랭킹 조회 실패:", error.message || error);
      return;
    }

    if (Array.isArray(data)) {
      setRankings(data);
    } else {
      console.warn("⚠️ 데이터가 배열 형태가 아닙니다:", data);
      setRankings([]);
    }
  }

  useEffect(() => {
    if (gameOver) fetchRankings();
  }, [gameOver]);

  const handleSaveRanking = () => {
    if (!playerName.trim()) {
      alert("플레이어 이름을 입력해 주세요!");
      return;
    }
    saveScore(playerName.trim());
  };

  // ---------------- 렌더링 ----------------
  return (
    <div className="relative w-[600px] h-[450px] bg-gradient-to-b from-green-100 to-green-200 overflow-hidden rounded-lg border border-green-400 mx-auto mt-10">
      {/* 공룡 */}
      <img
        src="/imgs/dino-run.png"
        alt="Dino"
        style={{
          position: "absolute",
          bottom: `${dinoBottom}px`,
          left: "50px",
          width: "60px",
        }}
      />

      {/* 선인장 */}
      <img
        src="/imgs/cactus.png"
        alt="Cactus"
        style={{
          position: "absolute",
          bottom: "0px",
          right: `${cactusRight}px`,
          width: "40px",
        }}
      />

      <div className="absolute top-2 right-3 text-gray-700 font-bold text-lg">
        점수: {score}
      </div>

      {/* 게임오버 화면 */}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
          <h2 className="text-2xl font-bold text-red-600 mb-2">게임 오버!</h2>
          <p className="text-xl font-semibold mb-4">최종 점수: {score}점</p>

          {!scoreSaved ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder="플레이어 이름 (최대 10자)"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.slice(0, 10))}
                className="mb-2 p-2 border border-gray-300 rounded-lg text-sm w-48 text-center"
              />
              <button
                onClick={handleSaveRanking}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-3"
              >
                랭킹 기록하기
              </button>
            </div>
          ) : (
            <p className="text-green-600 font-semibold mb-3">
              🎉 랭킹에 기록되었습니다!
            </p>
          )}

          <button
            onClick={onExit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            다시 시작
          </button>

          <div className="mt-4 bg-gray-100 rounded-lg p-3 w-60">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              🏆 랭킹 Top 5
            </h3>
            {rankings.length === 0 ? (
              <p className="text-gray-600 text-sm">기록이 없습니다.</p>
            ) : (
              <ul className="text-left">
                {rankings.map((r, i) => (
                  <li
                    key={r.id}
                    className="text-gray-700 text-sm flex justify-between"
                  >
                    <span>
                      {i + 1}. {r.player_name}
                    </span>
                    <span>{r.score}점</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
