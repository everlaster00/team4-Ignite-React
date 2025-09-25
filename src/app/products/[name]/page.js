export async function generateMetadata({ params }) {
  const productName = params.name

  return {
    title: `${productName} 제품 상세 페이지`,
    description: `${productName} 제품 정보 페이지입니다.`,
  };
}

export default function ProductPost({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">상품 이름 : {params.name}</h1>
      <p className="text-lg text-gray-600">지금 보고계신 상품의 이름은 {params.name}입니다.</p>
    </div>
  );
}
