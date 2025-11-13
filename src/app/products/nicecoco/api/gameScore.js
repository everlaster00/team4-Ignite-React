//점수 저장 함수
export const saveGameScore = async (score) => {
  const record = { score, date: new Date().toISOString() };
  console.log("점수 저장:", record);
  // TODO: supabase나 firebase로 실제 저장 가능
  return true;
};
