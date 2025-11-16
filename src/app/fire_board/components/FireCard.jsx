"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { formatTimeAgo } from "@/utlls/timeUtils";
import { getCategoryDisplay } from "./categoryParse";

export default function FireCard({ post }) {
  const categoryInfo = getCategoryDisplay(post.category);
  const created = post?.createdAt ? formatTimeAgo(post.createdAt) : "알 수 없음";
  const flameLevel = ( count ) => {
    if (count >= 10 ) {
      return "text-rose-600 font-bold";;
    } else if (count >= 5) {
      return "text-igniteOrange-500 font-semibold";
    } else {
      return "text-gray-500";
    }
  }
  return (
    <Link href={`/fire_board/${post.id}`} className="block">
      <div className="w-full flex flex-none flex-col lg:flex-row justify-between items-center p-3 bg-white/70 rounded-xl shadow-md hover:shadow-lg border border-amber-600/30 transition cursor-pointer">

        <div className="PostInfo flex flex-row w-full truncate items-center font-bold mb-1 text-gray-800">
          <span className="inline-block w-[10%] pr-2 text-center text-sm lg:text-base" title={post.id}>{post.id}</span>
          <span className="inline-block w-[20%] pr-2 text-start text-sm font-semibold text-blue-600/80">{categoryInfo.label}</span>
          <span className="inline-block w-[60%] truncate text-start text-base lg:text-lg" title={post.title}>{post.title}</span>
          <span className="inline-block w-[5%] text-center text-sm pr-1">&#40;{post.commentCount}&#41;</span>
        </div>

        <div className="PostMetas w-full pl-1 lg:w-[45%] flex flex-row gap-2 text-sm text-gray-500 justify-end items-center">
        
          <div className="AuthonInfo w-[50%] flex flex-row gap-1 items-start font-semibold" title={post.anonym}>
            <span className="inline-block truncate w-[2/3] text-sm lg:text-base text-start">{post.anonym}</span>
            <span className="inline-block w-[1/3] text-sm text-end">&#40;{post.clientIp}&#41;</span>
          </div>

          <span className="Ceate inline-block w-[30%] text-end" title={new Date(post.createdAt).toLocaleString()}>{created}</span>

          <span className="Views inline-block w-[15%] pr-1 text-end">{post.views?? 0}</span>

          <span className={`Flames inline-block pr-1 w-[5%] text-end ${flameLevel(post.likeCount)}`}>{post.likeCount?? 0}</span>

        </div>
      </div>
    </Link>
  );
}
