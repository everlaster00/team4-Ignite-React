import React, { useState } from 'react'; // Import useState for mobile menu
import './HomePageLayout.css';
import HeroSection from './HeroSection';
import PopularPromptsSection from './PopularPromptsSection';
import LatestPromptsSection from './LatestPromptsSection';

function HomePageLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center"> {/* Added items-center */}
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold text-blue-600">PromptHub</a>
              <div className="hidden md:flex md:ml-10 space-x-8">
                <a href="#" className="text-blue-600 font-medium">홈</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">프롬프트 마켓</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">판매하기</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">커뮤니티</a>
                <a href="#" className="text-slate-600 hover:text-slate-900">고객센터</a>
              </div>
            </div>
            <button id="mobile-menu-button" className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none" onClick={toggleMobileMenu}> {/* Added onClick */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* 모바일 메뉴 (자바스크립트로 토글) */}
          <div id="mobile-menu" className={`mobile-menu md:hidden absolute w-full left-0 bg-white shadow-lg border-t border-slate-200 ${isMobileMenuOpen ? 'active' : ''}`}> {/* Added dynamic class */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-slate-100">홈</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100">프롬프트 마켓</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100">판매하기</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100">커뮤니티</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100">고객센터</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <PopularPromptsSection />
        <LatestPromptsSection />
      </main>

      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">PromptHub</h3>
              <p className="text-sm">AI 프롬프트 마켓플레이스</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">이용가이드</a></li>
                <li><a href="#" className="hover:text-white">프롬프트 등록</a></li>
                <li><a href="#" className="hover:text-white">판매자 가이드</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">회사</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">소개</a></li>
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">문의하기</a></li>
                <li><a href="#" className="hover:text-white">공지사항</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
            © 2024 PromptHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePageLayout;