import React from 'react';
import './HomePageLayout.css';
import MarketSidebar from './MarketSidebar'; // Will create next
import PromptMarketSection from './PromptMarketSection'; // Will create next

function HomePageLayout() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-xl font-bold text-blue-600">PromptHub</a>
              <div className="hidden md:flex md:ml-8 space-x-8">
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">홈</a>
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">프롬프트 마켓</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">프롬프트 등록</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">커뮤니티</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium">가이드</a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="md:hidden text-slate-600 hover:text-slate-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <MarketSidebar /> {/* Placeholder for sidebar */}
            <PromptMarketSection /> {/* Placeholder for main content */}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">회사</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-600 hover:text-slate-900">소개</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">팀</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">채용</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">블로그</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">고객지원</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-600 hover:text-slate-900">FAQ</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">이용약관</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">개인정보처리방침</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">판매자</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-600 hover:text-slate-900">판매자 등록</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">판매자 가이드</a></li>
                <li><a href="#" className="text-slate-600 hover:text-slate-900">수수료 안내</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600">© 2024 PromptHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePageLayout;
