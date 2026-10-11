"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { hindSiliguri } from "@/fonts";
import { authClient } from "@/lib/auth-client";

export function ProfileUpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = value.trim();
    if (!nextName) {
      toast.error("নাম লিখুন");
      return;
    }

    setPending(true);
    const { error } = await authClient.updateUser({ name: nextName });
    setPending(false);
    if (error) {
      toast.error(error.message ?? "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`${hindSiliguri.className} flex w-full max-w-[448px] flex-col gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6`}
    >
      <label className="flex flex-col gap-1">
        <span className="text-[14px] leading-[21px] font-medium text-[#1d271f]">
          নাম
        </span>
        <input
          name="name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-10 w-full rounded-lg border border-[#1d271f]/20 bg-[#fafcfa] px-[13px] text-[14px] leading-[21px] text-[#1d271f] outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="h-10 w-full rounded-lg border border-[#047f39] bg-[#05893e] text-[14px] leading-[21px] font-semibold text-[#f3fbf4] disabled:opacity-70"
      >
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}
