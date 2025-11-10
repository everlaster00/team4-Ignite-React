import Link from 'next/link';
import NewForm from './NewForm';
import { createContact } from './actions';

export const dynamic = 'force-dynamic';

export default function NewContactPage() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden">
      {/* 라이트 효과 */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 bg-sky-200/40 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/4 w-1/2 h-40 bg-gradient-to-t from-sky-200/40 to-transparent blur-2xl" />

      {/* 메인 패널 */}
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-3xl px-4 py-10 space-y-6"> 
        <div className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-3xl shadow-xl shadow-sky-100/60 px-6 py-8 space-y-6 text-slate-800">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              문의 남기기
            </h1>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              목록으로
            </Link>
          </div>

          <NewForm action={createContact} />

          {/* 모바일 전용 목록 버튼 */}
          <Link
            href="/contact"
            className="block sm:hidden text-center text-xs text-slate-500 underline underline-offset-2"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}