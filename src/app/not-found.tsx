import type { Metadata } from "next";
import Link from "next/link";
import { hindSiliguri } from "@/fonts";

export const metadata: Metadata = {
  title: "পাতাটি পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <div
      className={`${hindSiliguri.className} flex flex-col items-start gap-4 px-4 py-16`}
    >
      <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
        পাতাটি পাওয়া যায়নি
      </h1>
      <p className="text-[16px] leading-6 text-[#1d271f]/70">
        আপনি যে পাতাটি খুঁজছেন সেটি নেই।
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded-lg border border-[#047f39] bg-[#05893e] px-[17px] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
