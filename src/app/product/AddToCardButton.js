'use client';

import { useState } from 'react';

export default function AddToCardButton({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    console.log(`상품 ${productId}를 ${quantity}개 장바구니에 추가`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="border px-3 py-1 rounded"
        >
          -
        </button>
        <span className="w-12 text-center">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="border px-3 py-1 rounded">
          +
        </button>
      </div>

      <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-2 rounded">
        장바구니 담기
      </button>

      {added && <span className="text-green-600">장바구니에 추가되었습니다.</span>}
    </div>
  );
}
