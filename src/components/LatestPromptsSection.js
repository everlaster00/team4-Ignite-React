import React from 'react';
import './LatestPromptsSection.css';

function LatestPromptsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">최신 프롬프트</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">코딩 튜터 프롬프트</h3>
            <p className="text-sm text-slate-600">₩8,900</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">일러스트 생성</h3>
            <p className="text-sm text-slate-600">₩11,000</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">영어 교정</h3>
            <p className="text-sm text-slate-600">₩7,500</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">레시피 생성</h3>
            <p className="text-sm text-slate-600">₩6,900</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestPromptsSection;
