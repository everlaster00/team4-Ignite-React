//src/test/useToast.js
'use client';

import { useCallback, useState } from "react";

export const useToast = () => {
  const [ toastMsgs , setToastMsgs ] = useState([]);

  const showToast = useCallback( (msg) => {
    if(msg.trim() === '') return;

    const timerKey = setTimeout(() => {
      setToastMsgs( (prev)=> prev.filter( msgs => msgs.key !== timerKey ));
    }, msg.length * 200 + 1500 );
    
    setToastMsgs( (prev) => { 
      let stackCount = 1;
      const newArray = [];
      for (const msgs of prev) {
        if ( msgs.message === msg ){ 
          stackCount = stackCount + msgs.stack;
          clearTimeout(msgs.key);
        } else newArray.push(msgs);
      }

      const newMsg = {
        key: timerKey,
        message: msg,
        stack: stackCount
      };
      return [ ...newArray, newMsg ] 
    });
  },[setToastMsgs])
  
  return { toastMsgs , showToast }
}