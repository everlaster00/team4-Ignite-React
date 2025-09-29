// app/profile/page.js
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  // 사용자의 상세 정보와 작성한 글들 가져오기
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) {
    return <div>사용자를 찾을 수 없습니다</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold">내 프로필</h1>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">기본 정보</h2>
              <div className="bg-gray-50 rounded p-4">
                <p className="mb-2">
                  <span className="font-medium">이름:</span> {user.name || "설정되지 않음"}
                </p>
                <p className="mb-2">
                  <span className="font-medium">이메일:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">가입일:</span> {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">
                내가 작성한 글 ({user.posts.length}개)
              </h2>

              {user.posts.length === 0 ? (
                <p className="text-gray-500">아직 작성한 글이 없습니다.</p>
              ) : (
                <div className="space-y-3">
                  {user.posts.map((post) => (
                    <div key={post.id} className="border rounded p-4 hover:bg-gray-50">
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {post.content.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        작성일: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
