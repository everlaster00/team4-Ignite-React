'use client';
import { useRouter } from 'next/navigation';

export default function NewForm({ action }) {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await action(formData);        // 서버 액션 호출
    if (res?.ok) {
      alert('질문을 남겼습니다. 확인 후 답변드리겠습니다.'); // ✅ 클라이언트에서 alert
      router.push('/contact');                  // ✅ 그 다음 이동
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" className="border rounded w-full p-2" placeholder="이름" required />
      <input name="email" type="email" className="border rounded w-full p-2" placeholder="이메일" required />
      <input name="title" className="border rounded w-full p-2" placeholder="제목" required />
      <textarea name="content" className="border rounded w-full p-2 h-40" placeholder="내용" required />
      <button className="bg-black text-white px-4 py-2 rounded">문의 제출</button>
    </form>
  );
}