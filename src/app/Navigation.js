import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-full py-4 px-6 md:px-12 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400">프롬프트 마켓</h1>
          <nav>
              <ul className="flex space-x-4 md:space-x-8 text-gray-300 text-sm md:text-base">
                  <li><Link href="./" className="hover:text-blue-300 transition-colors">홈</Link></li>
                  <li><Link href="about" className="hover:text-blue-300 transition-colors">소개</Link></li>
                  <li><Link href="products" className="hover:text-blue-300 transition-colors">제품</Link></li>
                  <li><Link href="community" className="hover:text-blue-300 transition-colors">커뮤니티</Link></li>
                  <li><Link href="contact" className="hover:text-blue-300 transition-colors">고객센터</Link></li>
              </ul>
          </nav>
      </div>
    </nav>
  )
}