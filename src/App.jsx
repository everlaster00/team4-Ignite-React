import React, { useState } from 'react';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const tabs = ['초급', '중급', '고급'];

  return (
    <div className="antialiased hero-bg">
      {/* Navigation Bar */}
      <header className="w-full py-4 px-6 md:px-12 fixed top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-400">프롬프트 마켓</h1>
            <nav>
                <ul className="flex space-x-4 md:space-x-8 text-gray-400 text-sm md:text-base">
                    <li><a href="#" className="hover:text-blue-300 transition-colors">chatgpt</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">gemini</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">grok 3</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">커뮤니티</a></li>
                    <li><a href="#" className="hover:text-blue-300 transition-colors">고객센터</a></li>
                </ul>
            </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white glitch-text">프롬프트 마켓</h2>
            <p className="text-lg text-gray-400 mb-12 text-center">
                당신이 찾는 모든 창의적인 아이디어가 여기에 있습니다.
            </p>

            {/* Search and Filter Section with new card */}
            <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
                <input type="text" placeholder="프롬프트 검색..." className="w-full md:w-1/4 bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                <select className="w-full md:w-1/6 bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                    <option>전체 카테고리</option>
                    <option>이미지 생성</option>
                    <option>텍스트 생성</option>
                    <option>코드 작성</option>
                    <option>음악 작곡</option>
                </select>
                <select className="w-full md:w-1/6 bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                    <option>인기순</option>
                    <option>가격순</option>
                </select>
                
                <div className="w-full md:w-1/2 bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 p-4 text-center">
                    <h4 className="text-white text-lg font-bold mb-1">프롬프트 마켓에 오신 것을 환영합니다!</h4>
                    <p className="text-gray-400 text-sm">
                        AI에게 생명을 불어넣는 최고의 프롬프트를 만나보세요.
                    </p>
                </div>
            </div>

            {/* Static Card Grid Section */}
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-6">인기 프롬프트</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div className="bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">실사 같은 풍경화 프롬프트</h3>
                            <p className="text-gray-400 text-sm">자연의 아름다움을 사실적으로 묘사하는 AI 이미지를 생성합니다.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-blue-400 font-semibold text-lg">₩ 5,000</span>
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                    <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">마케팅 문구 생성 프롬프트</h3>
                            <p className="text-gray-400 text-sm">소비자의 마음을 사로잡는 강력한 카피를 순식간에 만듭니다.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-blue-400 font-semibold text-lg">₩ 8,000</span>
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                    <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">블로그 글 작성 프롬프트</h3>
                            <p className="text-gray-400 text-sm">특정 키워드를 활용한 SEO 최적화 블로그 글을 생성합니다.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-blue-400 font-semibold text-lg">₩ 6,500</span>
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                    <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">3D 로봇 모델링 프롬프트</h3>
                            <p className="text-gray-400 text-sm">복잡한 3D 모델링 작업을 자연어 명령으로 자동화합니다.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-blue-400 font-semibold text-lg">₩ 15,000</span>
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                    <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel with Difficulty Tabs */}
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-6">모든 프롬프트 탐색하기</h3>
                
                <div className="flex space-x-4 mb-8">
                    {tabs.map((tab, index) => (
                        <button 
                            key={tab} 
                            onClick={() => handleTabClick(index)}
                            className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            
                <div className="relative overflow-hidden w-full">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out" 
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        
                        <div className="w-full flex-shrink-0 flex overflow-x-auto gap-8 pb-4 hide-scrollbar snap-x snap-mandatory">
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">간단한 텍스트 생성</h3>
                                    <p className="text-gray-400 text-sm">짧은 문장이나 아이디어를 빠르게 생성합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 1,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">기본 질문 답변</h3>
                                    <p className="text-gray-400 text-sm">특정 주제에 대한 간단한 질문에 답합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 2,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">간단한 코딩 예제</h3>
                                    <p className="text-gray-400 text-sm">"Hello, World!"와 같은 기본 코드를 생성합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 3,500</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex-shrink-0 flex overflow-x-auto gap-8 pb-4 hide-scrollbar snap-x snap-mandatory">
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">마케팅 문구 생성</h3>
                                    <p className="text-gray-400 text-sm">소비자의 마음을 사로잡는 강력한 카피를 만듭니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 8,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">블로그 글 작성</h3>
                                    <p className="text-gray-400 text-sm">특정 키워드를 활용한 SEO 최적화 글을 생성합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 6,500</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">유튜브 쇼츠 대본 자동 생성</h3>
                                    <p className="text-gray-400 text-sm">바이럴이 될 만한 유튜브 쇼츠 대본을 빠르게 생성합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 7,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex-shrink-0 flex overflow-x-auto gap-8 pb-4 hide-scrollbar snap-x snap-mandatory">
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">사업 계획서 초안 작성</h3>
                                    <p className="text-gray-400 text-sm">핵심 아이디어만 입력하면 전문적인 사업 계획서 초안을 완성합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 20,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">파이썬 데이터 분석 코드</h3>
                                    <p className="text-gray-400 text-sm">원하는 분석 조건을 자연어로 입력하여 코드를 얻습니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 18,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-80 snap-center bg-[#101520] rounded-2xl shadow-xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:scale-[1.02]">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">심층 심리 분석용 프롬프트</h3>
                                    <p className="text-gray-400 text-sm">개인의 행동 패턴과 심리 상태를 깊이 있게 분석합니다.</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-blue-400 font-semibold text-lg">₩ 25,000</span>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-700 text-gray-200 text-sm py-2 px-4 rounded-full hover:bg-gray-600 transition-colors">상세보기</button>
                                            <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-500 transition-colors">구매하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
