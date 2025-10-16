'use server';

import { prisma } from '@/lib/prisma'; 

// ----------------------------------------------------
// 1. Post 생성 함수
// ----------------------------------------------------
export async function createPost() {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: `새 포스트 ${new Date().toLocaleTimeString('ko-KR')}`,
      },
    });
    console.log('Post 생성 성공:', newPost.id);
    return { success: true, message: '생성 성공!' };
  } catch (error) {
    console.error('Post 생성 오류:', error);
    return { success: false, message: '생성 실패!' };
  }
}

// ----------------------------------------------------
// 2. Post 삭제 함수 (최신 포스트 1개)
// ----------------------------------------------------
export async function deleteLatestPost() {
  try {
    const latestPost = await prisma.post.findFirst({
      orderBy: {
        id: 'desc', // 가장 최근 것
      },
    });

    if (latestPost) {
      const deletedPost = await prisma.post.delete({
        where: { id: latestPost.id },
      });
      console.log('Post 삭제 성공:', deletedPost.id);
      return { success: true, message: '삭제 성공!' };
    } else {
      return { success: false, message: '삭제할 포스트가 없데이!' };
    }
  } catch (error) {
    console.error('Post 삭제 오류:', error);
    return { success: false, message: '삭제 실패!' };
  }
}

// ----------------------------------------------------
// 3. Post 목록 조회 함수
// ----------------------------------------------------
export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return posts;
}
// AI가 제공한 코드 끝