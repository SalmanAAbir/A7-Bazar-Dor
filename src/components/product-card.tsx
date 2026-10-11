import Link from "next/link";
import { hindSiliguri } from "@/fonts";

const changeColor = {
  up: "text-[#d03739]",
  down: "text-[#1a9951]",
  flat: "text-[#1d271f]",
} as const;

export function ProductCard({
  icon = "🧅",
  name = "পেঁয়াজ",
  unit = "প্রতি কেজি",
  price = "৫৪ টাকা",
  change = "১২.৫%",
  direction = "up",
  href,
}: {
  icon?: string;
  name?: string;
  unit?: string;
  price?: string;
  change?: string;
  direction?: keyof typeof changeColor;
  href?: string;
}) {
  const mark = direction === "down" ? "▼" : direction === "flat" ? "—" : "▲";

  const card = (
    <article
      className={`${hindSiliguri.className} w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] hover:border-[#05893e]`}
    >
      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-[20px] leading-7 text-[#1d271f] sm:size-12 sm:text-[24px] sm:leading-8">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] leading-5 font-semibold wrap-break-word text-[#1d271f] sm:text-[16px] sm:leading-6">
              {name}
            </p>
            <p className="text-[12px] leading-4 text-[#1d271f]/60">{unit}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[12px] leading-4 text-[#1d271f]/70">আজকের দাম</p>
            <p className="text-[20px] leading-7 font-bold text-[#1d271f]">
              {price}
            </p>
          </div>
          <div
            className={`flex items-center gap-1 rounded-xl bg-[#f0f5f0] px-2 py-1 text-[12px] leading-4 font-semibold ${changeColor[direction]}`}
          >
            <span>{mark}</span>
            <span>{change}</span>
          </div>
        </div>
      </div>
    </article>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block w-full">
      {card}
    </Link>
  );
}
