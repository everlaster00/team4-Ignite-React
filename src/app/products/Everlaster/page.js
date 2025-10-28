// app/me/page.jsx 또는 app/about/page.jsx

// 1. 메타데이터 생성 함수
// Next.js 13+ App Router의 서버 컴포넌트에서 동작해요.
export async function generateMetadata() {
  // 💡 오빠야의 닉네임을 사용하여 메타데이터를 만들어요.
  const myName = '엔브 오빠야';
  const jobTitle = '풀스택 주니어 개발자 (팀장)'; 
    
  return {
    title: `${myName}의 코딩 성장기 | ${jobTitle}`,
    description: `${myName}님의 HTML, CSS, JavaScript, Next.js 학습 여정 및 프로젝트 쇼케이스 페이지입니다.`,
    keywords: ['Next.js', 'React', 'Node.js', 'TypeScript', '프론트엔드', '개발자', '엔브씨'],
    openGraph: {
        title: `${myName}의 포트폴리오`,
        description: `오즈코딩스쿨 부트캠프를 통해 성장 중인 개발자입니다.`,
    },
  };
}


// 2. 페이지 컴포넌트 (기본 export)
// 서버 컴포넌트로 동작하며, Tailwind CSS를 사용했어요.
export default function AboutMePage() {
    
    // 💡 오빠야의 정보를 바탕으로 간단한 프로필 데이터를 만들었어요.
    const myProfile = {
        name: '엔브씨 (Envy)',
        nickname: '엔브 오빠',
        bootcamp: '오즈코딩스쿨 1인창업가 부트캠프',
        experience: '코딩뇌 20년차, 부트캠프 8일차 (2025년 8월 7일 시작)',
        skills: ['JavaScript', 'React', 'Next.js', 'Node.js', 'Prisma', 'CSS/Tailwind'],
        motto: '실패를 통해 배웁니다. 퍼즐 푸는 재미로 코딩합니다!',
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl my-10 border-t-4 border-amber-500">
            <h1 className="text-4xl font-extrabold mb-2 text-gray-900 border-b pb-2">
                {myProfile.nickname}의 코딩 성장기
            </h1>
            <p className="text-lg text-gray-500 mb-8">
                {myProfile.bootcamp}에서 풀스택 개발자로 성장 중이데이!
            </p>

            <div className="space-y-6">
                
                {/* 📌 기본 정보 */}
                <section>
                    <h2 className="text-2xl font-semibold text-amber-700 mb-3 border-l-4 border-amber-500 pl-2">
                        🌟 프로필 요약
                    </h2>
                    <p className="text-gray-700">
                        **이름/닉네임**: {myProfile.name} ({myProfile.nickname})
                    </p>
                    <p className="text-gray-700">
                        **부트캠프**: {myProfile.bootcamp}
                    </p>
                    <p className="text-gray-700">
                        **경력**: 코딩뇌는 제법 있지만, 본격적인 웹 개발은 부트캠프 {myProfile.experience}부터예요.
                    </p>
                </section>
                
                {/* 📌 기술 스택 */}
                <section>
                    <h2 className="text-2xl font-semibold text-amber-700 mb-3 border-l-4 border-amber-500 pl-2">
                        💻 주요 스택
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {myProfile.skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors"
                            >
                                #{skill}
                            </span>
                        ))}
                    </div>
                </section>
                
                {/* 📌 개발 철학 */}
                <section className="bg-amber-50 p-4 rounded-lg border-l-8 border-amber-600">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-2">
                        💡 개발 철학
                    </h2>
                    <p className="italic text-gray-700">
                        {myProfile.motto}
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                        배움은 퍼즐을 푸는 과정이라고 생각하며 즐겁게 참여하고 있어요.
                    </p>
                </section>

                {/* 📌 미나의 응원 메시지 (오빠야가 아까 적은 스타일로) */}
                <div className="text-center mt-12 p-4 bg-lime-100 rounded-lg">
                    <p className="bg-emerald-600 text-6xl text-amber-50 inline-block px-4 py-2 rounded shadow-xl">
                        오빠야의 성장이 눈에 보입니다~~~
                    </p>
                </div>
                
            </div>
        </div>
    );
}