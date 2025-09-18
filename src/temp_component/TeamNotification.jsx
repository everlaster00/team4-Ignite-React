import logoIcon from '../assets/icons/LogoIcon.webp'

  export default function TeamNotication() {
    return (
    <section className='m-3'>
      <div className='space-y-2'>
        <div className='flex item-center justify-center rounded-lg bg-gray-200 border-2 border-[#9faa5030] shadow-md py-2 px-4'>
          <img src={logoIcon} className='logo h-7 mr-1 rounded-full border-1 border-ridge' alt='logo icon' />
          <h1 className='text-green-700 text-center text-xl font-bold '>공지: 테일윈드 적용되었습니다. </h1>
        </div>
        <li>css 적용된게 안보이시면 터미널에 npm install을 쳐주세요🥰</li>
      </div>
    </section>
    )
  }