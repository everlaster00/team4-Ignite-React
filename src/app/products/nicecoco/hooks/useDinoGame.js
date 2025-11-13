//게임 로직 훅
import { useState, useEffect, useCallback } from "react";
import { saveGameScore } from "../api/gameScore";

const GAME_WIDTH = 600;
const DINO_SIZE = 40;
const CACTUS_WIDTH = 30;
const CACTUS_HEIGHT = 40;
const JUMP_HEIGHT = 80;
const GRAVITY = 5;
const INITIAL_SPEED_MS = 20;
const INITIAL_MOVE_STEP = 5;
const SPEED_UP_THRESHOLD = 100;
const SPEED_UP_FACTOR = 1.1;

export default function useDinoGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [dinoBottom, setDinoBottom] = useState(0);
  const [cactusRight, setCactusRight] = useState(-CACTUS_WIDTH);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED_MS);
  const [cactusStep, setCactusStep] = useState(INITIAL_MOVE_STEP);

  // 시작
  const startGame = useCallback(() => {
    setGameOver(false);
    setIsJumping(false);
    setDinoBottom(0);
    setCactusRight(-CACTUS_WIDTH);
    setScore(0);
    setStartTime(Date.now());
    setGameSpeed(INITIAL_SPEED_MS);
    setCactusStep(INITIAL_MOVE_STEP);
  }, []);

  // 점프
  const jump = useCallback(() => {
    if (gameOver || isJumping) return;
    setIsJumping(true);
    let pos = dinoBottom;

    const up = setInterval(() => {
      if (pos >= JUMP_HEIGHT) {
        clearInterval(up);
        const down = setInterval(() => {
          if (pos <= 0) {
            clearInterval(down);
            setIsJumping(false);
            setDinoBottom(0);
            return;
          }
          pos -= GRAVITY;
          setDinoBottom(pos);
        }, INITIAL_SPEED_MS);
        return;
      }
      pos += GRAVITY;
      setDinoBottom(pos);
    }, INITIAL_SPEED_MS);
  }, [isJumping, dinoBottom, gameOver]);

  // 스페이스바
  useEffect(() => {
    const handler = (e) => {
      if (e.code === "Space") gameOver ? startGame() : jump();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameOver, jump, startGame]);

  // 점수
  useEffect(() => {
    if (!startTime || gameOver) return;
    const timer = setInterval(() => {
      setScore(Math.floor((Date.now() - startTime) / 100));
    }, 100);
    return () => clearInterval(timer);
  }, [startTime, gameOver]);

  // 속도 증가
  useEffect(() => {
    if (score > 0 && score % SPEED_UP_THRESHOLD === 0) {
      setGameSpeed((s) => Math.max(5, s / SPEED_UP_FACTOR));
      setCactusStep((s) => s * SPEED_UP_FACTOR);
    }
  }, [score]);

  // 선인장 이동
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setCactusRight((prev) => {
        if (prev > GAME_WIDTH) {
          const randomGap = Math.floor(Math.random() * (GAME_WIDTH / 2)) + 100;
          return -randomGap;
        }
        return prev + cactusStep;
      });
    }, gameSpeed);
    return () => clearInterval(interval);
  }, [gameOver, cactusStep, gameSpeed]);

  // 충돌 감지
  useEffect(() => {
    if (gameOver) return;
    const dinoLeft = 50;
    const dinoRight = dinoLeft + DINO_SIZE;
    const cactusLeft = GAME_WIDTH - (cactusRight + CACTUS_WIDTH);
    const cactusRightEdge = GAME_WIDTH - cactusRight;
    const hitX = dinoRight > cactusLeft && dinoLeft < cactusRightEdge;
    const hitY = dinoBottom < CACTUS_HEIGHT;

    if (hitX && hitY) {
      setGameOver(true);
      saveGameScore(score);
    }
  }, [cactusRight, dinoBottom, score, gameOver]);

  return { dinoBottom, cactusRight, score, gameOver, startGame, jump };
}
