"use client";

import IgniteFont from "@@/IgniteFont";
import FireForm from "./FireForm";

export default function WritePage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔥<IgniteFont> 점화하기</IgniteFont></h1>
      <FireForm />
    </div>
  );
}
