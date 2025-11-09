// src/app/products/GalleryCard.jsx
"use client"; 

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

let z_value_counter = 0; 

export default function GalleryCard({nick,icon, index}) {
  z_value_counter++;
  
  const [isVisible, setIsVisible] = useState(false);
  
  const nickSize = nick.length > 10? "text-base" : "text-2xl";
  
  useEffect(() => {
    const delay = index * 100;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [index]);

  const cardHeightClass = 'min-h-[300px] md:min-h-[380px]'; 

  // 🌟 [디자인] 레이아웃 통일 & 역동적 페이드인 카드 🌟
  const cardBaseClasses = `
    relative overflow-hidden 
    rounded-xl shadow-2xl border-4 border-white 
    bg-gray-50 
    w-full ${cardHeightClass}
    
    // 페이드인 애니메이션!
    opacity-0 translate-y-8 scale-95 
    transition-all duration-700 ease-out 
    ${isVisible ? 'opacity-100 translate-y-0 scale-100' : ''} 
    
    transform hover:scale-[1.03] transition-transform duration-300 
    group 
  `;
  
  return (
    <div className={cardBaseClasses}> 
      
      <div className="relative h-full w-full"> 
        <Image 
          src={icon} 
          alt={`${nick}님의 작품`} 
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-[1.08] saturate-150" 
        />
      </div>

      {/* 2. 닉네임과 버튼 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-5 flex items-end">
        <div className="flex justify-between items-end w-full">
            
            {/* 닉네임 */}
            <h2 className={`${nickSize} font-extrabold text-white tracking-wider text-shadow-lg`}>{nick}</h2>

            {/* 버튼 */}
            <Link href={`/products/${nick}`} className="px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg whitespace-nowrap transition-all duration-300">
                작품 보기 →
            </Link>
        </div>
      </div>
    </div>
  );
}