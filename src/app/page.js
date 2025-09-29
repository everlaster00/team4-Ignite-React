import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-fuchsia-300 text-5xl">Day35 수업자료</h1>
        <h2 className="text-cyan-400 text-4xl">데이터베이스 연동 & 인증</h2>
      </section>
    </div>
  );
}
