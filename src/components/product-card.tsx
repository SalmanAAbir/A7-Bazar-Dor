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
}: {
  icon?: string;
  name?: string;
  unit?: string;
  price?: string;
  change?: string;
  direction?: keyof typeof changeColor;
}) {
  const mark = direction === "down" ? "▼" : direction === "flat" ? "—" : "▲";

  return (
    <article
      className={`${hindSiliguri.className} w-full max-w-[363px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] hover:border-[#05893e]`}
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-[24px] leading-8 text-[#1d271f]">
            {icon}
          </div>
          <div>
            <p className="text-[16px] leading-6 font-semibold text-[#1d271f]">
              {name}
            </p>
            <p className="text-[12px] leading-4 text-[#1d271f]/60">{unit}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
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
}
