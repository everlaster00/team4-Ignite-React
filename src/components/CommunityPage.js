import React from 'react';
import './CommunityPage.css';

function CommunityPage() {
  return (
    <main className="flex-grow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">커뮤니티</h1>
          <div className="flex justify-between items-center">
            <p className="text-slate-600">프롬프트 활용 팁과 경험을 공유하는 공간입니다.</p>
            <a href="#" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">글쓰기</a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="p-4 border-b border-slate-200">
            <div className="flex gap-4">
              <select className="border border-slate-300 rounded-md px-3 py-2 text-sm">
                <option>전체</option>
                <option>팁 공유</option>
                <option>성공 사례</option>
                <option>질문</option>
              </select>
              <input type="search" placeholder="검색어를 입력하세요" className="flex-grow border border-slate-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            <article className="p-6 hover:bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-medium text-slate-900">
                  <a href="#" className="hover:text-blue-600">[팁 공유] GPT-4를 활용한 효과적인 프롬프트 작성법</a>
                </h2>
                <span className="text-sm text-slate-500">1시간 전</span>
              </div>
              <p className="text-slate-600 mb-4">GPT-4에서 더 나은 결과를 얻기 위한 프롬프트 작성 팁을 공유합니다. 실제 사용 사례와 함께 설명드립니다.</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>작성자: 프롬프트마스터</span>
                <span>조회 238</span>
                <span>댓글 12</span>
                <span>좋아요 45</span>
              </div>
            </article>

            <article className="p-6 hover:bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-medium text-slate-900">
                  <a href="#" className="hover:text-blue-600">[성공 사례] 마케팅 카피 프롬프트로 매출 300% 증가</a>
                </h2>
                <span className="text-sm text-slate-500">3시간 전</span>
              </div>
              <p className="text-slate-600 mb-4">PromptHub에서 구매한 마케팅 프롬프트로 실제 성과를 낸 사례를 공유합니다.</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>작성자: 디지털마케터</span>
                <span>조회 156</span>
                <span>댓글 8</span>
                <span>좋아요 32</span>
              </div>
            </article>

            <article className="p-6 hover:bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-medium text-slate-900">
                  <a href="#" className="hover:text-blue-600">[질문] 이미지 생성 프롬프트 최적화 방법</a>
                </h2>
                <span className="text-sm text-slate-500">5시간 전</span>
              </div>
              <p className="text-slate-600 mb-4">Midjourney와 DALL-E에서 더 나은 결과물을 얻기 위한 프롬프트 작성 방법을 알고 싶습니다.</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>작성자: AI아티스트</span>
                <span>조회 92</span>
                <span>댓글 4</span>
                <span>좋아요 15</span>
              </div>
            </article>
          </div>

          <div className="p-4 border-t border-slate-200">
            <div className="flex justify-center gap-2">
              <a href="#" className="px-3 py-1 rounded-md text-sm text-slate-600 hover:bg-slate-100">이전</a>
              <a href="#" className="px-3 py-1 rounded-md text-sm text-white bg-blue-600">1</a>
              <a href="#" className="px-3 py-1 rounded-md text-sm text-slate-600 hover:bg-slate-100">2</a>
              <a href="#" className="px-3 py-1 rounded-md text-sm text-slate-600 hover:bg-slate-100">3</a>
              <a href="#" className="px-3 py-1 rounded-md text-sm text-slate-600 hover:bg-slate-100">다음</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CommunityPage;
