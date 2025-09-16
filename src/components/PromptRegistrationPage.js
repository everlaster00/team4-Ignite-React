import React from 'react';
import './PromptRegistrationPage.css';

function PromptRegistrationPage() {
  return (
    <main className="flex-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">프롬프트 등록</h1>

          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">프롬프트 제목</label>
              <input type="text" id="title" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="효과적인 제목을 입력하세요" />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700">카테고리</label>
              <select id="category" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>ChatGPT</option>
                <option>Midjourney</option>
                <option>DALL-E</option>
                <option>Stable Diffusion</option>
              </select>
            </div>

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-slate-700">프롬프트 내용</label>
              <textarea id="prompt" rows="6" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="프롬프트 전문을 입력하세요"></textarea>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">상세 설명</label>
              <textarea id="description" rows="4" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:focus:border-blue-500" placeholder="프롬프트의 사용 방법과 특징을 설명하세요"></textarea>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">판매 가격</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input type="text" id="price" className="w-full rounded-md border border-slate-300 pl-7 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 sm:text-sm">원</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button type="submit" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                등록하기
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                임시저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default PromptRegistrationPage;
