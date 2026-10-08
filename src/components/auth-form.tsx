import Link from "next/link";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { hindSiliguri } from "@/fonts";

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="#1d271f"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 4.77c.68 0 1.36.09 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function Field({
  label,
  type,
  placeholder,
  name,
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[14px] leading-[21px] font-medium text-[#1d271f]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#1d271f]/20 bg-[#fafcfa] px-[13px] text-[14px] leading-[21px] text-[#1d271f] outline-none placeholder:text-[#1d271f]/50"
      />
    </label>
  );
}

function SocialRow() {
  return (
    <div className="flex gap-2">
      <GoogleSignInButton />
      <button
        type="button"
        className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-4 text-[14px] leading-[21px] font-semibold text-[#1d271f]"
      >
        <GitHubIcon />
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}

export function SignInForm() {
  return (
    <div
      className={`${hindSiliguri.className} flex w-full justify-center`}
    >
      <div className="flex w-[448px] flex-col items-center gap-6 px-4 py-10">
        <div className="flex w-[416px] flex-col items-center gap-1 text-center">
          <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
            সাইন ইন
          </h1>
          <p className="text-[14px] leading-5 font-normal text-[#1d271f]/70">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>
        <div className="w-[416px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
          <form className="flex flex-col gap-4">
            <Field
              label="ইমেইল"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <Field
              label="পাসওয়ার্ড"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <button
              type="button"
              className="h-10 w-full rounded-lg border border-[#047f39] bg-[#05893e] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
            >
              সাইন ইন
            </button>
            <div className="flex h-4 items-center gap-4 text-[12px] leading-4 text-[#1d271f]">
              <span className="h-px flex-1 bg-[#1d271f]/10" />
              অথবা
              <span className="h-px flex-1 bg-[#1d271f]/10" />
            </div>
            <SocialRow />
            <p className="text-center text-[14px] leading-5 text-[#1d271f]/70">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/sign-up" className="text-[#05893e]">
                সাইন আপ করুন
              </Link>
            </p>
          </form>
        </div>
        <Link
          href="/"
          className="text-[14px] leading-5 text-[#1d271f]/60"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export function SignUpForm() {
  return (
    <div
      className={`${hindSiliguri.className} flex w-full justify-center`}
    >
      <div className="flex w-[448px] flex-col items-center gap-6 px-4 py-10">
        <div className="flex w-[416px] flex-col items-center gap-1 text-center">
          <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-[14px] leading-5 font-normal text-[#1d271f]/70">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>
        <div className="w-[416px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
          <form className="flex flex-col gap-4">
            <Field
              label="নাম"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
            />
            <Field
              label="ইমেইল"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
            <Field
              label="পাসওয়ার্ড"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <Field
              label="পাসওয়ার্ড নিশ্চিত করুন"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
            />
            <button
              type="button"
              className="h-10 w-full rounded-lg border border-[#047f39] bg-[#05893e] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
            <div className="flex h-4 items-center gap-4 text-[12px] leading-4 text-[#1d271f]">
              <span className="h-px flex-1 bg-[#1d271f]/10" />
              অথবা
              <span className="h-px flex-1 bg-[#1d271f]/10" />
            </div>
            <SocialRow />
            <p className="text-center text-[14px] leading-5 text-[#1d271f]/70">
              অ্যাকাউন্ট আছে?{" "}
              <Link href="/sign-in" className="text-[#05893e]">
                সাইন ইন করুন
              </Link>
            </p>
          </form>
        </div>
        <Link
          href="/"
          className="text-[14px] leading-5 text-[#1d271f]/60"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
