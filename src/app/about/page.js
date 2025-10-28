// src/app/about/page.jsx
import EverlasterAvatar from '@/assets/images/EverlasterAvatar.webp'
import NotFoundLogic404Avartar from '@/assets/images/NotFoundLogic404Avartar.webp'
import lukeAvatar from '@/assets/images/lukeAvatar.webp'
import nicecocoAvarta from '@/assets/images/nicecocoAvarta.webp'
import ajeaAvatar from '@/assets/images/ajeaAvatar.webp'

import TeamCard from './TeamCard';
import IgniteFont from '@@/IgniteFont';
import SidebarOfMemberNav from '@@/SidebarOfMemberNav';

const teamMembers = [
  {
    avatarUrl: EverlasterAvatar.src,
    name: 'Everlaster',
    role: '💡팀장',
    bio: 'Ignite 팀의 비전을 제시하고 모두의 열정에 불을 붙이는 시작점입니다.',
  },
  {
    avatarUrl: nicecocoAvarta.src,
    name: 'nicecoco',
    role: '✨ 픽셀의 연금술사',
    bio: '디자이너의 의도를 완벽하게 이해하고, 정적인 이미지를 생동감 있는 코드로 변환합니다.',
  },
  {
    avatarUrl: lukeAvatar.src,
    name: 'luke',
    role: '💎 에러 보석 수집가',
    bio: '코딩 속에 숨어있는 작은 실수와 버그를 놓치지 않고 수집하여 코드를 단단하게 만듭니다.',
  },
  {
    avatarUrl: NotFoundLogic404Avartar.src,
    name: 'LogicNotFound404',
    role: '🗺️ 미로 찾기 탐험가',
    bio: '복잡하게 얽힌 로직의 실타래를 푸는 것을 즐기며, 불가능해 보이는 문제도 해결합니다.',
  },
  {
    avatarUrl: ajeaAvatar.src,
    name: 'ajea',
    role: '⚡️ 0.1초의 마법사',
    bio: '서비스의 로딩 속도와 응답 시간을 단 0.1초라도 줄이기 위해 밤낮없이 최적화를 시도합니다.',
  },
];


// 메타데이터는 서버에서 정의
export async function generateMetadata() {
  return {
    title: `팀 4 Ignite 소개`,
    description: '쇼케이스 프로젝트 팀원들을 소개합니다.',
  };
}


export default function TeamPage() {

  return (
    <div className="AboutBody flex flex-row justify-center bg-gray-50">
      <SidebarOfMemberNav />
      <div className="AboutContentBox flex flex-col max-w-14/15 mx-auto py-10 md:14 px-4 sm:px-6 lg:px-8">

        
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
          {teamMembers.map((member) => (
            <TeamCard 
              key={member.name}
              avatarUrl={member.avatarUrl}
              name={member.name}
              role={member.role}
              bio={member.bio}
            />
          ))}
        </div>
      </div>
    </div>
  );
}