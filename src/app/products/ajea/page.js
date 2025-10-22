export async function generateMetadata() {
  return {
    title: `ajea님의 갤러리`,
    description: `ajea님의 갤러리입니다.`,
  };
}

export default function ajeaHome({ params }) {

  
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">ajea&#x27;s</h1>
      <p className="text-lg text-gray-600">ajea님의 갤러리입니다.</p>
    </div>
  );
}