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
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                문의하기
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                궁금한 점을 남겨주시면 확인 후 연락드릴게요.
              </p>
            </div>

            <Link
              href="/contact/new"
              className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-bold text-white shadow hover:bg-blue-500 transition active:scale-[0.98]"
            >
              문의 남기기
            </Link>
          </div>

          {/* 검색 */}
          <form className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              name="q"
              defaultValue={q}
              placeholder="제목, 내용, 이름, 이메일 검색"
              className="w-full rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-blue-600 px-5 sm:px-8 py-3 sm:py-2.5 text-base sm:text-sm font-semibold text-white shadow hover:bg-blue-500 transition active:scale-[0.98] whitespace-nowrap"
            >
              검색
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
                    {item.name} · {item.email}
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
                          <div className="text-[11px] text-slate-400">
                            {item.email}
                          </div>
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