"use client";

import Link from "next/link";
import { useState } from "react";

export default function useNickNameModule() {
  const [nickName, setNickName] = useState("");

  return (
    <>
      <p>Welcome to River StoryTeller!</p>
      <p>To get started, please enter your nickname.</p>

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

      <Link href={{ pathname: "/chat", query: { name: nickName } }}>
        <button disabled={!nickName} className="btn-primary">
          Let&apos;s Go
        </button>
      </Link>
    </>
  );
}
