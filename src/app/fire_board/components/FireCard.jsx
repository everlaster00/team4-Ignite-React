"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

export default function FireCard({ post }) {
  const created = post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "";
  return (
    <Link href={`/fireboard/${post.id}`}>
      <div className="p-5 bg-white/80 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 transition cursor-pointer">
        <h2 className="text-xl font-semibold mb-1 text-gray-900">{post.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>{created}</span>
          <span className="flex items-center gap-1 text-amber-500">
            <Flame size={16} /> {post.flameCount ?? 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
