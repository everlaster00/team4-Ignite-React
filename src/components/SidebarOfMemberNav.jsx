// src/components/SidebarOfMemberNav.jsx
// 이 파일은 좌측 가이드라인 역할을 하는 컴포넌트입니다.
// 사용법: 테일윈드 클래스 속성 flex flex-row 가 있는 부모 태그 바로 밑에 이 컴포넌트를 넣습니다. 오른쪽 영역이 되는 형제 태그도 flex 속성을 줘야합니다.
// 사용처: app/about/page.js
import EverlasterAvatar from '@/assets/images/EverlasterAvatar.webp'
import Image from 'next/image';

export default function SidebarOfMemberNav() {
  return (
    <aside className="SideNav sticky left-0 top-0 flex flex-col bg-teal-300/80 w-28 md:w-32 lg:w-38 h-screen px-2 lg:px-5 space-y-2">
      <div className='SideNavTitle flex flex-col items-center justify-center py-5 md:py-8 px-2'>
        <h3 className='SideNavTitleText text-amber-600/90 text-shadow-md font-bold text-sm md:text-base lg:text-xl mb-1'>
          Members
        </h3>
        <div className='TitleTextEffecter shadow-sm shadow-red-400/80 bg-amber-200/80 w-[85%] h-1 rounded-md'> </div>
      </div>
      <div className='SideNavItemsBox flex flex-col items-center justify-around'>
        <Image src={EverlasterAvatar} alt='Everlaster tag' className='size-auto rounded-full border-3 border-amber-300/30 border-b-orange-400/70 shadow-[0_0_30px_rgba(0,0,0,0.7)] '/>
      </div>
    </aside>
  );
}