import React from 'react';
import './MyPage.css';

function MyPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <img src="https://placehold.co/120x120/e2e8f0/64748b?text=Profile" alt="프로필 이미지" className="rounded-full mb-4" />
              <h2 className="text-lg font-semibold">홍길동</h2>
              <p className="text-slate-600">prompt_master</p>
              <button className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm font-medium">
                프로필 수정
              </button>
            </div>
          </div>
        </aside>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">수익 현황</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">총 수익</p>
                <p className="text-2xl font-bold">₩1,234,000</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">이번 달 수익</p>
                <p className="text-2xl font-bold">₩234,000</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600">판매 프롬프트</p>
                <p className="text-2xl font-bold">32개</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">판매 내역</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">프롬프트명</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">판매일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">금액</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">AI 이미지 생성 마스터</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">2024-02-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₩25,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">완료</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">블로그 글쓰기 프롬프트</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">2024-02-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₩15,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">완료</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">구매 내역</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">프롬프트명</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">구매일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">금액</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">상태</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">SEO 최적화 프롬프트</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">2024-02-13</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₩30,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">사용 가능</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyPage;
