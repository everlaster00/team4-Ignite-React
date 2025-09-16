import React from 'react';
import './PopularPromptsSection.css';
import PromptCard from './PromptCard'; // Reusing existing PromptCard

function PopularPromptsSection() {
  const popularPrompts = [
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=AI+Writing",
      altText: "AI 글쓰기 프롬프트",
      title: "전문가급 블로그 글쓰기",
      description: "SEO 최적화된 블로그 포스팅을 작성하는 프롬프트 템플릿",
      price: "₩15,000",
      sales: "1,234"
    },
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=Marketing",
      altText: "마케팅 프롬프트",
      title: "SNS 마케팅 콘텐츠",
      description: "인스타그램, 페이스북용 홍보 콘텐츠 생성 프롬프트",
      price: "₩12,000",
      sales: "987"
    },
    {
      imageUrl: "https://placehold.co/400x250/e2e8f0/64748b?text=Business",
      altText: "비즈니스 프롬프트",
      title: "비즈니스 이메일 작성",
      description: "프로페셔널한 비즈니스 이메일 작성 프롬프트",
      price: "₩9,900",
      sales: "756"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">인기 프롬프트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPrompts.map((prompt, index) => (
            <PromptCard
              key={index} // In a real app, use a unique ID from data
              imageUrl={prompt.imageUrl}
              altText={prompt.altText}
              title={prompt.title}
              description={prompt.description}
              price={prompt.price}
              // sales={prompt.sales} // PromptCard doesn't currently accept sales prop
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularPromptsSection;
