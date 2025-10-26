//src/components/ClientWrapper.jsx
'use client'; // ⬅️ 클라이언트 컴포넌트 선언

import dynamic from 'next/dynamic';

// Dynamic Import 로직을 클라이언트 컴포넌트 내부로 이동
const DynamicSocketInitializer = dynamic(
  () => import('@/lib/socket_io/SocketInitializer'),
  { ssr: false }
);

// 이 컴포넌트는 클라이언트에서 실행됩니다.
export default function ClientWrapper() {
  return <DynamicSocketInitializer />;
}