"use client"

import { useSearchParams } from "next/navigation";

export default function Chat() {
    const searchParams = useSearchParams();
  return (
    <div>Hello {searchParams.get('name')}</div>
  )
}
