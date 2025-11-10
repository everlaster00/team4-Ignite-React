"use client";
import React, { useState, useEffect, useCallback } from "react";

// --- 1. 게임 상수 설정 (클린 코드 및 쉬운 조정) ---
const GAME_WIDTH = 600;
const GAME_HEIGHT = 200;
const DINO_SIZE = 40;
const CACTUS_WIDTH = 30;
const CACTUS_HEIGHT = 40;
const JUMP_HEIGHT = 80;
const GRAVITY = 5; // 점프 및 하강 속도 조절

const INITIAL_GAME_SPEED_MS = 20; // 초기 게임 루프 시간 간격 (ms)
const INITIAL_MOVE_STEP = 5; // 초기 선인장 이동 거리 (px)
const SPEED_UP_THRESHOLD = 100; // ⭐ 100점마다 속도 증가
const SPEED_UP_FACTOR = 1.1; // ⭐ 속도 증가 비율 (10% 증가)

// 게임 점수 기록을 위한 더미 API 함수 (실제 DB 연동 필요)
const saveGameScore = async (score) => {
  const record = {
    score: score,
    date: new Date().toISOString(),
  };
  console.log("점수 기록 시도:", record);
  return true;
};

const DinoGame = () => {
  // --- 2. 상태 관리 (State) ---
  const [isJumping, setIsJumping] = useState(false);
  const [dinoBottom, setDinoBottom] = useState(0);
  const [cactusRight, setCactusRight] = useState(-CACTUS_WIDTH);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);

  // ⭐ 속도 조절을 위한 상태 추가
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED_MS);
  const [cactusMoveStep, setCactusMoveStep] = useState(INITIAL_MOVE_STEP);

  // --- 3. 게임 시작 및 재시작 함수 ---
  const startGame = useCallback(() => {
    setGameOver(false);
    setIsJumping(false);
    setDinoBottom(0);
    setCactusRight(-CACTUS_WIDTH);
    setScore(0);
    setGameStartTime(Date.now());

    // ⭐ 속도 초기화
    setGameSpeed(INITIAL_GAME_SPEED_MS);
    setCactusMoveStep(INITIAL_MOVE_STEP);
  }, []);

  // --- 4. 점프 로직 (수정 없음) ---
  const jump = useCallback(() => {
    if (gameOver || isJumping) return;

    // ... (점프 로직) ...
    // Note: 점프 속도(GRAVITY, GAME_SPEED)는 게임 속도에 맞추지 않고 고정 유지
    // ...
    setIsJumping(true);
    let position = dinoBottom;

    // A. 위로 올라가기
    const upInterval = setInterval(() => {
      if (position >= JUMP_HEIGHT) {
        clearInterval(upInterval);
        // B. 아래로 내려가기
        const downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            setIsJumping(false);
            setDinoBottom(0); // 바닥에 정확히 착지
            return;
          }
          position -= GRAVITY;
          setDinoBottom(position);
        }, INITIAL_GAME_SPEED_MS); // 점프 인터벌은 고정된 값 사용
        return;
      }
      position += GRAVITY;
      setDinoBottom(position);
    }, INITIAL_GAME_SPEED_MS); // 점프 인터벌은 고정된 값 사용
  }, [gameOver, isJumping, dinoBottom]);

  // 스페이스바 입력 이벤트 리스너 (수정 없음)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        if (gameOver) {
          startGame();
        } else {
          jump();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, jump, startGame]);

  // --- A. ⭐ [NEW] 점수 계산 로직 (별도 분리) ---
  useEffect(() => {
    if (gameOver || !gameStartTime) return;

    // 점수 업데이트 루프 (100ms마다 실행)
    const scoreInterval = setInterval(() => {
      const currentScore = Math.floor((Date.now() - gameStartTime) / 100); // 0.1초당 1점
      setScore(currentScore);
    }, 100);

    return () => clearInterval(scoreInterval);
  }, [gameOver, gameStartTime]);

  // --- B. ⭐ [NEW] 속도 조절 로직 (100점마다 속도 증가) ---
  useEffect(() => {
    // 100점의 배수가 될 때마다
    if (score > 0 && score % SPEED_UP_THRESHOLD === 0) {
      // 주의: 너무 빨라지면 gameSpeed가 0에 가까워져 오류가 날 수 있으므로 최소 속도 제한
      setGameSpeed((prevSpeed) => Math.max(5, prevSpeed / SPEED_UP_FACTOR));

      // 이동 거리도 함께 늘려서 속도감 향상
      setCactusMoveStep((prevStep) => prevStep * SPEED_UP_FACTOR);

      console.log(
        `속도 증가! 현재 속도(ms): ${gameSpeed.toFixed(
          2
        )}, 이동 폭: ${cactusMoveStep.toFixed(2)}`
      );
    }
  }, [score]); // ⭐ score가 바뀔 때마다 체크

  // --- C. ⭐ 선인장 이동 루프 (gameSpeed, cactusMoveStep에 의존) ---
  useEffect(() => {
    if (gameOver) return;

    const moveCactus = () => {
      setCactusRight((prev) => {
        if (prev > GAME_WIDTH) {
          const randomGap = Math.floor(Math.random() * (GAME_WIDTH / 2)) + 100;
          return -randomGap;
        }
        // ⭐ 동적으로 변경된 이동 폭 사용
        return prev + cactusMoveStep;
      });
    };

    // ⭐ 동적으로 변경된 GAME_SPEED로 인터벌 설정
    const interval = setInterval(moveCactus, gameSpeed);

    return () => clearInterval(interval);
  }, [gameOver, gameSpeed, cactusMoveStep]); // ⭐ gameSpeed와 cactusMoveStep이 바뀔 때 재실행

  // --- 6. 충돌 감지 로직 (수정 없음) ---
  useEffect(() => {
    if (gameOver) return;

    // ... (충돌 감지 로직) ...
    const dinoXLeft = 50;
    const dinoXRight = dinoXLeft + DINO_SIZE;
    const cactusXLeft = GAME_WIDTH - (cactusRight + CACTUS_WIDTH);
    const cactusXRight = GAME_WIDTH - cactusRight;
    const isXColliding = dinoXRight > cactusXLeft && dinoXLeft < cactusXRight;
    const isYColliding = dinoBottom < CACTUS_HEIGHT;

    // 최종 충돌
    if (isXColliding && isYColliding) {
      setGameOver(true);
      console.log("게임 오버! 점수:", score);
      saveGameScore(score);
    }
  }, [cactusRight, dinoBottom, gameOver, score]);

  // --- 7. 스타일 정의 (수정 없음) ---
  const styles = {
    // ... (기존 스타일 코드) ...
    wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f7f7f7",
    },
    game: {
      position: "relative",
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      background: "linear-gradient(#fff, #eaeaea)",
      borderBottom: "2px solid #555",
      overflow: "hidden",
    },
    dino: {
      position: "absolute",
      bottom: dinoBottom,
      left: 50,
      width: DINO_SIZE,
      height: DINO_SIZE,
      backgroundImage: "url('/imgs/dino-run.webp')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      transition: "bottom 0.02s",
      zIndex: 10,
    },
    cactus: {
      position: "absolute",
      bottom: 0,
      right: cactusRight,
      width: CACTUS_WIDTH,
      height: CACTUS_HEIGHT,
      backgroundImage: "url('/imgs/catcus.webp')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      zIndex: 5,
    },
    message: {
      position: "absolute",
      top: 80,
      left: "50%",
      transform: "translateX(-50%)",
      color: "#d00",
      fontWeight: "bold",
      fontSize: 24,
      textAlign: "center",
      padding: 10,
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: 5,
      border: "1px solid #d00",
      cursor: "pointer",
    },
    scoreDisplay: {
      position: "absolute",
      top: 10,
      right: 10,
      fontWeight: "bold",
      fontSize: 18,
    },
  };

  // --- 8. 렌더링 (화면에 표시) ---
  return (
    <div style={styles.wrapper}>
      <h1>🦖 공룡 달리기 게임 🌵</h1>
      <div style={styles.game}>
        <div style={styles.dino}></div>
        <div style={styles.cactus}></div>
        <div style={styles.scoreDisplay}>점수: {score}</div>
        {gameOver && (
          <div style={styles.message} onClick={startGame}>
            게임 오버! (점수: {score})<br />
            **스페이스바를 눌러 다시 시작**
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoGame;
