import AddToCardButton from './AddToCardButton';

async function getProduct() {
  return {
    id: 1,
    name: '노트북',
    price: 1000000,
    description: '최신 사양의 노트북입니다.',
    stock: 10,
  };
}

export default async function ProductPage() {
  const product = await getProduct();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-2xl text-blue-600 mb-4">{product.price.toLocaleString()}원</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <p className="text-sm text-gray-700 mb-6">재고: {product.stock}개</p>

      <AddToCardButton productId={product.id} />
    </div>
  );
}
