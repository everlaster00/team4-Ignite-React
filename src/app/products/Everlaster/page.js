// app/products/Everlaster

// 1. 메타데이터 생성 함수
// Next.js 13+ App Router의 서버 컴포넌트에서 동작해요.
export async function generateMetadata() {
  // 💡 닉네임을 사용하여 메타데이터를 만들어요.
  const myName = "Everlaster";
  const jobTitle = "풀스택 주니어 개발자 (팀장)";

  return {
    title: `${myName}의 코딩 갤러리 | ${jobTitle}`,
    description: `${myName}님의 HTML, CSS, JavaScript, Next.js 학습 여정 및 프로젝트 쇼케이스 페이지입니다.`,
    keywords: ["쇼케이스", "Everlaster"],
    openGraph: {
      title: `${myName}의 코딩 갤러리`,
      description: `오즈코딩스쿨 부트캠프를 통해 성장 중인 개발자입니다.`,
    },
  };
}

// 2. 페이지 컴포넌트 (기본 export)
// 서버 컴포넌트로 동작하며, Tailwind CSS를 사용했어요.
export default function EverlasterShowCaseHome() {
  return (
  <div className="TitleBox border-1 m-2">
    <h1 className="ProjectTitle"> 계산기 </h1>

  </div>
  )
}
