"use client";

import { useState, useEffect } from "react";
import styles from "./landing.module.css";

export default function Landing({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [text, setText] = useState("");

  const fullText = "TimeTraveler";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      onFinish();
    }, 1000);
  };

  // 랜덤 별 생성
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = [...Array(50)].map(() => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setStars(newStars);
  }, []);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white ${styles.bgAurora} ${fadeOut ? styles.fadeOut : ""}`}
    >
      <h1 className={`${styles.typewriter} text-6xl font-extrabold mb-6`}>
        {text}
      </h1>

      <button
        onClick={handleClick}
        className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${styles.pulse}`}
      >
        시간의 문 열기 🚪
      </button>

      {/* 랜덤 별 */}
      {stars.map((star, i) => (
        <div
          key={i}
          className={`absolute bg-white rounded-full opacity-70 ${styles.twinkle}`}
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
