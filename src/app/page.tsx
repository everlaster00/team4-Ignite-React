// src/app/page.tsx
'use client'

import { useState , useEffect, useRef } from 'react';
import Image from 'next/image';
import ppt1 from '@/assets/ppt/ppt1.png';
import ppt2 from '@/assets/ppt/ppt2.png';
import ppt3 from '@/assets/ppt/ppt3.png';
import ppt4 from '@/assets/ppt/ppt4.png';
import ppt5 from '@/assets/ppt/ppt5.png';
import ppt6 from '@/assets/ppt/ppt6.png';
import ppt7 from '@/assets/ppt/ppt7.png';
import ppt8 from '@/assets/ppt/ppt8.png';
import ppt9 from '@/assets/ppt/ppt9.png';
import ppt10 from '@/assets/ppt/ppt10.png';
import ppt11 from '@/assets/ppt/ppt11.png';
import ppt12 from '@/assets/ppt/ppt12.png';

// ppt 슬라이드 데이터
const slides = [
  { id: 1, imageSrc: ppt1, title: 'ppt1' },
  { id: 2, imageSrc: ppt2, title: 'ppt2' },
  { id: 3, imageSrc: ppt3, title: 'ppt3' },
  { id: 4, imageSrc: ppt4, title: 'ppt4' },
  { id: 5, imageSrc: ppt5, title: 'ppt5' },
  { id: 6, imageSrc: ppt6, title: 'ppt6' },
  { id: 7, imageSrc: ppt7, title: 'ppt7' },
  { id: 8, imageSrc: ppt8, title: 'ppt8' },
  { id: 9, imageSrc: ppt9, title: 'ppt9' },
  { id: 10, imageSrc: ppt10, title: 'ppt10' },
  { id: 11, imageSrc: ppt11, title: 'ppt11' },
  { id: 12, imageSrc: ppt12, title: 'ppt12' },
];

//세션 스토리지
const STORAGE_KEY = 'lastViewedSlideId';

const scrollToSlide = ( container: HTMLDivElement, slideId: number) => {
  const slideIndex = slideId - 1;
  if (slideIndex < 0 || slideIndex >= slides.length ) return;

  const scrollPosition = slideIndex * container.offsetWidth;
  container.scrollTo({ left: scrollPosition, behavior: 'smooth'}) 
}

export default function PptSlider() {

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlideId, setCurrentSlideId ] = useState(1);

  useEffect(()=> {
    if (typeof window !== 'undefined') {
      const storedId = sessionStorage.getItem(STORAGE_KEY);
      if (storedId) {
        const parsedId = parseInt(storedId);
        if (parsedId >= 1 && parsedId <= slides.length){
          setCurrentSlideId(parsedId);
        }
      }
    }
  },[]);

  useEffect(()=>{
    if (!containerRef.current) return;

    scrollToSlide(containerRef.current, currentSlideId);
  },[currentSlideId]);

  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {

    if (!containerRef.current || typeof window === 'undefined') return;

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();

    const center = left + width / 2;

    let nextSlideId;
    // 클릭 위치에 따라 왼쪽/오른쪽으로 스크롤
    if (clientX < center) {
      nextSlideId = Math.max(1, currentSlideId - 1);
    } else {
      nextSlideId = Math.min(slides.length, currentSlideId + 1);
    }
    
    if (nextSlideId !== currentSlideId) {
        // 1. 상태 업데이트 (화면 스크롤 트리거)
        setCurrentSlideId(nextSlideId);
        // 2. 🌟 sessionStorage에 업데이트 (세션 메모리 저장)
        sessionStorage.setItem(STORAGE_KEY, String(nextSlideId));
    }
  };

  return (

    <div
      ref={containerRef}
      onClick={handleScroll}
      className="PptContainer bg-gray-900 flex w-screen h-screen overflow-x-scroll snap-x snap-mandatory scroll-smooth cursor-pointer"
      style={{ scrollSnapType: 'x mandatory' }}
    >

    {slides.map((slide) => (
      <div
        key={slide.id}
        className="PptSlide flex-shrink-0 w-screen h-screen snap-center"
      >

      {/* PPT 스크린샷 이미지를 꽉 채워 넣기 */}
      <Image
        src={slide.imageSrc}
        alt={slide.title || `Slide ${slide.id}`}
        className="w-full h-full object-contain" 
      />

      </div>

    ))}
    </div>
  );

}