/**
 * Date 객체 또는 날짜 문자열을 받아서 '방금 전', 'N분 전', '날짜' 등 
 * 사용자 친화적인 형식으로 가공하여 반환함.
 *
 * @param {string | Date} dateInput - ISO 8601 형식의 날짜 문자열 또는 Date 객체
 * @returns {string} 가공된 시간 문자열
 */
export const formatTimeAgo = (dateInput) => {
  // 입력값을 Date 객체로 변환함.
  const date = new Date(dateInput);
  const now = new Date();

  if (isNaN(date)) {
    return String(dateInput);
  }

  // 시간차를 초 단위로 계산함.
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // 분/시간/일/년 단위로 환산함.
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  
  // 1. 분 단위 처리
  if (minutes < 1) {
    return '방금 전';
  }
  if (minutes < 5) {
    return `${minutes}분 전`;
  }
  if (minutes < 10) {
    return '5분 전';
  }
  if (minutes < 20) {
    return '10분 전';
  }
  if (minutes < 30) {
    return '20분 전';
  }
  if (minutes < 60) {
    return '30분 전';
  }

  // 2. 시간 단위 처리 (24시간 미만)
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  
  // 3. 1년 미만: 날짜만 출력 (사용자 현지화 적용!)
  if (years < 1) {
    // 💡 undefined를 넘겨서 시스템 기본 언어 설정에 맞춰 '월/일'만 출력함.
    return new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric' }).format(date);
  }

  // 4. 1년 이상: 년도까지 출력 (사용자 현지화 적용!)
  if (years >= 1) {
    // 💡 undefined를 넘겨서 시스템 기본 언어 설정에 맞춰 '년/월/일' 출력함.
    return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  return String(dateInput);
};