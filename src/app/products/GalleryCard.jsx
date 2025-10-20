import Link from "next/link";

export default function GalleryCard() {
  const redirectClass = "link-btn rounded-md bg-gradient-to-br from-cyan-100 to-cyan-900 text-white text-shadow-md text-shadow-black/70 shadow-md hover:cursor-pointer py-2 px-6";
  return (
    <div className="GalleriesCard flex flex-col items-center p-6 border border-gray-300 rounded-lg shadow-md space-y-4 w-8/9 md:w-3/4 mx-auto">
      <h4 className="EverlasterShowcase text-lg font-semibold ">Everlaster(김정민)님의 갤러리입니다.</h4>
      <button className={redirectClass}><Link href="/products/Everlaster">갤러리로 가기</Link></button>
    </div>
  );
}