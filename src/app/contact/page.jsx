import Link from 'next/link';
import { prismaJH as prisma } from '@/lib/prismaJH';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export default async function ContactPage({ searchParams }) {
  const page = Math.max(1, Number(searchParams?.page || 1));
  const q = (searchParams?.q || '').trim();

  const where = q
    ? {
        OR: [
          { title: { contains: q } },
          { content: { contains: q } },
          { name: { contains: q } },
          { email: { contains: q } },
        ],
      }
    : {};

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

  function buildQuery(to, params) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && `${v}` !== '') sp.set(k, `${v}`);
    });
    return `${to}?${sp.toString()}`;
  }

  const baseParams = { q };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">문의하기</h1>
            <p className="text-sm text-gray-500">최근 문의를 검색해 보세요.</p>
          </div>

          {/* 여기 추가 */}
          <Link
            href="/contact/new"
            className="inline-flex items-center rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition"
          >
            문의 남기기
          </Link>
        </div>

        {/* 검색 */}
        <div className="bg-white rounded-2xl shadow p-4">
          <form method="GET" className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              name="q"
              placeholder="제목/내용/이름/이메일 검색"
              defaultValue={q}
              className="input input-bordered w-full md:w-80 border rounded px-3 py-2"
            />
            <button type="submit" className="ml-auto md:ml-0 rounded bg-black text-white px-4 py-2">
              검색
            </button>
          </form>
        </div>

        {/* 목록 */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left bg-gray-50">
                <th className="p-3 w-16">No</th>
                <th className="p-3">제목</th>
                <th className="p-3 w-56">작성자</th>
                <th className="p-3 w-32">상태</th>
                <th className="p-3 w-48">작성일</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    조건에 맞는 문의가 없습니다.
                  </td>
                </tr>
              ) : (
                items.map((it, idx) => {
                  const rowNo = total - ((page - 1) * PAGE_SIZE + idx);
                  return (
                    <tr key={it.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-gray-500">{rowNo}</td>
                      <td className="p-3">
                        <Link href={`/contact/${it.id}`} className="font-semibold hover:underline">
                          {it.title}
                        </Link>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-900">{it.name}</div>
                        <div className="text-xs text-gray-500">{it.email}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            it.status === 'closed'
                              ? 'bg-gray-200 text-gray-700'
                              : it.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {it.status || 'open'}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(it.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            총 {total.toLocaleString()}건 · {page}/{totalPages}페이지
          </div>
          <div className="flex gap-2">
            <Link
              href={buildQuery('/contact', { ...baseParams, page: Math.max(1, page - 1) })}
              className={`rounded border px-3 py-2 ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              이전
            </Link>
            <Link
              href={buildQuery('/contact', { ...baseParams, page: Math.min(totalPages, page + 1) })}
              className={`rounded border px-3 py-2 ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              다음
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}