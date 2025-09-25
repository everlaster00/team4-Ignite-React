// 파스칼 케이스
// 이름 짓는 방법
// 케밥케이스, 카멜케이스, 파스칼케이스
// 파스칼 케이스는 = 대문자로 시작, 단어시작이 대문자

'use client';

export function SubmitButton({ children, isPending, loadingText = '처리중...' }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`px-6 py-2 rounded text-white transition-all ${
        isPending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
      }
    `}
    >
      {isPending ? loadingText : children}
    </button>
  );
}
