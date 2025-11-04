'use server';

import { prismaJH as prisma } from '@/lib/prismaJH';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createContact(formData) {
  const title = formData.get('title')?.toString().trim();
  const content = formData.get('content')?.toString().trim();
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();

  if (!title || !content || !name || !email) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  await prisma.contact.create({
    data: { title, content, name, email },
  });

  // 목록 캐시 무효화 → 즉시 최신목록
  revalidatePath('/contact');
  // 작성 후 목록으로
  redirect('/contact');
}

export async function updateStatus(formData) {
  const id = Number(formData.get('id'));
  const status = formData.get('status')?.toString();

  if (!id || !status) throw new Error('잘못된 요청입니다.');

  await prisma.contact.update({
    where: { id },
    data: { status },
  });

  // 현재 페이지 새로고침 효과
  revalidatePath('/contact');
}