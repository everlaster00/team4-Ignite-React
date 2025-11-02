import GalleryCard from "./GalleryCard";
import fs from "fs";
import path from "path";
import MEMBER_INFO from "root/src/components/members/memberInfo";
import showCaseBg from "@/assets/images/showCaseBg.jpg";

// 🐳 (중요!) 서버 컴포넌트 안에서 호출할 폴더 읽기 로직을 함수로 분리
// memberInfo.ts가 있지만, fs를 이용한 내부 파일 읽는 로직의 참고 사례로 남겨둡니다.
function getMemberFolders() {
  // process.cwd()는 프로젝트의 루트 경로(team4-ignite-react)
  const targetDirectory = path.join(process.cwd(), "src/app/products");

  try {
    // 1. fs.readdirSync로 폴더(파일) 목록을 읽기
    const folderNames = fs.readdirSync(targetDirectory);

    const memberFolders = folderNames.filter(
      (name) =>
        !name.startsWith("[") && !name.startsWith("_") && !name.includes(".")
    );

    //fs 로직 유지하려다가 결국, 이런 코드를 추가해야합니다.... 이런식으로 하는게 좋은게 아님 ㅠㅠ
    const newMemberList = memberFolders.map((name) => {
      const { iconUrl } = MEMBER_INFO.find((x) => x.nickName === name);

      return {
        nickName: name,
        iconUrl: iconUrl,
      };
    });

    return newMemberList;
  } catch (error) {
    console.error("폴더를 읽는 데 오류가 발생했습니다!", error);
    return [];
  }
}

export default function ProductsPage() {
  const members = getMemberFolders();

  const backgroundImage = `url(${showCaseBg.src})`;

  const backgroundStyle = {
    backgroundImage: backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return (
    <div
      className="AboutBody flex flex-row justify-center min-h-screen text-gray-800 p-4 md:p-8"
      style={backgroundStyle}
    >
      <div className="AboutContentBox flex flex-col max-w-6xl w-full mx-auto py-12 md:py-20 h-full overflow-y-auto SCROLLHIDDEN backdrop-blur-sm bg-white/20 rounded-2xl p-6 md:p-10 shadow-2xl">
        <header className="text-center mb-15 pt-8">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 mb-4 text-shadow-lg tracking-tighter leading-tight">
            <span className="text-amber-600">IGNITE</span>{" "}
            <br className="sm:hidden" />
            Creators&#x27; Showcase
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full mx-auto">
          {members.map((member) => (
            <GalleryCard
              key={member.nickName}
              icon={member.iconUrl}
              nick={member.nickName}
              index={members.indexOf(member)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
