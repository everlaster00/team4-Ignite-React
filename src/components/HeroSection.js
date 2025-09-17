import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">AI 프롬프트로 작업 효율을 높이세요</h1>
        <p className="text-xl text-blue-100 mb-8">검증된 프롬프트로 더 나은 결과물을 만들어보세요</p>
        <a href="#" className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-50">
          프롬프트 둘러보기
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
