import Image from "next/image";
import Link from "next/link";
import { hindSiliguri } from "@/fonts";

export function LoggedOutHeader() {
  return (
    <div
      className={`${hindSiliguri.className} mx-auto flex h-[68px] w-[1164px] items-center gap-3 px-4 py-3`}
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="" width={40} height={40} priority />
        <div className="flex flex-col">
          <span className="text-[20px] leading-7 font-bold text-[#1d271f]">
            বাজার দর
          </span>
          <span className="text-[12px] leading-4 font-normal text-[#1d271f]/60">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
        </div>
      </div>
      <div className="flex-1" />
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
    </div>
  );
}
