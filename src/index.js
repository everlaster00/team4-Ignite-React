import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App';
import AIContentPlanner from './components/AIContentPlanner';
// import PromptDetail from './components/PromptDetail'; // For future use
import reportWebVitals from './reportWebVitals';

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
      // {
      //   path: "prompts/:promptId", // 예: /prompts/123
      //   element: <PromptDetail />,
      // },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();