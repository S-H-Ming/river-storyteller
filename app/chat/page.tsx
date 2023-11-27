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
            Hi {name}, <br></br> 我是曾文溪故事的說書人. 我有需多關於曾文溪的故事，問我任何有關曾文溪的任何問題，我都會儘量為您解答！如果您講到任何跟 &#39;石頭&#39; 有關的事情，我的朋友石頭也會現身說法。
          </h3>
        </div>
        <ChatComponent nickname={name} />
      </div>
    </main>
  );
}
