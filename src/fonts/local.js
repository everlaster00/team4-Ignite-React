// src/fonts/local.js 
import localFont from 'next/font/local';

// 1. Y최애체 폰트 설정
export const yChoi = localFont({
  src: [
    {
      // public/font/local/YOnepick-Regular.otf 경로 지정
      path: '../../public/font/local/YOnepick-Regular.otf', 
      weight: '100 400',
      style: 'normal',
    },
    {
      // public/font/local/YOnepick-Bold.otf 경로 지정
      path: '../../public/font/local/YOnepick-Bold.otf',
      weight: '500 900',
      style: 'normal',
    },
  ],
  display:'swap',
  variable: '--font-ychoi', // Tailwind에서 쓸 변수 이름(Y최애체)
});

// 2. 오버워치체 폰트 설정
export const overWatch = localFont({
  src: [
    {
      // public/font/local/koverwatch.ttf 경로 지정
      path: '../../public/font/local/koverwatch.ttf', 
      weight: 'normal', // 폰트 파일 하나만 있다면 normal로 설정
      style: 'normal',
    },
  ],
  display:'swap',
  variable: '--font-overwatch', // Tailwind에서 쓸 변수 이름
});