//src/app/layout.js
import { yChoi, overWatch } from "../fonts/local";
import "./globals.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ClientWrapper from "@@/ClientWrapper";
import ScrollToTopBottom from "@@/ScrollToTopBottom";


export const metadata = {
  title: "이그나이트 쇼케이스",
  description: "이그나이트 팀 프로젝트입니다",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth" className={`${yChoi.variable} ${overWatch.variable}`}>
      <body className="flex flex-col min-h-screen">
        <ClientWrapper>
          <header>
            <Navigation />
          </header>
          <main id="MainFrame" className="flex-1">{children}</main>
            <ScrollToTopBottom />
          <footer>
            <Footer />
          </footer>
        </ClientWrapper>
      </body>
    </html>
  );
}
