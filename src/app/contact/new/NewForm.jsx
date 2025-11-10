'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewForm({ action }) {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const title = formData.get('title')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !title || !message) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    const res = await action(formData);

    if (res?.ok) router.push('/contact');
    else setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 rounded-3xl p-5 sm:p-8 shadow-lg border border-sky-100 backdrop-blur-sm">
      {error && (
        <div className="text-red-600 text-xs sm:text-sm bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}

      <input
        name="name"
        className="border border-sky-100 rounded-xl w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-slate-400"
        placeholder="이름"
      />
      <input
        name="email"
        type="email"
        className="border border-sky-100 rounded-xl w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-slate-400"
        placeholder="이메일"
      />
      <input
        name="title"
        className="border border-sky-100 rounded-xl w-full px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-slate-400"
        placeholder="제목"
      />
      <textarea
        name="message"
        className="border border-sky-100 rounded-xl w-full px-4 py-3 sm:py-4 h-40 sm:h-56 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-slate-400"
        placeholder="내용"
      />

      <button
        type="submit"
        className="w-full rounded-full sm:rounded-2xl bg-sky-500 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-md hover:bg-sky-600 hover:shadow-lg active:scale-[0.98] transition whitespace-nowrap"
      >
        문의 제출
      </button>
    </form>
  );
}