import IgniteFont from '@@/IgniteFont';

export default function IgFooter() {
  return (
    <div className="z-index-50 w-full bg-gray-200 p-4 text-center">
      <p>COPYRIGHT 2025 <IgniteFont ><span className='font-semibold'>Team Ignite</span></IgniteFont> </p>
      <p className="text-xs text-gray-400">
        Background Images
        <a 
          href="http://www.freepik.com" 
          target="_blank" // 새 탭에서 열기. 프로젝트 페이지 bg 사용 조건
          rel="noopener noreferrer" 
          className="text-amber-600 hover:text-amber-500 underline ml-1"
        >
          Designed by Freepik
        </a>
      </p>
    </div>
  )
}