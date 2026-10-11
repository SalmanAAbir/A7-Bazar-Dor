import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { hindSiliguri } from "@/fonts";
import { getAuth } from "@/lib/auth";
import { env } from "@/lib/env";

async function ProfileBody() {
  if (!env("BETTER_AUTH_MONGODB_URL")) {
    redirect("/sign-in?reason=protected&next=/profile");
  }

  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?reason=protected&next=/profile");
  }

  return (
    <div className={`${hindSiliguri.className} flex flex-col items-start gap-4`}>
      <div>
        <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-[14px] leading-5 text-[#1d271f]/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>
      </div>
      <div className="w-full max-w-[448px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
        <p className="text-[12px] leading-4 text-[#1d271f]/60">নাম</p>
        <p className="text-[16px] leading-6 font-semibold text-[#1d271f]">
          {session.user.name}
        </p>
        <p className="mt-4 text-[12px] leading-4 text-[#1d271f]/60">ইমেইল</p>
        <p className="text-[16px] leading-6 font-semibold text-[#1d271f]">
          {session.user.email}
        </p>
      </div>
      <Link
        href="/profile/update"
        className="inline-flex h-10 items-center rounded-lg border border-[#047f39] bg-[#05893e] px-[17px] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
      >
        আপডেট
      </Link>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="px-4 py-6">
      <Suspense
        fallback={<div className="h-48 w-full max-w-[448px] animate-pulse rounded-2xl bg-[#fafcfa]" />}
      >
        <ProfileBody />
      </Suspense>
    </div>
  );
}
