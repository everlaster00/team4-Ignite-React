// src/app/contact/new/NewForm.jsx
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

    // ✅ 기본 검증
    if (!name || name.length < 2) {
      return setError('이름은 2글자 이상 입력해주세요.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return setError('올바른 이메일 형식이 아닙니다.');
    }

    if (!title || title.length < 3) {
      return setError('제목은 3글자 이상 입력해주세요.');
    }

    if (!message || message.length < 5) {
      return setError('내용은 5글자 이상 입력해주세요.');
    }

    // ✅ 서버 액션 실행
    const res = await action(formData);
    if (res?.ok) {
      alert('문의가 정상적으로 접수되었습니다.');
      router.push('/contact');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>

      {/* ✅ 오류 메시지 표시 */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}

      <input name="name" className="border rounded w-full p-2" placeholder="이름" />
      <input name="email" type="email" className="border rounded w-full p-2" placeholder="이메일" />
      <input name="title" className="border rounded w-full p-2" placeholder="제목" />
      <textarea name="message" className="border rounded w-full p-2 h-40" placeholder="내용" />

      <button className="bg-black text-white px-4 py-2 rounded">문의 제출</button>
    </form>
  );
}