export default function BlogPost({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">상품 이름 : {params.name}</h1>
      <p className="text-lg text-gray-600">지금 보고계신 상품의 이름는 {params.name}입니다.</p>
    </div>
  );
}
