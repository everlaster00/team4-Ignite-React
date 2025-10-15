import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import Navigation from "./Navigation";
import IgFooter from "./IgFooter";
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
  title: '프롬프트 마켓',
  description: 'AI에게 생명을 불어넣는 최고의 프롬프트를 만나보세요.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
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
