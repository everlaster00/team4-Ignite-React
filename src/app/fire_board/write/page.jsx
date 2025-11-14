//src/app/fire_board/write/page.jsx
"use client";

import IgniteFont from "@@/IgniteFont";
import FireForm from "./FireForm";

export default function WritePage() {
  return (
    <div className="max-w-8xl mx-auto p-6 min-h-full">
      <h1 className="text-3xl font-bold mb-6 flex">🔥<IgniteFont> 점화하기</IgniteFont></h1>
      <FireForm />
    </div>
  );
}
