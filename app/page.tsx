import NickNameModule from "@/components/nickNameModule";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

async function getTsenwenRiverStatus(contract: string | string[] | undefined) {

  const res = await fetch(
    `https://rivercare.plurality.moda.gov.tw/api/rivers/${contract}`
  );

  return res.json();
}

const TsenwenRiver = {
  status: false,
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const data = await getTsenwenRiverStatus(searchParams?.riverContract);
  // update TsenwenRiver status
  // console.log({data});
  TsenwenRiver.status = data.status == 1 ? true : false;
  // console.log(TsenwenRiver.status);

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
      {TsenwenRiver.status ? <NickNameModule contract={searchParams?.riverContract}/> : <p>the river is offline</p>}
    </main>
  );
}
