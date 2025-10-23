import GalleryCard from "./GalleryCard";
import fs from 'fs';
import path from 'path';
import ServerToast from "@/test/ServerToast";

// 🐳 (중요!) 서버 컴포넌트 안에서 호출할 폴더 읽기 로직을 함수로 분리해줭!
function getMemberFolders() {
  
  // process.cwd()는 프로젝트의 루트 경로(team4-ignite-react)를 말한데이!
  const targetDirectory = path.join(process.cwd(), 'src/app/products'); 

  try {
    // 1. fs.readdirSync로 폴더(파일) 목록을 읽기
    const folderNames = fs.readdirSync(targetDirectory);
    
    const memberFolders = folderNames.filter(name => 
      !name.startsWith('[') && !name.startsWith('_') && !name.includes('.')
    );

    return memberFolders; 
  } catch (error) {
    console.error('폴더를 읽는 데 오류가 발생했습니다!', error);
    return [];
  }
}


export default function products() {

  const members = getMemberFolders();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">갤러리 페이지</h1>
      <p className="text-lg text-gray-600 mb-10">팀원들의 최근 작품,또는 대표 작품들을 한눈에 뿌려주는 페이지입니다.</p>
      <ServerToast msg='서버에서 토스트 사용하는 예제 메시지입니다' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((memberId) => (
          <GalleryCard key={memberId} nick={memberId} />
        ))}
      </div>
    </div>
  );
}
