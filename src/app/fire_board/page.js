// src/app/fire_board/page.js
export default function FireBoard() { // 함수명은 대문자로 시작하는 것이 컨벤션입니다.
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-8"> {/* 전체 배경을 밝은 베이지-앰버 그라데이션으로 변경 */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10"> {/* 게시판 컨테이너를 카드 형태로 */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4"> {/* 제목 색상 변경 및 폰트 굵기 강화 */}
          파이어 보드 ( 예시 이미지 )
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"> {/* 본문 색상 변경, 라인 높이 조정 */}
          떠오르는 아이디어를 공유해보고 다듬어 보는 공간입니다.
        </p>

        {/* 게시물 목록이 들어갈 영역 - 예시 */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">새로운 기능 아이디어: 실시간 공동 편집</h2>
            <p className="text-gray-600 text-sm">최근 작성: 2023-10-27</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">UI/UX 개선 제안: 다크 모드 추가</h2>
            <p className="text-gray-600 text-sm">최근 작성: 2023-10-26</p>
          </div>
        </div>

        {/* 게시물 작성 버튼 - 예시 */}
        <div className="mt-8 text-right">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">
            아이디어 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}