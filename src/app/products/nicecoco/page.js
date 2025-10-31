"use client";
import React, { useState, useEffect } from "react";

const DinoGame = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoBottom, setDinoBottom] = useState(0);
  const [cactusRight, setCactusRight] = useState(-20);
  const [gameOver, setGameOver] = useState(false);

  // 스페이스바 점프 이벤트
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isJumping) {
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJumping]);

  // 점프 함수
  const jump = () => {
    setIsJumping(true);
    let position = 0;
    const upInterval = setInterval(() => {
      if (position >= 80) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            setIsJumping(false);
          }
          position -= 5;
          setDinoBottom(position);
        }, 20);
      }
      position += 5;
      setDinoBottom(position);
    }, 20);
  };

  // 선인장 이동
  useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setCactusRight((prev) => (prev > 620 ? -20 : prev + 5));
    }, 20);
    return () => clearInterval(move);
  }, [gameOver]);

  // 충돌 감지
  useEffect(() => {
    if (cactusRight > 510 && cactusRight < 550 && dinoBottom < 40) {
      setGameOver(true);
    }
  }, [cactusRight, dinoBottom]);

  // 스타일 정의
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f7f7f7",
    },
    game: {
      position: "relative",
      width: 600,
      height: 200,
      background: "linear-gradient(#fff, #eaeaea)",
      borderBottom: "2px solid #555",
      overflow: "hidden",
    },
    dino: {
      position: "absolute",
      bottom: dinoBottom,
      left: 50,
      width: 40,
      height: 40,
      background: "#333",
      borderRadius: 5,
      transition: "bottom 0.02s",
    },
    cactus: {
      position: "absolute",
      bottom: 0,
      right: cactusRight,
      width: 20,
      height: 40,
      background: "#228b22",
    },
    text: {
      position: "absolute",
      top: 80,
      left: "40%",
      color: "#d00",
      fontWeight: "bold",
      fontSize: 24,
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.game}>
        <div style={styles.dino}></div>
        <div style={styles.cactus}></div>
        {gameOver && <div style={styles.text}>게임 오버!</div>}
      </div>
    </div>
  );
};

export default DinoGame;
