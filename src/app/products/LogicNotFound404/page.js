export async function generateMetadata() {
  return {
    title: `LogicNotFound404님의 갤러리`,
    description: `LogicNotFound404님의 갤러리입니다.`,
  };
}

export default function LogicNotFound404Home({ params }) {

  
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">LogicNotFound404&#x27;s</h1>
      <p className="text-lg text-gray-600">LogicNotFound404님의 갤러리입니다.</p>
    </div>
  );
}