// src/app/page.tsx
'use client'

import { useState , useEffect, useRef } from 'react';
import Image from 'next/image';
import testImg1 from '@/assets/images/aboutBG.webp';
import testImg2 from '@/assets/images/showCaseBg.jpg';
import testImg3 from '@/assets/images/NotFound.webp';

// ppt 슬라이드 데이터
const slides = [
  { id: 1, imageSrc: testImg1, title: '팀 프로젝트 소개' },
  { id: 2, imageSrc: testImg2, title: '핵심 기능' },
  { id: 3, imageSrc: testImg3, title: '낫 파운드' },
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
      className="PptContainer flex w-screen h-screen overflow-x-scroll snap-x snap-mandatory scroll-smooth cursor-pointer"
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
        className="w-full h-full object-cover" // 화면에 꽉 차게!
      />

      </div>

    ))}
    </div>
  );

}