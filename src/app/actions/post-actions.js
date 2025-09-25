'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// post-actions.js
export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || title.length < 3) {
    return {
      error: '제목은 최소 3자 이상 입력해주세요.',
      values: { title, content },
    };
  }

  if (!content || content.length < 10) {
    return {
      error: '내용은 최소 10자 이상 입력해주세요.',
      values: { title, content },
    };
  }

  try {
    // 실제로 DB에 저장하거나 API를 호출해야함.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      success: true,
      message: '게시글 작성에 성공했습니다!',
    };
  } catch (error) {
    console.error(error);
    return {
      error: '서버 오류가 발생했습니다. 다시 시도해주세요.',
      values: { title, content },
    };
  }
}

export async function createComment(prevState, formData) {
  const content = formData.get('content');

  if (!content || content.length < 1) {
    return { error: '댓글을 입력해주세요' };
  }

  // 댓글 저장 (예시)
  // await db.comment.create({
  //   postId,
  //   content,
  //   createdAt: new Date()
  // })

  const postId = '1';

  console.log('새 댓글:', { postId, content });

  // 현재 페이지 새로고침 (캐시 무효화)
  // revalidatePath(`/posts`);

  // 또는 다른 페이지로 이동
  redirect(`/post/${postId}`);
}

export async function deletePost() {
  // 게시글 삭제 (예시)
  // await db.post.delete({ where: { id } })

  const id = '1';
  console.log('게시글 삭제 :', id);

  // 목록 페이지로 이동
  redirect('/posts');
}
