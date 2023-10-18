"use client"

import Link from "next/link";
import { useState } from "react"

export default function nickNameModule() {

  const [nickName, setNickName] = useState('');

  return (
    <>
    <h2>This is a simple data passing nickNameModule</h2>
    <label> Nickname:
        <input
            required
            type="text"
            onChange={(e)=>setNickName(e.target.value)}
            value={nickName}
        />
            
    </label>
    <Link href={{pathname: '/chat', query: {name: nickName}}}>Go to Chat</Link>
    </>
  )
}
