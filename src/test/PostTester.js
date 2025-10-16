'use client'; 

import { useState, useEffect } from 'react';
import { createPost, deleteLatestPost, getPosts } from './serverActions'; 
import LoadingSpinner from './LoadingSpinner';


export default function PostTester() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 목록 불러오는 함수
  async function fetchPosts() {
    setLoading(true);
    const postList = await getPosts(); 
    setPosts(postList);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    await createPost();
    await fetchPosts();
  };

  const handleDelete = async () => {
    await deleteLatestPost();
    await fetchPosts();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className='bg-gray-400/50 shadow-md border-2 rounded-md px-2 space-y-1'>
        <h1 className='m-1 text-3xl text-center font-bold'>Prisma DB 테스트 </h1>
        <div className='flex justify-around'>
          <button onClick={handleCreate} className='w-1/3 h-10 text-white shadow-md border-1 mb-2 border-gray-500 rounded-lg bg-emerald-400/70'>
            ➕ Post 생성
          </button>
          <button onClick={handleDelete} className='w-1/3 h-10 text-white shadow-md border-1 mb-2 border-gray-500 rounded-lg bg-red-400/70'>
            ➖ 최신 Post 삭제
          </button>
        </div>
      </div>

      <div className='Result-field border-1 rounded-md bg-gray-300/50'>
        <h2 className='border-1 p-2 text-lg tran'>Post 목록 ({posts.length}개)</h2>
        {loading ? (
          <>
            <div className='Spacer mt-4' />
            <LoadingSpinner />
            <p className='text-center'>로딩중...</p>
          </>
        ) : (
          <ul className='pl-2 space-y-1'>
            {posts.map((post) => (
              <li key={post.id}>
                **ID:** {post.id.substring(0, 8)}... **Title:** {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}