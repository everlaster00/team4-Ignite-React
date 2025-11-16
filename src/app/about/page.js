// src/app/about/page.jsx
import TeamCard from './TeamCard';
import IgniteFont from '@@/IgniteFont';
import SidebarOfMemberNav from '@@/members/SidebarOfMemberNav';
import MEMBER from '@@/members/memberInfo';
import aboutBG from "@/assets/images/aboutBG.webp";

// 메타데이터는 서버에서 정의
export async function generateMetadata() {
  return {
    title: `팀 4 Ignite 소개`,
    description: '쇼케이스 프로젝트 팀원들을 소개합니다.',
  };
}

export default function TeamPage() {

  const backgroundImage = `url(${aboutBG.src})`;

  const backgroundStyle = {
    backgroundImage: backgroundImage,
    backgroundSize: "100% 100%",
    backgroundPosition: "top center",
  };

  return (
    <div className="AboutBody flex flex-row relative justify-center bg-gray-900 h-screen" >
      <SidebarOfMemberNav />
      <div style={backgroundStyle} className={`AboutContentBox flex flex-col w-full max-w-14/15 mx-auto py-10 md:14 px-4 sm:px-6 lg:px-8 flex-1 overflow-y-auto bg-local SCROLLHIDDEN overscroll-y-auto`} >

        
        {/* 📌 페이지 제목 */}
        <header className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 p-4 mb-3 md:mb-8">
            Team 4: <IgniteFont>Ignite</IgniteFont> 🔥
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
            우리는 각자의 아이디어에 불꽃을 튀겨, 🔥 폭발적인 창작물을 세상에 <IgniteFont>점화 (Ignite)</IgniteFont>시키는 개발자들입니다.
          </p>
        </header>

        {/* 📌 카드 리스트 (세로 스크롤 방식) */}
        <div className="grid grid-cols-1 gap-12 ">
          {MEMBER.map((member) => (
            <TeamCard 
              key={member.id}
              id={member.id}
              avatarUrl={member.iconUrl}
              name={member.nickName}
              role={member.role}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </div>
  );
}