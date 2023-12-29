"use client";

import Link from "next/link";
import { useState } from "react";

export default function useNickNameModule({contract}: {contract: string | string[] | undefined}) {
  const [nickName, setNickName] = useState("");

  return (
    <>
      <p className="text-3xl max-w-2xl mx-auto">
        Welcome to the Tsen-wen River StoryTeller! You will be able to interact
        with the essence of the river and learn more about it.
      </p>
      <p className="text-lg">To get started add your nickname first</p>

      <label>
        {" "}
        Your Nickname{" "}
        <p>
          <input
            required
            type="text"
            onChange={(e) => setNickName(e.target.value)}
            value={nickName}
          />
        </p>
      </label>

      <Link href={{ pathname: "/chat", query: { name: nickName, riverContract: contract} }}>
        <button disabled={!nickName} className="btn-primary rounded-full p-4">
          Let&apos;s Go
        </button>
      </Link>
    </>
  );
}
