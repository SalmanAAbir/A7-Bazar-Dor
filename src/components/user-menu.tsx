"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

export type HeaderUser = {
  name: string;
  email: string;
  image?: string | null;
};

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle cx="8" cy="5" r="2.25" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.2 13.2c.7-2.2 2.4-3.2 4.8-3.2s4.1 1 4.8 3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SignOutIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="none"
    >
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

function AccountMenu({ user }: { user: HeaderUser }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const firstName = user.name.split(" ")[0] || user.name;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function signOut() {
    await authClient.signOut();
    setOpen(false);
    router.refresh();
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-8 shrink-0 items-center gap-2 rounded-lg md:h-10 md:pr-2 md:pl-1"
      >
        {user.image ? (
          <img
            src={user.image}
            alt=""
            width={36}
            height={36}
            referrerPolicy="no-referrer"
            className="size-8 rounded-[10px] object-cover md:size-9 md:rounded-[11px]"
          />
        ) : (
          <span className="inline-flex size-8 items-center justify-center rounded-[10px] bg-[#05893e] text-[#f3fbf4] md:size-9 md:rounded-[11px]">
            <UserIcon className="size-4" />
          </span>
        )}
        <span className="hidden text-[14px] leading-5 font-medium text-[#1d271f] md:inline">
          {firstName}
        </span>
        <span className="text-[12px] leading-4 font-semibold text-[#1d271f]">
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute top-[calc(100%+8px)] right-0 z-20 w-[240px] rounded-xl border border-[#e1e8e1] bg-[#fafcfa] p-3 shadow-[0_8px_24px_rgba(29,39,31,0.12)]"
        >
          <p className="text-[14px] leading-5 font-bold text-[#1d271f]">
            {user.name}
          </p>
          <p className="mt-0.5 text-[12px] leading-4 text-[#1d271f]/60">
            {user.email}
          </p>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-9 items-center gap-2 rounded-lg px-1 text-[14px] leading-5 font-medium text-[#1d271f]"
          >
            <UserIcon className="size-4" />
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              void signOut();
            }}
            className="flex h-9 w-full items-center gap-2 rounded-lg px-1 text-[14px] leading-5 font-medium text-[#e72c35]"
          >
            <SignOutIcon className="size-4" />
            সাইন আউট
          </button>
        </div>
      ) : null}
    </div>
  );
}

function LoggedOutActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-transparent px-[13px] text-[12px] leading-[18px] font-semibold text-[#1d271f] md:h-10 md:w-[90px] md:px-0 md:text-[14px] md:leading-[21px]"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-[13px] text-[12px] leading-[18px] font-semibold text-[#f3fbf4] md:h-10 md:w-[92px] md:px-0 md:text-[14px] md:leading-[21px]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}

export function HeaderAccount({ user }: { user: HeaderUser | null }) {
  const { data, isPending } = authClient.useSession();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const current =
    !ready || isPending
      ? user
      : data?.user
        ? {
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
          }
        : null;

  if (!current) return <LoggedOutActions />;

  return <AccountMenu user={current} />;
}
