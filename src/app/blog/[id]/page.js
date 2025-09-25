export default function BlogPost({ params }) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        블로그 글 번호 : {params.id}
      </h1>
      <p className="text-lg text-gray-600">
        지금 보고계신 글의 ID는 {params.id}입니다.
      </p>
    </div>
  );
}