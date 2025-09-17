import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; // Global styles
import App from './App.jsx'; // Our main App component (now a layout)
import HomePageLayout from './components/HomePageLayout.js'; // The new homepage
import PromptRegistrationPage from './components/PromptRegistrationPage.js'; // Prompt Registration page
import MyPage from './components/MyPage.js'; // My Page
import CommunityPage from './components/CommunityPage.js'; // Community Page
import GuidePage from './components/GuidePage.js'; // Guide Page

// 라우터 설정: URL 경로와 컴포넌트를 매핑합니다.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App 컴포넌트가 기본 레이아웃 역할을 합니다.
    children: [
      {
        index: true, // 기본 경로 (path: '/')일 때 보여줄 컴포넌트
        element: <HomePageLayout />,
      },
      {
        path: "register-prompt", // 예: /register-prompt
        element: <PromptRegistrationPage />,
      },
      {
        path: "my-page", // 예: /my-page
        element: <MyPage />,
      },
      {
        path: "community", // 예: /community
        element: <CommunityPage />,
      },
      {
        path: "guide", // 예: /guide
        element: <GuidePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);