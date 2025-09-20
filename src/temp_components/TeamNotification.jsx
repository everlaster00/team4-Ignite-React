import logoIcon from '../assets/icons/LogoIcon.webp'
import { useState } from 'react'

  export default function TeamNotication() {
    const [isVisible,setisVisible] = useState(true)
  
    // 버튼태그 안에 블록 요소가 있으면 열 맞춤에 간섭이 일어나는 예 
      const MgCloser = () => {
    if (isVisible) {
      return (
        <button onClick={() => setisVisible(false)} className='bg-blue-200 border-1 rounded-lg w-16 h-8 m-2 space-y-3'>▲ 접기
          <div className='Notepad w-[98vw] mt-4'>
            <div className='flex item-center justify-center rounded-lg bg-gray-200 border-2 border-[#9faa5030] shadow-md py-2 px-4'>
              <img src={logoIcon} className='logo h-7 mr-1 rounded-full border-1 border-ridge' alt='logo icon' />
              <h1 className='Notification text-green-700 text-center text-xl font-bold '>공지: 테일윈드CSS가 적용되었습니다. </h1>
            </div>
            <ul className='Noti'>
              <li>작업 시작 전에 <code className='text-fuchsia-500'>git pull</code> 푸쉬하기 전에도 <code className='text-fuchsia-500'>git pull</code> </li>
              <li>css 적용된게 안보이시면 터미널에 <code className='text-blue-500'>npm install</code>을 쳐주세요🥰</li>
              <li>팁💡: 작업내역 다 취소하고 원래대로 돌리고 싶으실 때는? <code className='text-emerald-600'>git clean -f</code> 해보시고 안되면?  <code className='text-emerald-600'>git rstore .</code> ⬅️&#x28;점까지&#x29;  </li>
            </ul>
            <hr />
          </div>
          <div className="Note w-[98vw] space-y-2 text-left">
            <h4 className='Notegude text-center'>시험하실 것들 다 테스트 해보시거나, 남기고 싶으신 말들을 자유롭게 써주세요~</h4>
            <hr />
            <p>KM:1빠!!</p>
            <p>KM:지금 보이는 이 곳을 거실로 하고 각자의 개인공간을 추가해 볼 생각 중입니다.</p>
            <p> ㄴKM2:네, 찬성입니다~ ㅋㅋㅋ </p>
            <p>KM:자주 쓰이는 테일윈드 명령 패턴을 축약해서 등록해야할 것 같아요. flex item-center justify-center 이런 명령을 FLEX 만 쳐도 되게끔 </p>
            <p>KM:temp_components폴더 안에 각자의 이니셜로 폴더를 더 추가해서 개인용 컴포넌트 모음집을 만드실 수 있게 하는것도 좋을 것 같습니다.</p>
            <p>KM:동영상 같은 대용량 파일은 깃허브가 싫어하는 파일이라, 소스 공유할 다른 방법이 필요하겠네요.</p>
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