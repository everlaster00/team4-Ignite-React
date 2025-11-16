// FireCardHeader.jsx (목록 최상단에 사용할 레이아웃 가이드)

import React from 'react';

export default function FireCardHeader() {
  return (
    <div className="w-full flex flex-none flex-col lg:flex-row justify-between items-center p-3 text-sm lg:text-base text-gray-500 font-semibold border-b-2 border-amber-500/30 bg-igniteOrange-50/70 rounded-t-xl">

      <div className="PostInfo flex flex-row w-full truncate items-center mb-1 lg:mb-0">
        <span className="inline-block w-[10%] pr-2 text-center">글번호</span>
        <span className="inline-block w-[20%] pr-2 text-start">분류</span>
        <span className="inline-block w-[60%] truncate text-start">제목</span>
        <span className="inline-block w-[5%] text-center pr-1">댓글</span>
      </div>

      <div className="PostMetas w-full pl-1 lg:w-[45%] flex flex-row gap-2 text-sm text-gray-500 justify-end items-center">
      
        <div className="AuthonInfo w-[50%] flex flex-row gap-1 items-start">
          <span className="inline-block truncate text-center">작성자</span>
        </div>

        <span className="Ceate inline-block w-[30%] text-end">작성일</span>

        <span className="Views inline-block w-[10%] pr-1 text-end">조회</span>

        <span className="Flames inline-block pr-1 w-[10%] text-end">불꽃</span>

      </div>
    </div>
  );
}