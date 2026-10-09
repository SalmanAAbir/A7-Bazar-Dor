import { hindSiliguri } from "@/fonts";

export function Hero() {
  return (
    <section
      className={`${hindSiliguri.className} flex flex-col gap-6 overflow-hidden rounded-3xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-[9px] md:h-[283px] md:flex-row md:items-start md:justify-between md:gap-0`}
    >
      <div className="w-full md:w-[576px]">
        <p className="w-fit rounded-[14px] bg-[#05893e]/10 px-3 py-1 text-[14px] leading-5 font-medium text-[#05893e]">
          মঙ্গলবার, ৬ অক্টোবর, ২০২৬
        </p>
        <h1 className="mt-2 text-[36px] leading-[45px] font-bold text-[#1d271f]">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <button
          type="button"
          className="mt-2 flex h-10 items-center rounded-lg border border-[#047f39] bg-[#05893e] px-[17px] text-[14px] leading-[21px] font-semibold text-[#f3fbf4] hover:border-[#037333] hover:bg-[#047c37]"
        >
          সব পণ্য দেখুন
        </button>
        <p className="mt-10 text-[16px] leading-6 text-[#1d271f]/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
      </div>
      <img
        src="/bazar-hero.svg"
        alt=""
        width={315}
        height={263}
        className="h-auto w-[315px] max-w-full shrink-0 self-center md:h-[263px] md:self-auto"
      />
    </section>
  );
}
