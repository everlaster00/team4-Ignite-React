export async function generateMetadata() {
  return {
    title: `luke님의 갤러리`,
    description: `luke님의 갤러리입니다.`,
  };
}

export default function lukeHome({ params }) {

  
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">luke&#x27;s</h1>
      <p className="text-lg text-gray-600">luke님의 갤러리입니다.</p>
    </div>
  );
}