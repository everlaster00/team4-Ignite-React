import React from 'react';
import './PromptMarketSection.css';
import PromptCard from './PromptCard';

function PromptMarketSection() {
  // Sample data for prompt cards
  const prompts = [
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=Blog+Writer",
      altText: "블로그 작성 프롬프트",
      title: "전문 블로그 작성 프롬프트",
      description: "SEO 최적화된 블로그 포스트를 자동으로 생성하는 프롬프트",
      price: "₩15,000"
    },
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=Image+Creator",
      altText: "이미지 생성 프롬프트",
      title: "상업용 이미지 생성기",
      description: "마케팅에 최적화된 고품질 이미지 생성 프롬프트",
      price: "₩25,000"
    },
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=Code+Assistant",
      altText: "코드 작성 프롬프트",
      title: "React 컴포넌트 생성기",
      description: "최적화된 React 컴포넌트 자동 생성 프롬프트",
      price: "₩20,000"
    }
  ];

  return (
    <section className="flex-grow">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">프롬프트 마켓</h1>
          <div className="flex gap-4">
            <input type="search" placeholder="프롬프트 검색" className="w-full sm:w-64 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <select className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>최신순</option>
              <option>인기순</option>
              <option>가격순</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt, index) => (
          <PromptCard
            key={index} // In a real app, use a unique ID from data
            imageUrl={prompt.imageUrl}
            altText={prompt.altText}
            title={prompt.title}
            description={prompt.description}
            price={prompt.price}
          />
        ))}
      </div>
    </section>
  );
}

export default PromptMarketSection;
