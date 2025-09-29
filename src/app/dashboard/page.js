// app/dashboard/page.js
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardPage() {
  // 서버에서 세션 정보 가져오기
  const session = await getServerSession()

  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6">
              안녕하세요, {session.user?.email}님!
            </h1>

            <p className="text-gray-600 mb-8">
              이 페이지는 로그인한 사용자만 볼 수 있습니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/write"
                className="block p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
              >
                <h2 className="text-xl font-semibold mb-2">글 작성하기</h2>
                <p className="text-gray-600">새로운 블로그 글을 작성해보세요</p>
              </Link>

              <Link
                href="/blog"
                className="block p-6 bg-green-100 rounded-lg hover:bg-green-200 transition"
              >
                <h2 className="text-xl font-semibold mb-2">블로그 보기</h2>
                <p className="text-gray-600">작성된 글들을 확인해보세요</p>
              </Link>

              <Link
                href="/profile"
                className="block p-6 bg-purple-100 rounded-lg hover:bg-purple-200 transition"
              >
                <h2 className="text-xl font-semibold mb-2">내 프로필</h2>
                <p className="text-gray-600">프로필 정보를 관리하세요</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
