'use client'
import Link from 'next/link';
import React from 'react';
import logo from '@/assets/icons/LogoIcon.webp'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  
  const pathname = usePathname();

  const getNavItemClass = (href) => {
    const baseClass = `inline-block p-2 rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-400`
    const activeClass = `inline-block p-2 rounded-md text-amber-500/85 font-extrabold`

    const isActive = pathname === href;

    const activeStyle = isActive? activeClass : baseClass;

    return `${activeStyle}`
  }

  return (
    <nav className="w-full py-4 px-6 md:px-12 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className='TitleBox flex flex-row items-center'>
          <Image src={logo} alt="Ignite Logo" className="inline-block w-7 h-7 mr-2 rounded-full" />
          <h1 className="text-2xl font-bold text-blue-400 font-sans glitch-text ">이그나이트</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 md:space-x-3 text-gray-300 text-base md:text-lg  ">
            <li><Link href="/" className={getNavItemClass("/")}>홈</Link></li>
            <li><Link href="/about" className={getNavItemClass("/about")}>소개</Link></li>
            <li><Link href="/products" className={getNavItemClass("/products")}>갤러리</Link></li>
            <li><Link href="/idea_borad" className={getNavItemClass("/idea_borad")}>아이디어 보드</Link></li>
            <li><Link href="/contact" className={getNavItemClass("/contact")}>문의하기</Link></li>
        </ul>
        </nav>
      </div>
    </nav>
  )
}