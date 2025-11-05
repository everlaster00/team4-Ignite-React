// src/app/contact/new/actions.js
'use server';
import { prismaJH as prisma } from '@/lib/prismaJH';

export async function createContact(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const title = formData.get('title');
  const message = formData.get('message');

  await prisma.Contact.create({
    data: { name, email, title, message },
  });

  // 리디렉트/alert 없음 — 성공값만 반환
  return { ok: true };
}