import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SplashVideo from './components/SplashVideo'; // <-- 여기에 SplashVideo를 추가한다!
import './App.css';

// 임시로 Home 컴포넌트를 만들자!
const Home = () => <div>홈 화면이다!</div>;
// 임시로 About 컴포넌트를 만들자!
const About = () => <div>소개 화면이다!</div>;

function App() {
  const [showVideo, setShowVideo] = useState(true);

  return (
    // showVideo가 true일 때만 SplashVideo 컴포넌트를 보여준다!
    showVideo ? (
      <SplashVideo onVideoEnd={() => setShowVideo(false)} />
    ) : (
      <Routes>
        {/* path="/"가 부모 라우트다. */}
        <Route path="/" element={<Layout />}>
          {/* 자식 라우트들은 부모 라우트 안에 들어간다. */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    )
  );
}

export default App;