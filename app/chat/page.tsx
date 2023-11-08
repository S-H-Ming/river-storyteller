"use client";

import { useSearchParams } from "next/navigation";
import ChatComponent from "@/components/chatComponent";

export default function Chat() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || '';
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-white w-full rounded-md text-grey-900 p-5">
        <h3 className="mb-5">
          Hello {name}, <br></br> This is Tsen-wen StoryTeller
        </h3>
        {/* <div className="mb-5">Hello there, this is Tsen-wen StoryTeller</div> */}
        <ChatComponent nickname={name}/>
      </div>
    </main>
  );
}
