import GalleryCard from "./GalleryCard";

export default function products() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">갤러리 페이지</h1>
      <p className="text-lg text-gray-600 mb-10">팀원들의 최근 작품,또는 대표 작품들을 한눈에 뿌려주는 페이지입니다.</p>
      <GalleryCard />
    </div>
  );
}
