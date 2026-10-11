"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { hindSiliguri } from "@/fonts";
import { authClient } from "@/lib/auth-client";

function SignOutIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none">
      <path
        d="M6.5 3.5H4.2A1.2 1.2 0 0 0 3 4.7v6.6a1.2 1.2 0 0 0 1.2 1.2h2.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 8h6M10.5 5.5 13 8l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProfilePanel({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image?: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [pending, setPending] = useState(false);

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message ?? "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

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
    router.refresh();
  }

  return (
    <div
      className={`${hindSiliguri.className} mx-auto flex w-full max-w-[720px] flex-col gap-4`}
    >
      <div>
        <h1 className="text-[20px] leading-7 font-bold text-[#1d271f]">
          আমার প্রোফাইল
        </h1>
        <p className="text-[14px] leading-5 text-[#1d271f]/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:flex-row sm:items-center">
        {image ? (
          <img
            src={image}
            alt=""
            width={56}
            height={56}
            referrerPolicy="no-referrer"
            className="size-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-[#05893e] text-[20px] font-semibold text-[#f3fbf4]">
            {name.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[16px] leading-6 font-semibold text-[#1d271f]">
            {name}
          </p>
          <p className="text-[14px] leading-5 text-[#1d271f]/60">{email}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            void signOut();
          }}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 self-start rounded-lg border border-[#e72c35] px-3 text-[14px] leading-5 font-medium text-[#e72c35] sm:self-center"
        >
          <SignOutIcon />
          সাইন আউট
        </button>
      </section>

      <section className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
        <h2 className="text-[16px] leading-6 font-bold text-[#1d271f]">তথ্য</h2>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[14px] leading-5 text-[#1d271f]">নাম</span>
            <input
              name="name"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-[14px] leading-5 text-[#1d271f] outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="h-11 w-full rounded-lg border border-[#047f39] bg-[#05893e] text-[14px] leading-5 font-semibold text-[#f3fbf4] disabled:opacity-70"
          >
            আপডেট
          </button>
        </form>
      </section>
    </div>
  );
}
