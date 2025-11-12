// src/ppts/pptindex.js 

const PlaceholderContent = ({ title }) => (
    <div className="p-8 text-center bg-white/90 rounded-xl shadow-2xl backdrop-blur-sm">
        <h3 className="text-3xl font-extrabold text-gray-800 mb-2">{title}</h3>
        <p className="text-xl text-gray-600">콘텐츠</p>
    </div>
);


export const ppt1 = {
    id: 1, 
    title: "🔥 PROJECT IGNITE", 
    subtitle: "열정의 시작, 쇼케이스",
    contents: <PlaceholderContent title="프로젝트 소개 화면" />,
    backgroundClass: 'bg-orange-600', 
    colorClass: 'text-white',
};

export const ppt2 = {
    id: 2, 
    title: "⚙️ 핵심 기술 스택", 
    subtitle: "Next.js, Tailwind, Firebase, Zustand",
    contents: <PlaceholderContent title="기술 스택 및 아키텍처" />,
    backgroundClass: 'bg-gray-50', 
    colorClass: 'text-gray-800',
};

export const ppt3 = {
    id: 3, 
    title: "🚀 다음 단계로", 
    subtitle: "마지막 목표와 비전",
    contents: <PlaceholderContent title="미래 계획 및 최종 점검" />,
    backgroundClass: 'bg-gray-800', 
    colorClass: 'text-white',
};

export const slides = [ppt1, ppt2, ppt3];