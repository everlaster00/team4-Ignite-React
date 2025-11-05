// src/app/contact/new/page.jsx
import Link from 'next/link';
import NewForm from './NewForm';
import { createContact } from './actions';



export default async function ContactNewPage({ searchParams }) {
  const sp = await searchParams;
  const success = sp.success;              
    
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">문의 남기기</h1>
          <Link href="/contact" className="text-sm text-gray-600 hover:underline">
            ← 목록으로
          </Link>
        </div>

        {/* 성공 메시지 */}
        {success && (
          <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 p-4">
            문의가 완료되었습니다.
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-5">
          <NewForm action={createContact} />
        </div>
      </div>
    </div>
  );
}