"use client";

import { useSearchParams } from "next/navigation";
import ChatComponent from "@/components/chatComponent";

export default function Chat() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-[#f3faf9] w-full rounded-md text-grey-900 p-5">
        <div className="sticky top-0 bg-[#f3faf9] py-2">
          <h3 className="mb-5">
            Hello {name}, <br></br> This is Tsen-wen StoryTeller. I am an expert
            on the story of the river. You can ask me anything! Or if you mention
            the word &#39;rock&#39;, my friend will appear and share its
            perspective as well.
          </h3>
        </div>
        <ChatComponent nickname={name} />
      </div>
    </main>
  );
}
