// "use client"

import { useSearchParams } from "next/navigation";
import ChatComponent from "@/components/chatComponent";
export default function Chat() {
    // const searchParams = useSearchParams();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-white w-full rounded-md text-grey-900 p-5">
        {/* <div className="mb-5">Hello {searchParams.get('name')}, this is Tsen-wen StoryTeller (powered by GPT-4)</div> */}
        <div className="mb-5">Hello there, this is Tsen-wen StoryTeller</div>
        <ChatComponent/>
      </div>
      
    </main>
  )
}
