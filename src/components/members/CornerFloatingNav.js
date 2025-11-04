import MEMBER_INFO from "./memberInfo";
import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";

/**
🛠️ 안내:
CornerFloatingNav(배열_인덱스,)
@배열_인덱스 = id @ 0: 김정민(Everlaster) | 1: 강선아(nicecoco) | 2: 박진우(luke) | 3: 지종현(LogicNotFound404) | 4: 박주형(ajea)
*/
export default function CornerFloatingNav({ index , }) {
  
  const targetMember = MEMBER_INFO[index]
  const name = targetMember.nickName
  const avatar = targetMember.iconUrl
  const role = targetMember.role

  return (
    <div className="CornerNav fixed top-21 left-1 p-2">
      <div className="CornerNavRayout flex flex-row">
        <Image src={avatar} alt={`${name}님의 작품 목록창 아바타`} width={80} height={80} className="rounded-full border-2 border-black size-15" />
        <div className="CornerNavHeroBox p-2 flex flex-col">
          <p className="HeroName font-overwatch font-semibold text-2xl">{name}</p>
          <p className="HeroRole font-overwatch text-sm text-amber-200">{role}</p>
        </div>
      </div>
    </div>
  )
}