"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { hindSiliguri } from "@/fonts";

let protectedToastKey = "";

export function AppToaster() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reason") !== "protected") return;
    const key = `${window.location.pathname}${window.location.search}`;
    if (protectedToastKey === key) return;
    protectedToastKey = key;
    toast("এই পাতা দেখতে আগে সাইন ইন করুন");
  }, []);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: hindSiliguri.className,
      }}
    />
  );
}
