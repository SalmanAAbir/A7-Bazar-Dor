"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { GitHubSignInButton } from "@/components/github-sign-in-button";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { hindSiliguri } from "@/fonts";
import { authClient } from "@/lib/auth-client";
import { safeNextPath } from "@/lib/safe-next";

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
      <GitHubSignInButton />
    </div>
  );
}

function showError(message: string, setError: (value: string) => void) {
  setError(message);
  toast.error(message);
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const nextPath = safeNextPath(searchParams.get("next"));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email || !password) {
      showError("ইমেইল ও পাসওয়ার্ড দিন", setError);
      return;
    }
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: nextPath,
    });
    if (signInError) {
      showError(signInError.message || "সাইন ইন করা যায়নি", setError);
      return;
    }
    toast.success("সাইন ইন হয়েছে");
    router.push(nextPath);
    router.refresh();
  }

  return (
    <div
      className={`${hindSiliguri.className} flex w-full justify-center`}
    >
      <div className="flex w-full max-w-[448px] flex-col items-center gap-6 px-4 py-10">
        <div className="flex w-full flex-col items-center gap-1 text-center">
          <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
            সাইন ইন
          </h1>
          <p className="text-[14px] leading-5 font-normal text-[#1d271f]/70">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>
        <div className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
            {error ? (
              <p className="text-[14px] leading-5 text-[#1d271f]">{error}</p>
            ) : null}
            <button
              type="submit"
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
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!name || !email || !password) {
      showError("নাম, ইমেইল ও পাসওয়ার্ড দিন", setError);
      return;
    }
    if (password !== String(form.get("confirmPassword") ?? "")) {
      showError("পাসওয়ার্ড মিলছে না", setError);
      return;
    }
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/sign-in",
    });
    if (signUpError) {
      showError(signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি", setError);
      return;
    }
    await authClient.signOut();
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন");
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <div
      className={`${hindSiliguri.className} flex w-full justify-center`}
    >
      <div className="flex w-full max-w-[448px] flex-col items-center gap-6 px-4 py-10">
        <div className="flex w-full flex-col items-center gap-1 text-center">
          <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-[14px] leading-5 font-normal text-[#1d271f]/70">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>
        <div className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
            {error ? (
              <p className="text-[14px] leading-5 text-[#1d271f]">{error}</p>
            ) : null}
            <button
              type="submit"
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
