'use client';

import { createPost } from '@/app/actions/post-actions';
import { SubmitButton } from '@/components/SubmitButton';
import { useActionState } from 'react';

export default function CreatePostPage() {
  const [state, formAction, isPending] = useActionState(createPost, {});

  // formAction = createPost 서버 액션
  // state = 서버 액션에서 내려오는 데이터

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">새 게시글 작성</h1>

      {state.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4 max-w-2xl">
        <div>
          <label className="block mb-2 font-semibold">제목</label>
          <input
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className="w-full px-3 py-2 border rounded"
            placeholder="제목을 입력해주세요 (최소 3자)"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">내용</label>
          <textarea
            name="content"
            rows="6"
            defaultValue={state.values?.content}
            className="w-full px-3 py-2 border rounded"
            placeholder="내용을 입력해주세요 (최소 10자)"
          />

          <SubmitButton isPending={isPending}>작성하기</SubmitButton>
        </div>
      </form>
    </div>
  );
}
