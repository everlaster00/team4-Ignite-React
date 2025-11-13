// src/app/contact/page.jsx
import Link from 'next/link';
import { prismaJH as prisma } from '@/lib/prismaJH';
import { formatTimeAgo } from '@/utlls/timeUtils';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function ContactPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page || 1));
  const q = (sp?.q || '').trim();
  const status = (sp?.status || '').trim();

  const where = {
    AND: [
      q
        ? {
            OR: [
              { title: { contains: q } },
              { message: { contains: q } },
              { name: { contains: q } },
              { email: { contains: q } },
            ],
          }
        : {},
      status ? { status } : {},
    ],
  };

  const [total, items] = await Promise.all([
    prisma.Contact.count({ where }),
    prisma.Contact.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen w-full bg-white text-slate-800">
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-md px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-6">
          {/* 헤더 */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                  💬 문의하기
                </h1>
                <p className="text-xs md:text-sm text-slate-500">
                  궁금한 점을 남겨주시면 확인 후 연락드릴게요.
                </p>
              </div>

              {/* 데스크톱 전용 CTA (모바일과 동일 톤으로 통일) */}
              <Link
                href="/contact/new"
                className="hidden md:inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-7 py-3 text-sm font-semibold shadow hover:bg-slate-800 transition active:scale-[0.98]"
              >
                문의 남기기
              </Link>
            </div>

            {/* 모바일 전용 CTA */}
            <div className="md:hidden">
              <Link
                href="/contact/new"
                className="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 text-white py-3 font-semibold shadow active:scale-[0.98]"
              >
                문의 남기기
              </Link>
            </div>

            {/* 검색 영역 (모바일/PC 동일 룩앤필) */}
            <form className="mt-3 flex items-center gap-2 md:mt-0">
              <div className="relative w-full">
                <span className="hidden md:inline absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                <input
                  name="q" defaultValue={q} placeholder="제목, 내용, 이름 검색하기" 
                  className="
                    w-full rounded-xl border border-slate-300 bg-white
                    pl-3 pr-10 py-2.5 text-sm text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-slate-300
                    md:pl-9   /* PC에서만 아이콘 자리만큼 왼쪽 여백 넓게 */
                  "
                />
              </div>

              {/* 모바일: 아이콘, 데스크톱: 텍스트지만 동일한 버튼 톤 */}
              <button
                type="submit"
                className="shrink-0 rounded-xl border border-slate-300 bg-white text-slate-700 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 active:scale-[0.98] cursor-pointer md:px-6"
                aria-label="검색"
                title="검색"
              >
                <span className="md:hidden">🔍</span>
                <span className="hidden md:inline">검색</span>
              </button>
            </form>

          {/* 모바일 카드 리스트 */}
          <div className="space-y-3 md:hidden">
            {items.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center text-sm text-slate-500">
                아직 등록된 문의가 없습니다.
              </div>
            ) : (
              items.map((item) => (
                <Link
                  key={item.id}
                  href={`/contact/${item.id}`}
                  className="block rounded-2xl bg-slate-50 p-4 shadow-sm border border-slate-200 active:scale-[0.99] transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {item.title}
                    </h2>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.status === '답변 대기중'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.status || '답변 대기중'}
                    </span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">
                    {item.name}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    {formatTimeAgo(item.createdAt)}
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* PC 테이블 */}
          <div className="hidden md:block">
            {items.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500 text-sm border border-slate-200">
                아직 등록된 문의가 없습니다.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-100 text-xs text-slate-600">
                    <tr>
                      <th className="px-4 py-3 text-left w-16">No</th>
                      <th className="px-4 py-3 text-left">제목</th>
                      <th className="px-4 py-3 text-left w-40">작성자</th>
                      <th className="px-4 py-3 text-left w-32">상태</th>
                      <th className="px-4 py-3 text-left w-40">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 text-slate-400">
                          {total - (page - 1) * PAGE_SIZE - idx}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/contact/${item.id}`}
                            className="hover:underline text-slate-800"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.name}
                          
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
                              item.status === '답변 대기중'
                                ? 'bg-slate-100 text-slate-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {item.status || '답변 대기중'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {formatTimeAgo(item.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between text-[11px] sm:text-xs text-slate-500">
            <div>
              총 {total}건 · {page}/{totalPages} 페이지
            </div>
            <div className="flex gap-2">
              <Link
                href={
                  page > 1
                    ? `/contact?page=${page - 1}${
                        q ? `&q=${encodeURIComponent(q)}` : ''
                      }`
                    : '#'
                }
                className={`px-3 py-1 rounded-full border text-xs ${
                  page > 1
                    ? 'border-blue-300 text-blue-600 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    : 'bg-slate-100 text-slate-400 cursor-default border-slate-100'
                }`}
                aria-disabled={page <= 1}
              >
                이전
              </Link>
              <Link
                href={
                  page < totalPages
                    ? `/contact?page=${page + 1}${
                        q ? `&q=${encodeURIComponent(q)}` : ''
                      }`
                    : '#'
                }
                className={`px-3 py-1 rounded-full border text-xs ${
                  page < totalPages
                    ? 'border-blue-300 text-blue-600 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    : 'bg-slate-100 text-slate-400 cursor-default border-slate-100'
                }`}
                aria-disabled={page >= totalPages}
              >
                다음
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}