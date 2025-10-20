import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProductPost({ params }) {
  const currentNickname = params.nickname.toLowerCase();
  const redirectClass = ` p-2 rounded-md hover:pointer hover:text-blue-500/90`

  switch (currentNickname) {
    case 'everlaster':
      redirect('/products/Everlaster');
      break;

    default:
      break;
  } 

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1 className="text-2xl md:text-4xl font-bold my-8 md:my-20">존재하지 않는 사용자 페이지입니다.</h1>
      <button className="flex rounded-lg justify-center items-center text-lg md:text-2xl p-6 md:px-10 md:py-7 font-bold bg-blue-200/50 border-1 h-10">
        <Link href="/products" className={redirectClass}>갤러리로 가기</Link>
      </button>
    </div>
  );
}
