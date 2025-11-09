// src/components/SidebarOfMemberNav.jsx
// 이 파일은 좌측 가이드라인 역할을 하는 컴포넌트입니다.
// 사용법: 테일윈드 클래스 속성 flex flex-row relative 가 있는 부모 태그 바로 밑에 이 컴포넌트를 넣습니다. 
//    오른쪽 영역이 되는 형제 태그도 flex 속성을 줘야합니다.
// 사용처: app/about/page.js

'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; 
import { FiMenu, FiX } from 'react-icons/fi'; 
import MEMBER from './memberInfo'; 

const handleLinkClick = (closeMenu) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
        closeMenu();
    }
};

export default function SidebarOfMemberNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const HAMBURGER_TOP_OFFSET = 'top-24'; 

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`sm:hidden fixed ${HAMBURGER_TOP_OFFSET} left-4 z-50 p-2 bg-amber-500/90 rounded-full shadow-lg`} 
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX className="size-6 text-white" /> : <FiMenu className="size-6 text-white" />}
      </button>

      {isOpen && (
        <div 
          onClick={toggleMenu}
          className="sm:hidden fixed inset-0 bg-black/50 z-20"
          aria-hidden="true" 
        />
      )}

      <aside 
        className={`
          SideNav shrink-0 overflow-y-auto SCROLLHIDDEN
          fixed top-0 left-0 h-full
          flex flex-col bg-teal-300/80 w-48 
          px-2 lg:px-5 space-y-2 z-30 pb-18
          transition-transform duration-300 ease-in-out
          
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 

          sm:translate-x-0 sm:static sm:w-24 md:w-28 lg:w-40 
        `}
      >

        <div className='SideNavBody flex flex-col justify-center items-center relative flex-wrap'>

          <div className='SideNavTitle flex flex-col items-center justify-center py-5 md:py-8 px-2'>
            <h3 className='SideNavTitleText text-amber-600/90 text-shadow-md font-bold text-sm md:text-base lg:text-xl mb-1'>
              Members
            </h3>
            <div className='TitleTextEffecter shadow-sm shadow-red-400/80 bg-amber-200/80 w-[85%] h-1 rounded-md' /> 
          </div>

          <div className='MemberBox justify-center items-center space-y-3'>
            {MEMBER.map((member)=>{
              return (
                <Link 
                  key={member.id} 
                  className='SideNavItemsBox size-17 sm:size-19 md:size-22 lg:size-30 relative flex flex-wrap flex-col items-center justify-around'
                  href={`#Member-${member.id}`} 
                  draggable={false}
                  onClick={() => handleLinkClick(() => setIsOpen(false))}
                >
                  <Image 
                    src={member.iconUrl} 
                    alt={member.nickName+" tag"} 
                    draggable={false}
                    fill={true}
                    sizes="(max-width: 640px) 100px, 5vw" 
                    className='size-max cursor-pointer rounded-full mt-3 border-3 border-amber-300/30 border-b-orange-400/70 shadow-[0_0_30px_rgba(0,0,0,0.7)] '
                  />
                </Link>
              )
            })}
          </div>

        </div>

      </aside>
    </>
  );
}