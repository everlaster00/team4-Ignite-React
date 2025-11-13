//src/app/fire_board/layout.jsx

export const metadata = {
  title: "이그나이트 파이어보드",
  description: "이그나이트 팀 프로젝트 게시판입니다",
};

export default function FireBoardLayout({ children }) {
  return (
    <section className="max-w-full h-screen py-5 px-7 md:px-10 lg:px-15 space-y-6 bg-igniteOrange-50/80 overflow-y-auto SCROLLHIDDEN overscroll-y-auto">
      {children}
    </section>
  );
}
