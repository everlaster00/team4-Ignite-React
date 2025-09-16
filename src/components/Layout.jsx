// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>헤더 영역</header>
      <main>
        {/* 자식 라우트가 여기에서 렌더링 된다! */}
        <Outlet />
      </main>
      <footer>푸터 영역</footer>
    </div>
  );
}

export default Layout;