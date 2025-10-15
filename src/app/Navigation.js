import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-full py-4 px-6 md:px-12 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-400 glitch-text ">이그나이트</h1>
        <nav>
          <ul className="flex space-x-4 md:space-x-3 text-gray-300 text-sm md:text-base">
            <li className='block'><Link href="./" 
            className="inline-block p-2 rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-300">홈</Link></li>
            <li className='block'><Link href="about" 
            className="inline-block p-2 rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-300">소개</Link></li>
            <li className='block'><Link href="products" 
            className="inline-block p-2 rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-300">제품</Link></li>
            <li className='block'><Link href="community" 
            className="p-2 inline-block rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-300">커뮤니티</Link></li>
            <li className='block'><Link href="contact" 
            className="p-2 inline-block rounded-md hover:bg-gray-700/70 hover:text-blue-300 hover:-translate-y-1 transition-transform duration-300">고객센터</Link></li>
        </ul>
        </nav>
      </div>
    </nav>
  )
}