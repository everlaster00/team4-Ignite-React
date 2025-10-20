export async function generateMetadata() {
  return {
    title: `Everlaster님의 갤러리`,
    description: `Everlaster님의 갤러리입니다.`,
  };
}

export default function EverlasterHome({ params }) {

  
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Everlaster&#x27;s</h1>
      <p className="text-lg text-gray-600">Everlaster님의 갤러리입니다.</p>
    </div>
  );
}