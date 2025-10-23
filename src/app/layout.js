import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import Navigation from "./Navigation";
import IgFooter from "./IgFooter";
import Toast from "../test/Toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'] 
});


export const metadata = {
  title: '이그나이트 쇼케이스',
  description: '이그나이트 팀 프로젝트입니다',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <Toast />
        <header>
          <Navigation />
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer>
          <IgFooter />
        </footer>
      </body>
    </html>
  );
}
