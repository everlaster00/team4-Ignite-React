import PostTester from '@/test/db_tester/PostTester';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">홈 페이지</h1>
      <p className="text-lg text-gray-600">이 페이지의 주소는 / 입니다.</p>

      <div className='TestPrisma'>
        <PostTester />
      </div>
    </div>
  );
}
