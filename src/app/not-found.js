'use client';

import Link from 'next/link';
import Image from 'next/image';
import IMG_NotFound from '@/assets/images/NotFound2.webp';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      {/* 이미지 */}
      <Image
        src={IMG_NotFound}
        alt="NotFoundPageIcon"
        width={400}
        height={400}
        priority
        className="mb-6"
      />

      {/* 텍스트 */}
      <h1 className="text-4xl font-extrabold text-blue-600">어디찾아요.. ??</h1>
      <h2 className="text-2xl font-bold mt-3 text-gray-800 dark:text-gray-200">
        페이지를 찾을 수 없습니다 (404)
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>

      {/* 홈으로 돌아가기 버튼 */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        홈으로 돌아가기
      </Link>

      {/* 개발환경 안내 */}
      {process.env.NODE_ENV === 'development' && (
        <p className="mt-6 text-xs text-gray-400">
          ⚙️ 개발 모드에서는 404 페이지가 <code>app/not-found.jsx</code>에서 렌더링됩니다.
        </p>
      )}
    </div>
  );
}