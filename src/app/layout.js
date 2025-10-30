import { yChoi, overWatch } from "../fonts/local";
import Navigation from "./Navigation";
import IgFooter from "./IgFooter";
import ClientWrapper from "@@/ClientWrapper";
import "@/test/toast/InitGlobalToast";
import Toast from "@/test/toast/Toast";
import "./globals.css";

console.log('오버워치: ',overWatch.variable);

export const metadata = {
  title: "이그나이트 쇼케이스",
  description: "이그나이트 팀 프로젝트입니다",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${yChoi.variable} ${overWatch.variable}`}>
      <body className="flex flex-col min-h-screen">
        <ClientWrapper />
        <Toast />
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
