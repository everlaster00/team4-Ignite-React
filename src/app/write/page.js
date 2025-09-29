// app/write/page.js
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, authorEmail })
      })

      if (response.ok) {
        // 성공하면 블로그 목록으로 이동
        router.push("/blog")
      }
    } catch (error) {
      alert("글 작성에 실패했습니다")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            작성자 이메일 *
          </label>
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="가입한 이메일을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            제목 *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="글 제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            내용 *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="10"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="글 내용을 입력하세요"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "작성 중..." : "글 발행하기"}
        </button>
      </form>
    </div>
  )
}
