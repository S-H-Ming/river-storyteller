import NickNameModule from "@/components/nickNameModule";
import Image from 'next/image'

export default function Home() {
  return (
    <main className="center">
      <div className="logo">
        <Image
          src="/transparent.png"
          width={500}
          height={500}
          alt="Interface for Care Logo"
          
        />
      </div>
      <h1>Tsen-wen River StoryTeller</h1>
      <NickNameModule />
    </main>
  );
}
