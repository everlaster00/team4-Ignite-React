// app/blog/page.js
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function BlogPage() {
  // 서버에서 직접 데이터 가져오기
  const posts = await prisma.post.findMany({
    include: {
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">블로그</h1>
        <Link
          href="/write"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          새 글 작성
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          아직 작성된 글이 없습니다.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {post.content.substring(0, 150)}
                {post.content.length > 150 && "..."}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  작성자: {post.author.name || post.author.email}
                </span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
