export async function generateMetadata() {
  return {
    title: `nicecoco님의 갤러리`,
    description: `nicecoco님의 갤러리입니다.`,
  };
}

export default function nicecocoHome({ params }) {

  
  
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">nicecoco&#x27;s</h1>
      <p className="text-lg text-gray-600">nicecoco님의 갤러리입니다.</p>
    </div>
  );
}