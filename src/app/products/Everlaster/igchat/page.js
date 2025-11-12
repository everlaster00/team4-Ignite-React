'use client'; 
import CornerFloatingNav from '@@/members/CornerFloatingNav';
import React from 'react';

export default function IgChatImporter(){
  const externalUrl = "https://igchat-56445.web.app/";

  const products = [
    { title:"이거 나이뜨 한 계산기", url:"/products/Everlaster/"},
    { title:"이거 나이뜨 한 채팅방(미완)",url:"/products/Everlaster/igchat"}
  ];
      
  return (

    <div className="IgchatBody w-screen h-screen bg-black">
      <CornerFloatingNav index={0} projectLinks={products}/>
      <iframe
        src={externalUrl}
        title="이그나이트 팀 채팅방(미완성)"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    </div>
  )
}