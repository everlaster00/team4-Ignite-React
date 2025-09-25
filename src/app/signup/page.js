export default function SignupPage() {
  async function signup(prevState, formData) {
    'use server';
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      terms: formData.get('terms') === 'on',
      hobbies: formData.getAll('hobby'),
    };

    if (userData.password !== userData.passwordConfirm) {
      console.log('비밀번호가 일치하지 않습니다.');
      return {
        error: '비밀번호가 일치하지 않습니다.',
        values: { ...userData },
      };
    }

    if (!userData.terms) {
      console.log('약관에 동의하지 않았습니다.');
      return;
    }

    console.log('사용자가 입력한 데이터', userData);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">회원가입</h1>

      <form action={signup} className="space-y-4 max-w-md">
        {/* 아이디 */}
        <div>
          <label className="block mb-2">아이디</label>
          <input
            name="username"
            type="text"
            required
            minLength="4"
            maxLength="20"
            className="w-full px-3 py-2 border rounded"
            placeholder="4-20자 사이"
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="block mb-2">이메일</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="example@email.com"
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block mb-2">비밀번호</label>
          <input
            name="password"
            type="password"
            required
            minLength="8"
            className="w-full px-3 py-2 border rounded"
            placeholder="최소 8자 이상"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block mb-2">비밀번호 확인</label>
          <input
            name="passwordConfirm"
            type="password"
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="비밀번호를 다시 입력"
          />
        </div>

        {/* 나이 */}
        <div>
          <label className="block mb-2">나이</label>
          <input
            name="age"
            type="number"
            min="1"
            max="120"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* 성별 - 라디오 버튼 */}
        <div>
          <label className="block mb-2">성별</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="male" className="mr-2" />
              남성
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="female" className="mr-2" />
              여성
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="other" className="mr-2" />
              기타
            </label>
          </div>
        </div>

        {/* 취미 - 체크박스 (여러 개 선택) */}
        <div>
          <label className="block mb-2">취미 (여러 개 선택 가능)</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" name="hobby" value="reading" className="mr-2" />
              독서
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="hobby" value="gaming" className="mr-2" />
              게임
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="hobby" value="sports" className="mr-2" />
              운동
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="hobby" value="music" className="mr-2" />
              음악
            </label>
          </div>
        </div>

        {/* 약관 동의 */}
        <div>
          <label className="flex items-center">
            <input type="checkbox" name="terms" required className="mr-2" />
            이용약관에 동의합니다 (필수)
          </label>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
