import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { HeaderAccount } from "@/components/user-menu";
import { auth } from "@/lib/auth";
import { hindSiliguri } from "@/fonts";

function HeaderShell({ right }: { right?: ReactNode }) {
  return (
    <div
      className={`${hindSiliguri.className} mx-auto flex h-[68px] w-full max-w-[1280px] items-center gap-3 px-4 py-3`}
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

export function HeaderFallback() {
  return <HeaderShell />;
}

export async function SiteHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <HeaderShell
      right={
        <HeaderAccount
          user={
            session
              ? {
                  name: session.user.name,
                  email: session.user.email,
                  image: session.user.image,
                }
              : null
          }
        />
      }
    />
  );
}
