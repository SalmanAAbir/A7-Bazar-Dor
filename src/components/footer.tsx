import { hindSiliguri } from "@/fonts";

export function Footer() {
  return (
    <footer className="bg-[#fafcfa]">
      <div
        className={`${hindSiliguri.className} mx-auto flex w-full max-w-[1280px] flex-col items-center gap-2 px-4 py-6 text-center text-[14px] leading-5 text-[#1d271f]/70 md:flex-row md:justify-between md:text-left`}
      >
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
