//src/test/TestToast.jsx
'use client';
import { useState , useRef } from 'react';

export default function TestToast() {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);


  const handleAction = () => {     
    if (inputValue.trim() !== '' && typeof window !== 'undefined' && window.showToast) {
      window.showToast(inputValue); //클라이언트에서 사용하는 토스트 코드는 이걸로 충분.임포트도 필요없음.
    }
      setInputValue('');
  };
  
  function handleKeyPress (e) {
    if ( !timeoutRef.current && e.key === "Enter") {
      if (e.nativeEvent.isComposing) {
      return;
    }
      e.preventDefault();
      handleAction();
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 100);
    }
  };
  
  const handleShowToast = () => {
      handleAction();
  };

  return (
    <div className="ToastTesterBody flex flex-row justify-center items-center mx-auto my-1 space-x-2">
      <input className="border-1 w-1/3 mx-auto px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e)=> {setInputValue(e.target.value)}}
        onKeyDown={handleKeyPress}
        placeholder="토스트 메시지 입력"
        autoFocus
      />
      <button
        className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-green-500/80"
        onClick={handleShowToast}>
        토스트 실험
      </button>
    </div>
  )
}
