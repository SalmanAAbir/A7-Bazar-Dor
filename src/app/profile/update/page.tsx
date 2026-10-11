import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProfileUpdateForm } from "@/components/profile-update-form";
import { hindSiliguri } from "@/fonts";
import { getAuth } from "@/lib/auth";
import { env } from "@/lib/env";

async function UpdateBody() {
  if (!env("BETTER_AUTH_MONGODB_URL")) {
    redirect("/sign-in?reason=protected&next=/profile/update");
  }

  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?reason=protected&next=/profile/update");
  }

  return (
    <div className={`${hindSiliguri.className} flex flex-col items-start gap-4`}>
      <div>
        <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
          তথ্য আপডেট
        </h1>
        <p className="mt-1 text-[14px] leading-5 text-[#1d271f]/70">
          আপনার নাম বদলান
        </p>
      </div>
      <ProfileUpdateForm name={session.user.name} />
    </div>
  );
}

export default function ProfileUpdatePage() {
  return (
    <div className="px-4 py-6">
      <Suspense
        fallback={<div className="h-48 w-full max-w-[448px] animate-pulse rounded-2xl bg-[#fafcfa]" />}
      >
        <UpdateBody />
      </Suspense>
    </div>
  );
}
