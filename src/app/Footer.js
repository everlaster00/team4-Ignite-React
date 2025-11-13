"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/icons/LogoIcon.webp';
import nextLogo from '@/assets/icons/nextRunnersLogo.webp';
import IgniteFont from '@@/IgniteFont';

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default function IgFooter() {
  const footerLinks = [
    { title: 'Everlaster', href: '/products/Everlaster' },
    { title: 'LogicNotFound404', href: '/products/LogicNotFound404' },
    { title: 'ajea', href: '/products/ajea' },
    { title: 'luke', href: '/products/luke' },
    { title: 'nicecoco', 'href': '/products/nicecoco' },
  ];



  const [imageError, setImageError] = useState(false);
  const placeholderSrc = "https://placehold.co/30x30/4B5563/FBBF24?text=IGN";
  
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);


  return (
    <>
      <footer className="z-50 w-full bg-gray-900 text-gray-300 border-t-4 border-amber-600 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-between sm:items-end">
            
            <div className="flex flex-col items-center sm:items-start space-y-3 order-2 sm:order-1 mt-6 sm:mt-0">
              
              <p className="flex items-center text-md md:text-lg lg:text-xl font-light tracking-wide text-gray-400">
                <Image 
                  src={logo} 
                  alt="Team Ignite Logo" 
                  className="w-7 h-7 mr-2 rounded-sm"
                  onError={() => setImageError(true)}
                />
                <span className='pr-2'>&copy; {getCurrentYear()}</span>
                TEAM
                <IgniteFont>
                  <span className='font-extrabold text-amber-500/80 pl-2'>IGNITE</span>
                </IgniteFont>
              </p>

              <div className="flex flex-row justify-center items-center">
                <Image 
                  src={nextLogo} 
                  alt="Next.runners Logo" 
                  className="w-7 h-7 mr-2 rounded-sm"
                  onError={() => setImageError(true)}
                />
                <p className="text-sm lg:text-base font-bold text-gray-500">
                  <span>OZ CODING SCHOOL</span>
                </p>

              </div>
              <p className="text-sm text-gray-500 font-medium">
                BG Credit:
                  <span className="text-gray-400 ml-1">
                    Designed by 
                    <a 
                      href="http://www.freepik.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Freepik 웹사이트로 이동"
                    >
                      Freepik
                    </a>
                  </span>
                </p>
            </div>

            <nav className="mt-0 order-1 sm:order-2">
              <h3 className="text-base lg:text-lg font-semibold text-amber-500 mb-2 uppercase tracking-wider text-center sm:text-right">
                Team Personas
              </h3>
              <div className='TeamPersonasBoxSpacer hidden p-2 md:block'>&nbsp;</div>
              <ul className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-3 text-sm lg:text-base font-medium">
                {footerLinks.map((link) => (
                  <li key={link.title}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 p-1 -m-1"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>
      
      {showScroll && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-4 right-4 z-50 p-3 bg-amber-600 text-gray-900 rounded-full shadow-lg hover:bg-amber-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
            <path d="m5 12 7-7 7 7"/>
            <path d="M12 19V5"/>
          </svg>
        </button>
      )}
    </>
  );
}