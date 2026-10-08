import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { hindSiliguri } from "@/fonts";

function HeaderShell({ right }: { right?: ReactNode }) {
  return (
    <div
      className={`${hindSiliguri.className} mx-auto flex h-[68px] w-[1164px] items-center gap-3 px-4 py-3`}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="" width={40} height={40} priority />
        <span className="flex flex-col">
          <span className="text-[20px] leading-7 font-bold text-[#1d271f]">
            বাজার দর
          </span>
          <span className="text-[12px] leading-4 font-normal text-[#1d271f]/60">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
        </span>
      </Link>
      <div className="flex-1" />
      {right}
    </div>
  );
}

function LoggedOutActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="inline-flex h-10 w-[90px] items-center justify-center rounded-lg border border-transparent text-[14px] leading-[21px] font-semibold text-[#1d271f]"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="inline-flex h-10 w-[92px] items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}

function LoggedInActions({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {
  const label = name.split(" ")[0] || name;

  return (
    <div className="inline-flex h-10 items-center gap-2 rounded-lg pr-2 pl-1">
      {image ? (
        <img
          src={image}
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-[11px] object-cover"
        />
      ) : (
        <span className="inline-flex size-9 items-center justify-center rounded-[11px] bg-[#05893e] text-[14px] font-medium text-[#f3fbf4]">
          {label.slice(0, 1)}
        </span>
      )}
      <span className="text-[14px] leading-5 font-medium text-[#1d271f]">
        {label}
      </span>
      <span className="text-[12px] leading-4 font-semibold text-[#1d271f]">
        ▾
      </span>
    </div>
  );
}

export function HeaderFallback() {
  return <HeaderShell />;
}

export async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <HeaderShell right={<LoggedOutActions />} />;
  }

  return (
    <HeaderShell
      right={
        <LoggedInActions
          name={session.user.name}
          image={session.user.image}
        />
      }
    />
  );
}
