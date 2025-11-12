// src/app/page.tsx
'use client'

import { useRef } from 'react';
import Image from 'next/image';
import testImg1 from '@/assets/images/aboutBG.webp'
import testImg2 from '@/assets/images/showCaseBg.jpg'
import testImg3 from '@/assets/images/NotFound.webp'


// ppt 슬라이드 데이터
const slides = [
  { id: 1, imageSrc: testImg1, title: '팀 프로젝트 소개' },
  { id: 2, imageSrc: testImg2, title: '핵심 기능' },
  { id: 3, imageSrc: testImg3, title: '낫 파운드' },
];

export default function PptSlider() {

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.MouseEvent<HTMLDivElement>) => {

    if (!containerRef.current) return;

    const container = containerRef.current;
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();

    const center = left + width / 2;
    const slideWidth = width;

    // 클릭 위치에 따라 왼쪽/오른쪽으로 스크롤
    if (clientX < center) {
      container.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: slideWidth, behavior: 'smooth' });
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