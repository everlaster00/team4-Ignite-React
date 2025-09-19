import logoIcon from '../assets/icons/LogoIcon.webp'
import { useState } from 'react'

  export default function TeamNotication() {
    const [isVisible,setisVisible] = useState(true)
  
    // 버튼태그 안에 블록 요소가 있으면 열 맞춤에 간섭이 일어나는 예 
      const MgCloser = () => {
    if (isVisible) {
      return (
        <button onClick={() => setisVisible(false)} className='bg-blue-200 border-1 rounded-lg w-16 h-8 m-2 space-y-3'>▲ 접기
          <div className='Notepad w-[90vw] mt-4'>
            <div className='flex item-center justify-center rounded-lg bg-gray-200 border-2 border-[#9faa5030] shadow-md py-2 px-4'>
              <img src={logoIcon} className='logo h-7 mr-1 rounded-full border-1 border-ridge' alt='logo icon' />
              <h1 className='Notification text-green-700 text-center text-xl font-bold '>공지: 테일윈드CSS가 적용되었습니다. </h1>
            </div>
            <ul className='Noti'>
              <li>css 적용된게 안보이시면 터미널에 <code className='text-blue-500'>npm install</code>을 쳐주세요🥰</li>
            </ul>
            <hr />
          </div>
          <div className="Note w-[90vw]">
            <p>1빠!!</p>
          </div>
        </button> 
      )
    } else {
      return (
        <button onClick={() => setisVisible(true)} className='bg-blue-200 border-1 rounded-lg w-16 h-8 m-2'>▼ 펼치기</button>
      )
    };}

    return (
      <MgCloser />
    )
  }