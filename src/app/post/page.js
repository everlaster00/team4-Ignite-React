'use client';

import { SubmitButton } from '@/components/SubmitButton';
import { useActionState } from 'react';
import { createComment } from '../actions/post-actions';

export default function PostPage() {
  const [state, formAction, isPending] = useActionState(createComment, {});

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">댓글 작성</h1>

      <form action={formAction} className="space-y-4 max-w-2xl">
        <div>
          <label className="block mb-2 font-semibold">내용</label>
          <textarea
            name="content"
            rows="6"
            className="w-full px-3 py-2 border rounded"
            placeholder="내용을 입력해주세요 (최소 10자)"
          />

          <SubmitButton isPending={isPending}>작성하기</SubmitButton>
        </div>
      </form>
    </div>
  );
}
