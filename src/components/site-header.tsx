import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { HeaderAccount } from "@/components/user-menu";
import { env } from "@/lib/env";
import { getAuth } from "@/lib/auth";
import { hindSiliguri } from "@/fonts";

function HeaderShell({
  right,
  wrapDate = false,
}: {
  right?: ReactNode;
  wrapDate?: boolean;
}) {
  return (
    <div
      className={`${hindSiliguri.className} mx-auto flex min-h-[68px] w-full max-w-[1280px] items-center gap-3 px-4 py-3`}
    >
      <Link href="/" className="flex min-w-0 flex-1 items-center gap-2">
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          priority
          className="shrink-0"
        />
        <span className="flex min-w-0 flex-col">
          <span className="text-[20px] leading-7 font-bold text-[#1d271f]">
            বাজার দর
          </span>
          <span className="text-[12px] leading-4 font-normal text-[#1d271f]/60">
            {wrapDate ? (
              <>
                <span className="md:hidden">
                  মঙ্গলবার, ৬ অক্টোবর,
                  <br />
                  ২০২৬
                </span>
                <span className="hidden md:inline">
                  মঙ্গলবার, ৬ অক্টোবর, ২০২৬
                </span>
              </>
            ) : (
              "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
            )}
          </span>
        </span>
      </Link>
      {right}
    </div>
  );
}

export function HeaderFallback() {
  return <HeaderShell wrapDate />;
}

export async function SiteHeader() {
  if (!env("BETTER_AUTH_MONGODB_URL")) {
    return <HeaderShell wrapDate right={<HeaderAccount user={null} />} />;
  }

  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  return (
    <HeaderShell
      wrapDate={!session}
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
