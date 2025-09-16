import React from 'react';
import './MarketSidebar.css';

function MarketSidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">카테고리</h2>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600 font-medium">전체 (2,458)</a></li>
          <li><a href="#" className="text-slate-600 hover:text-slate-900">텍스트 생성 (864)</a></li>
          <li><a href="#" className="text-slate-600 hover:text-slate-900">이미지 생성 (623)</a></li>
          <li><a href="#" className="text-slate-600 hover:text-slate-900">코드 작성 (445)</a></li>
          <li><a href="#" className="text-slate-600 hover:text-slate-900">번역 (289)</a></li>
          <li><a href="#" className="text-slate-600 hover:text-slate-900">분석 (237)</a></li>
        </ul>
      </div>
    </aside>
  );
}

export default MarketSidebar;
