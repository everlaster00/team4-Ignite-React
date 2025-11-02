// src/app/components/TeamCard.jsx

/**
 * 팀원 카드 컴포넌트
 * @param {object} props
 * @param {string} props.avatarUrl - 팀원 아바타 이미지 URL (예: "/avatars/mina.png")
 * @param {string} props.name - 팀원 이름
 * @param {string} props.role - 팀원 역할 (예: "프론트엔드")
 * @param {string} props.bio - 팀원 자기소개
 */
export default function TeamCard({ id, avatarUrl, name, role, bio }) {
  console.log(id);
  return (
    <div id={`Member-${id}`} className={`w-90 sm:w-130 md:w-160 lg:w-220 mx-auto bg-white shadow-xl rounded-xl overflow-hidden 
    transform hover:scale-[1.02] transition-transform duration-300 ease-in-out border-t-8 border-amber-500`}>
      
      {/* 📌 아바타 이미지 (고정 비율 유지를 위해 flex 사용) */}
      <div className="AvataBody flex justify-center items-center p-8 md:p-12 bg-gray-50">
        {/* Next.js Image 컴포넌트 대신 일반 img 태그 사용 */}
        <img 
          className="size-40 sm:size-45 md:size-50 lg:size-55 rounded-full object-cover border-4 border-white 
          outline-2 outline-offset-2 outline-amber-400/70 shadow-[0_0_20px_rgba(255,90,0,0.8)]" 
          src={avatarUrl} 
          alt={`${name} 아바타`} 
        />
      </div>

      <div className="p-6 text-center">
        {/* 📌 이름 및 역할 */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
          {name}
        </h2>
        <p className="text-sm md:text-base font-medium text-amber-600 mb-4">
          {role}
        </p>

        {/* 📌 자기소개 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-base italic leading-relaxed">
            "{bio}"
          </p>
        </div>
      </div>
    </div>
  );
}