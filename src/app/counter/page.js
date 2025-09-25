'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">클라이언트 컴포넌트 (카운터)</h1>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">카운터</h2>
        <p className="text-2xl mb-4">현재 카운터 : {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          증가
        </button>
      </div>
    </div>
  );
}
