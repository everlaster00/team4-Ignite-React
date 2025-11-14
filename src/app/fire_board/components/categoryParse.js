//src/app/fire_board/components/categoryParse.js

// 카테고리 코드와 표시 이름을 매핑하는 객체
export const CATEGORY_MAP = {
    nomal: { label: "🗣 일반", icon: "🗣" },
    idea: { label: "💡 아이디어", icon: "💡" },
    bug: { label: "🐞 버그 제보", icon: "🐞" },
};

/**
 * 카테고리 코드(nomal, idea, bug)를 예쁜 표시 이름과 아이콘으로 변환합니다.
 * @param {string} code - DB에 저장된 카테고리 코드 (예: 'nomal')
 * @returns {{label: string, icon: string}} 변환된 정보 (예: { label: "🗣 일반", icon: "🗣" })
 */
export function getCategoryDisplay(code) {
    return CATEGORY_MAP[code] || CATEGORY_MAP.nomal;
}

/**
 * 모든 카테고리 목록을 배열 형태로 반환합니다.
 * @returns {Array<{code: string, label: string, icon: string}>}
 */
export function getAllCategories() {
    return Object.keys(CATEGORY_MAP).map(code => ({
        code,
        ...CATEGORY_MAP[code]
    }));
}