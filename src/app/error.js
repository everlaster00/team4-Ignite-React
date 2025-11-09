//app/error.js
'use client'

import { useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import SadNight from '@/assets/images/SadNight.webp'

export default function Error({ error, reset }) {
  useEffect(()=>{
    console.error(error)
  },[error])

  return (
    <div className="ErrorPageBody overflow-auto h-screen flex flex-row items-center justify-center m-2 bg-gray-50">
      <div className="ErrorIconBox p-4 flex-1/3 justify-center items-center relative">
        <Image src={SadNight} alt="ErrorPageIcon" width={512} height={512} />
      </div>
      <div className="flex-2/3 flex flex-col items-center justify-center h-full text-center bg-gray-50 dark:bg-gray-900 p-4 relative">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-blue-600">
          Oops! 💥
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 text-gray-800 dark:text-gray-200">
          서버에 예기치 않은 오류가 발생했어요! (500)
        </h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400">
          불편을 드려 죄송해요. 저희가 최대한 빨리 해결할게요.
        </p>

        {/* 📌 2. 복구 버튼 */}
        <button
          className="cursor-pointer mt-6 md:mt-8 px-4 md:px-6 py-1 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={
            // 💡 reset 함수를 실행해서 현재 라우트 세그먼트의 복구를 시도.
            () => reset()
          }
        >
          다시 시도하기
        </button>

        {/* 📌 3. 메인으로 돌아가기 */}
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          메인 페이지로 돌아가기
        </Link>
        
        {/* 📌 4. 에러 정보 표시 (개발 모드에서만) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-sm text-gray-500 max-w-lg whitespace-pre-wrap">
            <summary>개발자/디버깅 정보 (클릭)</summary>
            {error.message}
          </details> 
        )}
      </div>
    </div>
  )
}