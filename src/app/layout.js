// import { Geist, Geist_Mono } from "next/font/google";
// import { Inter } from 'next/font/google';
import Navigation from "./Navigation";
import IgFooter from "./igFooter";
import ClientWrapper from "@@/ClientWrapper";
import "./globals.css";

// 구시스템 환경에서의 폰트 현시스템에서 호환안돼서 주석처리
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// 이 폰트는 확인 해보니 한글 지원 안되는 폰트였음
// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ['latin']
// });

export const metadata = {
  title: "이그나이트 쇼케이스",
  description: "이그나이트 팀 프로젝트입니다",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <ClientWrapper />
        <header>
          <Navigation />
        </header>
        <main className="flex-1">{children}</main>
        <footer>
          <IgFooter />
        </footer>
      </body>
    </html>
  );
}
