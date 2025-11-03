'use client'
import Link from 'next/link';
import React from 'react';
import logo from '@/assets/icons/LogoIcon.webp'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  
  const pathname = usePathname();

  const getNavItemClass = (href) => {
    const baseClass = `inline-block p-2 rounded-md hover:bg-gray-800/70 group`
    
    const activeClass = `inline-block p-2 rounded-md text-amber-500/85 font-extrabold`

    const isActive = pathname === href;

    const activeStyle = isActive? activeClass : baseClass;

    return `${activeStyle}`
  }

  const NavText = ({ href, children }) => {
      // isActive 상태일 때는 일반적인 활성 스타일을 적용합니다.
      if (pathname === href) {
          return <span className="text-amber-500/85 font-extrabold">{children}</span>
      }

      // 비활성 상태일 때: 부모 Link 태그가 호버되면(group-hover) 자식 <span>이 반응합니다.
      const hoverStyle = `
        group-hover:text-blue-400/90
        animate-on-group-hover                  
      `;

      return (
        <span className={`inline-block text-gray-300 ${hoverStyle}`}>
          {children}
        </span>
      )
  }

  return (
    <nav className="z-index-50 w-full py-2 md:py-4 px-6 md:px-12 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className='TitleBox flex flex-row items-center'>
          <Image src={logo} alt="Ignite Logo" className="inline-block size-6 md:size-7 mr-2 rounded-full" />
          <Link className="text-lg md:text-2xl font-bold text-blue-400 font-sans glitch-text" href="/" >
            이그나이트
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-1 md:space-x-3 text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl  ">
            <li><Link href="/" className={getNavItemClass("/")}><NavText href="/" >홈</NavText></Link></li>
            <li><Link href="/about" className={getNavItemClass("/about")}><NavText href="/about" >소개</NavText></Link></li>
            <li><Link href="/products" className={getNavItemClass("/products")}><NavText href="/products" >갤러리</NavText></Link></li>
            <li><Link href="/idea_board" className={getNavItemClass("/idea_board")}><NavText href="/idea_board" >아이디어 보드</NavText></Link></li>
            <li><Link href="/contact" className={getNavItemClass("/contact")}><NavText href="/contact" >문의하기</NavText></Link></li>
          </ul>
        </nav>
      </div>
    </nav>
  )
}