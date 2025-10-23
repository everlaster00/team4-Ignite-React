//src/test/Toast.jsx
'use client';
import { useEffect } from 'react';
import { useToast } from './useToast'

export default function Toast() {
  const { toastMsgs , showToast } = useToast();

  useEffect (() => {
    try{
      if (!window.showToast) window.showToast = showToast;
    } catch(error) {
      console.log("토스트 생성에 실패했습니다.",error);
    }

    return () => delete window.showToast
  },[showToast])
  
  const isShow = toastMsgs.length !== 0;
  
  return (
    <div className={`ToastBody ${isShow? 'fixed left-1/3 top-3' : 'hidden'} flex flex-col p-1 rounded-md bg-red-800/75 z-100 pointer-events-none`}>
      { toastMsgs.map( (msg) => ( 
        <p key={msg.key} className='ToastMsg  text-amber-50 text-shadow-md text-shadow-amber-800 px-2 py-1 rounded-md border-1 border-amber-950'>
          <>{msg.stack>1 && <span className='text-lime-300'>{`[${msg.stack}]`}</span>}
          {msg.message}</>
        </p>
      ))}
    </div>
  )
};