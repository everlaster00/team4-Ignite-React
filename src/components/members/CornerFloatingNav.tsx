'use client'
import MEMBER_INFO from "./memberInfo";
import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";

// 갤러리 내부에서 작품 리스트를 제공하고 링크를 걸어줄 수 있는 컴포넌트입니다.
// 프롭스 데이터를 2개 받습니다. ( index , projectLinks )
// index = 선택
// 0: 김정민(Everlaster) | 1: 강선아(nicecoco) | 2: 박진우(luke) | 3: 지종현(LogicNotFound404) | 4: 박주형(ajea)
// projectLinks = products    //아래 작성 예제를 참고하여 작성한 객체를 넘겨주시면 됩니다.
// const products = [
//   { title:"이거 나이뜨 한 계산기", url:"/products/Everlaster/"},
//   { title:"이거 나이뜨 한 계산기2",url:"/products/luke/"}
// ];


// interface ProjectLink {
//   title: string;
//   url: string;
// }
// interface CornerNavProps {
//   index: number;
//   projectLinks: ProjectLink[]; 
// }
/**
🛠️ 안내:
CornerFloatingNav(배열_인덱스,)
@배열_인덱스 = id @ 0: 김정민(Everlaster) | 1: 강선아(nicecoco) | 2: 박진우(luke) | 3: 지종현(LogicNotFound404) | 4: 박주형(ajea)
*/
export default function CornerFloatingNav({ index , projectLinks }) {

  const [ itemsShow , setItemsShow ] = useState(false);
  
  const targetMember = MEMBER_INFO[index]
  const name = targetMember.nickName
  const avatar = targetMember.iconUrl
  const role = targetMember.role

  function handleClick() { setItemsShow(!itemsShow) };
  const isShow = itemsShow ? "flex flex-col justify-center items-center" : "hidden";

  return (
    <div className="CornerNav fixed top-21 duration-400 -left-6 hover:left-2 max-h-screen overflow-auto cursor-pointer group z-50"
      onClick={handleClick}>
      <div className="
        CornerNavRayout shrink-0 p-1 hover:p-2 not-hover:max-w-17 not-hover:max-h-17 duration-400 
        flex flex-row rounded-4xl 
        
        bg-teal-700/30 backdrop-blur-sm 
        
        shadow-xs shadow-current
        
        hover:bg-teal-500/90
      ">
        <Image 
          src={avatar} 
          alt={`${name}님의 작품 목록창 아바타`} 
          draggable={false} 
          width={80} 
          height={80} 
          className="rounded-full border-2 border-amber-100/80 size-15" 
        />
        
        <div className="CornerNavHeroBox p-2 flex flex-col scale-0 group-hover:scale-100">
          <p className="HeroName font-overwatch font-semibold text-2xl p-1 text-white">{name}</p>
          <p className="HeroRole font-overwatch text-sm text-amber-400">{role}</p>
          <LuChevronDown className={`text-white transition duration-150 ${itemsShow ? 'rotate-180' : 'rotate-0'}`}/> 
          <div className={`ProjectsIndexBox ${isShow}`}>
            <ul className="ProjectsList space-y-1">
              <p className="ProhectsListGude font-overwatch text-gray-50 text-base border-b-1">프로젝트 목록</p>
              {projectLinks.map((item)=>{
                return (
                  <li key={item.title} className="font-overwatch text-gray-200 hover:text-amber-300 text-base hover:text-lg">
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}