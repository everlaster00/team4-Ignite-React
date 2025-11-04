'use server';
import { prismaJH as prisma } from '@/lib/prismaJH';
import { use } from 'react';

export async function createContact(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const title = formData.get('title');
  const content = formData.get('content');

  await prisma.Contact.create({
    data: { name, email, title, message: content, status: 'open' },
  });

  // 리디렉트/alert 없음 — 성공값만 반환
  return { ok: true };
}