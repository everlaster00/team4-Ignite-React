// src/app/contact/[id]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prismaJH as prisma } from '@/lib/prismaJH';

export const dynamic = 'force-dynamic';

export default async function ContactDetailPage({ params }) {
  const p = await params;
  const id = p.id;

  const item = await prisma.Contact.findUnique({
    where: { id: Number(id) },
  });

  if (!item) return notFound();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 overflow-hidden">
      {/* 라이트 효과 */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 bg-sky-200/40 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-[-80px] left-1/4 w-1/2 h-40 bg-gradient-to-t from-sky-200/40 to-transparent blur-2xl" />

      {/* 메인 패널 */}
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-3xl shadow-xl shadow-sky-100/60 px-5 sm:px-8 md:px-10 py-6 sm:py-8 space-y-6 text-slate-800">
          
          {/* 헤더 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              문의 상세
            </h1>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full md:rounded-2xl border border-sky-200 px-5 py-2.5 text-sm md:text-base text-sky-600 bg-white hover:bg-sky-100 hover:text-sky-700 transition w-full md:w-auto whitespace-nowrap"
            >
              목록으로
            </Link>
          </div>

          {/* 문의 내용 카드 */}
          <div className="rounded-2xl bg-white/90 border border-sky-100 p-5 sm:p-7 shadow-md shadow-sky-100/30 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="text-lg md:text-xl font-semibold text-slate-900 break-words">
                  {item.title}
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  {item.name} · {item.email}
                </div>
                <div className="text-[10px] md:text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>

              <span
                className={`self-start inline-flex items-center rounded-full md:rounded-2xl px-3 py-1.5 text-[10px] md:text-sm font-medium ${
                  item.status === '답변 대기중'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {item.status || '답변 대기중'}
              </span>
            </div>

            <div className="border-t border-sky-100 pt-4 text-sm md:text-base text-slate-700 whitespace-pre-wrap leading-relaxed">
              {item.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}