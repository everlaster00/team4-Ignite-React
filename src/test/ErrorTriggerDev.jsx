// app/components/ErrorTriggerDev.jsx
'use client'; 

import { useState } from 'react';

export default function ErrorTriggerDev() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('강제 서버 오류 테스트입니다!'); 
  }

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setShouldError(true)}
    >
      🚨 에러 페이지 보러 가기 (500 유발)
    </button>
  );
}