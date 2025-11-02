// src/components/members/memberInfo.ts

/**
 * 💖 팀원 정보 객체의 타입을 정의하는 인터페이스
 */
export interface TeamMember {
  id: number;
  nickName: string;
  role: string;
  iconUrl: string;
  bio: string;
}

/**
🛠️ 안내:
@ 배열_인덱스 = id @ 0: 김정민(Everlaster) | 1: 강선아(nicecoco) | 2: 박진우(luke) | 3: 지종현(LogicNotFound404) | 4: 박주형(ajea)
@ 내부_프로퍼티 @: id | nickName | role | iconUrl | bio
*/
const MEMBER_INFO: TeamMember[] = [
  {
    id: 0,
    nickName: "Everlaster",
    role: '💡팀장',
    iconUrl: "/imgs/EverlasterAvatar.webp", 
    bio:'Ignite 팀의 비전을 제시하고 모두의 열정에 불을 붙이는 시작점입니다.'
  },
  {
    id: 1,
    nickName: "nicecoco",
    role: '✨ 픽셀의 연금술사',
    iconUrl: "/imgs/nicecocoAvatar.webp",
    bio:'디자이너의 의도를 완벽하게 이해하고, 정적인 이미지를 생동감 있는 코드로 변환합니다.'
  },
  {
    id: 2,
    nickName: "luke",
    role: '💎 에러 보석 수집가',
    iconUrl: "/imgs/lukeAvatar.webp",
    bio:'코딩 속에 숨어있는 작은 실수와 버그를 놓치지 않고 수집하여 코드를 단단하게 만듭니다.'
  },
  {
    id: 3,
    nickName: "LogicNotFound404",
    role: '🗺️ 미로 찾기 탐험가',
    iconUrl: "/imgs/NotFoundLogic404Avatar.webp",
    bio:'복잡하게 얽힌 로직의 실타래를 푸는 것을 즐기며, 불가능해 보이는 문제도 해결합니다.'
  },
  {
    id: 4,
    nickName: "ajea",
    role: '⚡️ 0.1초의 마법사',
    iconUrl: "/imgs/ajeaAvatar.webp",
    bio: '서비스의 로딩 속도와 응답 시간을 단 0.1초라도 줄이기 위해 밤낮없이 최적화를 시도합니다.'
  },
];

export default MEMBER_INFO;