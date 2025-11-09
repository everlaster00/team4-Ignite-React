// src/app/products/Everlaster/MySrc/MyCalculator.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * @설명: '나이뜨!' 말풍선과 로컬 스토리지 저장이 있는 계산기 컴포넌트
 */
const MyCalculator = () => {
  // 1. useState: 계산 관련 상태
  const [display, setDisplay] = useState('0'); // 화면에 표시될 값
  const [resultHistory, setResultHistory] = useState([]); // 로컬 스토리지에 저장될 계산 기록 (최대 10개)
  const [showNice, setShowNice] = useState(false); // '나이뜨' 말풍선 표시 여부

  // 2. useRef: DOM 요소 또는 불변 값 참조
  const niceTimerRef = useRef(null); // '나이뜨' 말풍선을 숨기기 위한 타이머

  // 3. useEffect: 로컬 스토리지에서 기록 불러오기 (컴포넌트 마운트 시)
  useEffect(() => {
    // TODO: 로컬 스토리지에서 'CALC_HISTORY' 키의 값을 불러와서 setResultHistory에 저장하세요.
    console.log('--- 계산기 컴포넌트가 시작되었데이! ---');
  }, []); 

  
  // 4. 계산 버튼 클릭 핸들러 (임시)
  const handleButtonClick = (value) => {
    if (value === '=') {
      // TODO: 계산 로직 구현 후
      const newResult = `${display} = [임시 결과]`; // 실제 계산 결과를 넣을 자리

      // '나이뜨' 말풍선 띄우기
      setShowNice(true); 
      
      // 기록 업데이트 및 로컬 스토리지 저장 로직 실행
      updateHistory(newResult); 
    } else {
      // 숫자/연산자 입력 처리...
      setDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  // 5. 계산 기록 업데이트 및 저장 함수
  const updateHistory = (newResult) => {
    setResultHistory(prevHistory => {
      // TODO: 새 결과를 추가하고, 10개가 넘으면 오래된 기록을 제거하는 로직을 구현하세요.
      const updatedHistory = [newResult, ...prevHistory].slice(0, 10);
      
      // TODO: 업데이트된 기록을 로컬 스토리지에 저장하는 로직을 추가하세요.
      localStorage.setItem('CALC_HISTORY', JSON.stringify(updatedHistory));
      
      return updatedHistory;
    });
  };

  // 6. useEffect: '나이뜨' 말풍선 타이머 관리
  useEffect(() => {
    if (showNice) {
      // 1.5초 후에 말풍선을 숨기는 타이머 설정
      niceTimerRef.current = setTimeout(() => {
        setShowNice(false);
      }, 1500);
    }

    // 컴포넌트 언마운트 시 또는 showNice가 false가 될 때 타이머 정리
    return () => {
      if (niceTimerRef.current) {
        clearTimeout(niceTimerRef.current);
      }
    };
  }, [showNice]); 

  
  return (
    // 🔴 메인 컨테이너: Flexbox로 좌우 레이아웃 분할
    <div className="flex flex-col md:flex-row my-calculator-container p-3 bg-white shadow-xl rounded-lg font-sans space-y-6 md:space-y-0 md:space-x-6">
      
      {/* 🔴 1. 왼쪽 영역: 계산기 본체 (전체 공간의 2/3 차지) */}
      <div className="calculator-body w-full md:w-3/5 relative">
        
        {/* 1-1. 말풍선 (비주얼 아이디어 구현 자리) */}
        <div className={`nice-popup absolute left-[-45px] top-[-35px] bg-yellow-300 p-2 rounded-full rounded-br-none transform transition-opacity ${showNice ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-ychoi origin-center text-xl text-red-600 font-extrabold">✨ 나이뜨!</span>
        </div>
        
        {/* 1-2. 계산기 화면 */}
        <div className="display-screen text-right text-4xl mb-4 p-3 border-2 border-gray-300 rounded bg-gray-50 font-ychoi">
          {display}
        </div>

        {/* 1-3. 버튼 그리드 */}
        <div className="button-grid grid grid-cols-4 gap-2">
          
          {/* A: 모든 지우기 */}
          <button onClick={() => setDisplay('0')} className="p-4 bg-red-500 text-white rounded text-xl hover:bg-red-600">AC</button>
          {/* B: 숫자 버튼 */}
          <button onClick={() => handleButtonClick('7')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">7</button>
          <button onClick={() => handleButtonClick('8')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">8</button>
          <button onClick={() => handleButtonClick('9')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">9</button>
          {/* C: 연산자 */}
          <button onClick={() => handleButtonClick('/')} className="p-4 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">÷</button>

          <button onClick={() => handleButtonClick('4')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">4</button>
          <button onClick={() => handleButtonClick('5')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">5</button>
          <button onClick={() => handleButtonClick('6')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">6</button>
          <button onClick={() => handleButtonClick('*')} className="p-4 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">×</button>

          <button onClick={() => handleButtonClick('1')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">1</button>
          <button onClick={() => handleButtonClick('2')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">2</button>
          <button onClick={() => handleButtonClick('3')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">3</button>
          <button onClick={() => handleButtonClick('-')} className="p-4 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">-</button>

          {/* D: 0, 소수점, 결과 */}
          <button onClick={() => handleButtonClick('0')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300 col-span-2">0</button>
          <button onClick={() => handleButtonClick('.')} className="p-4 bg-gray-200 rounded text-xl hover:bg-gray-300">.</button>
          <button onClick={() => handleButtonClick('+')} className="p-4 bg-blue-500 text-white rounded text-xl hover:bg-blue-600">+</button>
          
          <button onClick={() => handleButtonClick('=')} className="p-4 bg-orange-500 text-white rounded text-xl hover:bg-orange-600 col-span-3">=</button>
          
        </div>

      </div> {/* 👈 calculator-body 끝 */}
      
      
      {/* 🔴 2. 오른쪽 영역: 로컬 스토리지 기록 목록 (전체 공간의 1/3 차지) */}
      <div className="history-section w-full lg:w-2/5 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 border-gray-200">
        <h3 className="lg:text-base xl:text-lg font-bold mb-2 text-left font-overwatch">💾 계산 기록</h3>
        <ul className="list-decimal pl-5 space-y-1">
          {resultHistory.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
          {resultHistory.length === 0 && <li className="lg:text-sm xl:text-base text-gray-400">기록이 없습니다.</li>}
        </ul>
      </div> {/* 👈 history-section 끝 */}
      
    </div>
  );
};

export default MyCalculator;