import React from 'react';
import './PromptCard.css';

function PromptCard({ imageUrl, title, description, price, altText }) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <img src={imageUrl} alt={altText} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold">{price}</span>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm font-medium">구매하기</button>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;
