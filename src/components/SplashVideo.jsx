// src/components/SplashVideo.jsx 파일

import splashVideo from '../assets/splash-video.mp4'; 

const SplashVideo = ({ onVideoEnd }) => {
  return (
    // 'flex items-center justify-center'를 없애고 'relative'만 남긴다!
    <div className="relative w-full h-screen bg-black">
      <video
        className="w-full h-full object-cover"
        src={splashVideo}
        autoPlay
        muted
        onEnded={onVideoEnd}
      />
      {/* 'absolute'와 'bottom-4', 'right-4'로 위치를 고정한다! */}
      <button
        onClick={onVideoEnd}
        className="absolute bottom-4 right-4 px-4 py-2 text-sm rounded-md text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-75 transition-all"
      >
        SKIP
      </button>
    </div>
  );
};

export default SplashVideo;