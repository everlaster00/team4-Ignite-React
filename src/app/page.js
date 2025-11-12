// src/app/PptSlider.jsx (or page.js)

'use client'
import { useRef } from 'react';
import { slides } from '@/ppts/pptindex'; 


export default function PptSlider() {
  const containerRef = useRef(null);
  
  const handleScroll = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();

    const center = left + width / 2;
    const slideWidth = width;
    
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
          className={`PptSlide flex-shrink-0 w-screen h-screen snap-center flex flex-col justify-center items-center p-16 ${slide.backgroundClass} ${slide.colorClass}`}
        >
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-6xl font-black mb-4">{slide.title}</h1> 
                <p className="text-xl font-mono opacity-70 mb-12">{slide.subtitle}</p>
            </div>
            
            <div className="flex-grow flex justify-center items-center w-full max-w-4xl">
                {slide.contents}
            </div>
        </div>
      ))}
    </div>
  );
}