//src/test/TestToast.jsx
'use client';
import { useState , useRef } from 'react';

export default function TestToast() {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef(null);
  console.log('testToast 임포트 완료');

  const handleAction = () => {     
    if (inputValue.trim() !== '') 
      globalThis.showToast(inputValue);//토스트 코드는 이걸로 충분.임포트도 필요없음.
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
