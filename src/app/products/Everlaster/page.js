// app/products/Everlaster

import IgniteFont from "root/src/components/IgniteFont";
import MyCalculator from "./MySrc/MyCalculator";
import CornerFloatingNav from "@@/members/CornerFloatingNav";

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
    <div className="flex flex-col font-mono items-center mt-3 mx-10 ">
      <CornerFloatingNav index={0} />
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8"> 

        {/* --- 1. 타이틀 & Ignite 그룹 (왼쪽/상단) --- */}
        {/* 이 div로 Ignite와 TitleBox를 세로로 묶고, 이 묶음 자체를 중앙 정렬한다 안카나. */}
        <div className="flex flex-col items-center w-full"> 
            
            {/* Ignite 글자: 중앙에 위치하고 타이틀 박스와 묶인다! */}
            <p className="m-1 md:m-3 text-base md:text-xl xl:text-2xl">
              <IgniteFont>Ignite</IgniteFont>
              🔥
            </p>
            
            
            {/* TitleBox: max-w-xl로 너비를 제한하고 mx-auto로 중앙 정렬한다 안카나. */}
            <div className="TitleBox border-2 border-amber-500 rounded-xl p-3 md:p-6 max-w-xl w-full text-center shadow-lg mb-8 bg-amber-50">
              {/* h1 내부 내용 생략 */}
              <h1 className="ProjectTitle font-ychoi font-bold text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl leading-tight">
                이
                <span className="text-red-600 text-7xl sm:text-8xl md:text-9xl lg:text-8xl xl:text-9xl italic transform -rotate-6 inline-block mr-4">
                  거
                </span>{" "}
                나이
                <span className="text-blue-600 text-7xl sm:text-8xl md:text-9xl lg:text-8xl xl:text-9xl italic transform rotate-6 inline-block mr-4">
                  뜨
                </span>{" "}
                <span className="block text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-normal opacity-70">
                  한
                </span>{" "}
                <span className="block">계산기</span>
              </h1>
              <p className="font-overwatch text-gray-500 mt-4 text-md md:text-lg">
                {" "}
                Everlaster&#x27;s Show Case Item!{" "}
              </p>
            </div>
        </div>

        {/* --- 2. 계산기 영역 (오른쪽/하단) --- */}
        <article className="w-full m-2">
          {/* 계산기 컴포넌트는 항상 이 영역 중앙에 위치하도록 Flex를 적용한다 안카나. */}
          <div className="flex justify-center items-center w-full h-full">
            {/* <Calculator /> */}
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300 w-full text-center">
              <MyCalculator />
            </div>
          </div>
        </article>
      </div>
      {/* Grid 컨테이너 종료 */}
    </div>
  );
}