'use client'; //test

import { useState, useEffect } from 'react';
import { createPost, deleteLatestPost, getPosts } from './serverActions'; 
import LoadingSpinner from './LoadingSpinner';

// ✨ 6개의 DB 목록 정의!
const DB_OPTIONS = [
  { value: 'Main', label: 'Main DB (Post)' },
  { value: 'KM', label: 'KM DB (KM_Post)' },
  { value: 'JH', label: 'JH DB (JH_Post)' },
  { value: 'JW', label: 'JW DB (JW_Post)' },
  { value: 'PJH', label: 'PJH DB (PJH_Post)' },
  { value: 'NC', label: 'NC DB (NC_Post)' },
];

export default function PostTester() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // ✨ 선택된 DB 상태 추가! 기본은 'Main'.
  const [selectedDB, setSelectedDB] = useState(DB_OPTIONS[0].value); 

  // 목록 불러오는 함수
  // ✨ DB 이름을 인수로 받도록 수정!
  async function fetchPosts(dbName) { 
    setLoading(true);
    // ✨ 선택된 DB를 서버 액션에 넘김
    //    DB_OPTIONS[0].value가 undefined일 경우, 초기값인 Main을 사용한다.
    const db = dbName || DB_OPTIONS[0].value; 
    const postList = await getPosts(db); 
    
    setPosts(postList);
    setLoading(false);
  }

  // 컴포넌트 마운트 및 selectedDB가 바뀔 때마다 실행!
  useEffect(() => {
    // ✨ selectedDB가 바뀔 때마다 fetchPosts를 호출해서 목록을 다시 읽는다!
    fetchPosts(selectedDB);
  }, [selectedDB]); 

  const handleCreate = async () => {
    // ✨ 현재 선택된 DB를 서버 액션에 넘긴다!
    await createPost(selectedDB);
    await fetchPosts(selectedDB); // 성공 후 다시 불러온다!
  };

  const handleDelete = async () => {
    // ✨ 현재 선택된 DB를 서버 액션에 넘긴다!
    await deleteLatestPost(selectedDB);
    await fetchPosts(selectedDB); // 성공 후 다시 불러온다!
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className='bg-gray-400/50 shadow-md border-2 rounded-md px-2 space-y-1'>
        <h1 className='m-1 text-3xl text-center font-bold'>Prisma DB 테스트 </h1>
        
        {/* --- ✨ 서버 선택 드롭다운 메뉴 --- */}
        <div className='flex justify-center mb-2 p-1'>
            <label htmlFor="db-select" className="text-lg font-semibold mr-3">적용 DB:</label>
            <select
                id="db-select"
                value={selectedDB}
                onChange={(e) => setSelectedDB(e.target.value)} // ✨ DB 선택 시 상태 업데이트!
                className="p-1 border border-gray-500 rounded-md shadow-sm bg-white"
            >
                {DB_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        {/* --------------------------------- */}

        <div className='flex justify-around'>
          <button onClick={handleCreate} className='w-1/3 h-10 text-white shadow-md border-1 mb-2 border-gray-500 rounded-lg bg-emerald-400/70'>
            ➕ Post 생성 (DB: {selectedDB})
          </button>
          <button onClick={handleDelete} className='w-1/3 h-10 text-white shadow-md border-1 mb-2 border-gray-500 rounded-lg bg-red-400/70'>
            ➖ 최신 Post 삭제 (DB: {selectedDB})
          </button>
        </div>
      </div>

      <div className='Result-field border-1 rounded-md bg-gray-300/50 mt-4'>
        <h2 className='border-1 p-2 text-lg tran'>Post 목록 ({posts.length}개) - 현재 DB: {selectedDB}</h2>
        {loading ? (
          <>
            <div className='Spacer mt-4' />
            <LoadingSpinner />
            <p className='text-center'>로딩중...</p>
          </>
        ) : (
          <ul className='pl-2 space-y-1'>
            {posts.map((post) => (
              // 모든 Post 모델이 id와 title을 가지고 있다고 가정!
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