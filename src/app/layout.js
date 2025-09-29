// app/layout.js
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "My Next.js App",
  description: "Next.js로 만든 웹사이트",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
