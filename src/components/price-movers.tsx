import { ProductCard } from "@/components/product-card";
import { hindSiliguri } from "@/fonts";

const items = [
  {
    icon: "🧅",
    name: "পেঁয়াজ",
    unit: "প্রতি কেজি",
    price: "৫৪ টাকা",
    change: "১২.৫%",
  },
  {
    icon: "🫚",
    name: "আদা",
    unit: "প্রতি কেজি",
    price: "৮৫ টাকা",
    change: "৯.০%",
  },
  {
    icon: "🧈",
    name: "মাখন (১০০ গ্রাম)",
    unit: "প্রতি পিস",
    price: "১৪৫ টাকা",
    change: "৩.৬%",
  },
  {
    icon: "🍆",
    name: "বেগুন",
    unit: "প্রতি কেজি",
    price: "৪৪ টাকা",
    change: "৪.৮%",
  },
  {
    icon: "🥚",
    name: "ডিম",
    unit: "প্রতি ডজন",
    price: "১৫৮ টাকা",
    change: "৩.৯%",
  },
  {
    icon: "🐟",
    name: "রুই মাছ",
    unit: "প্রতি কেজি",
    price: "৪৬ টাকা",
    change: "৪.৫%",
  },
] as const;

export function PriceMovers() {
  return (
    <section className={`${hindSiliguri.className} flex flex-col gap-3`}>
      <h2 className="flex items-center gap-2 text-[20px] leading-7 font-bold text-[#1d271f]">
        <span className="text-[16px] leading-6 font-normal text-[#d03739]">
          ▲
        </span>
        আজ দাম বেড়েছে
      </h2>
      <ul className="flex flex-wrap gap-4">
        {items.map((item) => (
          <li key={item.name} className="w-full shrink-0 md:w-[363px]">
            <ProductCard {...item} direction="up" />
          </li>
        ))}
      </ul>
    </section>
  );
}
