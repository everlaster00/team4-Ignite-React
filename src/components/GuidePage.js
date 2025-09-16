import React from 'react';
import './GuidePage.css';

function GuidePage() {
  return (
    <main className="flex-grow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">PromptHub 가이드</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <section className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">프롬프트 작성 가이드</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>명확하고 구체적인 지시사항 작성</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>목적과 맥락 정보 포함</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>예시와 제약사항 명시</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">판매자 가이드라인</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>프롬프트 품질 기준 준수</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>적절한 가격 책정 방법</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>고객 응대 및 피드백 관리</span>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">플랫폼 이용 방법</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>회원가입 및 인증 절차</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>프롬프트 검색과 구매</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>결제 및 환불 정책</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-white rounded-lg shadow-sm p-8 border border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">자주 묻는 질문</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">프롬프트 판매 수수료는 얼마인가요?</h3>
              <p className="text-slate-600">판매 금액의 10%가 기본 수수료이며, 판매자 등급에 따라 할인이 적용됩니다.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">프롬프트 품질 검수 기준은 무엇인가요?</h3>
              <p className="text-slate-600">모든 프롬프트는 실용성, 독창성, 완성도를 기준으로 전문 검수팀의 승인을 받아야 합니다.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">구매한 프롬프트는 어떻게 사용하나요?</h3>
              <p className="text-slate-600">구매 즉시 다운로드가 가능하며, 구매내역에서 언제든지 재다운로드할 수 있습니다.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default GuidePage;
