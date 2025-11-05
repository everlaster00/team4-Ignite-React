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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">문의 상세</h1>
          <Link
            href="/contact"
            className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
          >
            목록으로
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="text-xl font-semibold">{item.title}</div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                item.status === '답변 대기중'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {item.status || '답변 대기중'}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            {item.name} · {item.email}
          </div>

          <div className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString()}
          </div>

          <div className="border-t pt-4 whitespace-pre-wrap">
            {item.message}
          </div>
        </div>
      </div>
    </div>
  );
}