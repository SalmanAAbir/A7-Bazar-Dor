import Link from "next/link";
import {
  changeDirection,
  percentLabel,
  priceLabel,
  type ProductDetail,
} from "@/lib/bazar";
import { toBengaliNumber } from "@/lib/bengali";
import { hindSiliguri } from "@/fonts";

const changeColor = {
  up: "text-[#d03739]",
  down: "text-[#1a9951]",
  flat: "text-[#1d271f]",
} as const;

const summaryColor = {
  minimum: "text-[#05893e]",
  maximum: "text-[#d03739]",
  average: "text-[#05893e]",
} as const;

function priceSummary(product: ProductDetail) {
  if (product.markets.length === 0) {
    return {
      minimum: product.price,
      maximum: product.price,
      average: product.price,
      lowMarket: "",
      highMarket: "",
    };
  }

  let minimum = product.markets[0].min;
  let maximum = product.markets[0].max;
  let lowMarket = product.markets[0].market;
  let highMarket = product.markets[0].market;
  let midpointTotal = 0;

  for (const market of product.markets) {
    midpointTotal += (market.min + market.max) / 2;
    if (market.min < minimum) {
      minimum = market.min;
      lowMarket = market.market;
    }
    if (market.max > maximum) {
      maximum = market.max;
      highMarket = market.market;
    }
  }

  return {
    minimum,
    maximum,
    average: Math.round(midpointTotal / product.markets.length),
    lowMarket,
    highMarket,
  };
}

function comparedWithYesterday(today: number, yesterday: number) {
  const delta = today - yesterday;
  if (delta > 0) {
    return `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(delta)} টাকা`;
  }
  if (delta < 0) {
    return `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(Math.abs(delta))} টাকা`;
  }
  return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
}

function unitWord(unit: string) {
  return unit.replace(/^প্রতি\s*/, "");
}

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const summary = priceSummary(product);
  const direction = changeDirection(product.change);
  const mark = direction === "down" ? "▼" : direction === "flat" ? "—" : "▲";

  return (
    <div className={`${hindSiliguri.className} flex flex-col gap-6`}>
      <nav className="flex flex-wrap items-center gap-2 text-[14px] leading-5 text-[#1d271f]/60">
        <Link href="/" className="hover:text-[#1d271f]">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[#1d271f]"
        >
          {product.categoryName}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[#1d271f]">{product.name}</span>
      </nav>

      <section className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 md:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f0f5f0] text-[28px] leading-9">
              {product.emoji}
            </div>
            <div>
              <h1 className="text-[22px] leading-8 font-bold text-[#1d271f] md:text-[24px]">
                {product.name}
              </h1>
              <p className="text-[14px] leading-5 text-[#1d271f]/60">
                {product.unit} · {product.categoryName}
              </p>
              <p className="text-[14px] leading-5 text-[#1d271f]/60">
                {comparedWithYesterday(product.price, product.yesterday)}
              </p>
            </div>
          </div>
          <div className="flex w-fit flex-col items-end self-end rounded-2xl bg-[#f0f5f0] px-4 py-3 sm:self-auto">
            <p className="text-[12px] leading-4 text-[#1d271f]/60">আজকের দাম</p>
            <p className="text-[32px] leading-10 font-bold text-[#1d271f]">
              {toBengaliNumber(product.price)}
            </p>
            <p className="text-[13px] leading-5 text-[#1d271f]/70">
              টাকা / {unitWord(product.unit)}
            </p>
            <p
              className={`mt-1 inline-flex items-center gap-1 rounded-lg bg-[#fafcfa] px-2 py-0.5 text-[12px] leading-4 font-semibold ${changeColor[direction]}`}
            >
              <span>{mark}</span>
              <span>{percentLabel(product.change)}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[20px] leading-7 font-bold text-[#1d271f]">
          দামের সারসংক্ষেপ
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
            <p className="text-[14px] leading-5 text-[#1d271f]/70">সর্বনিম্ন দাম</p>
            <p className={`mt-1 text-[24px] leading-8 font-bold ${summaryColor.minimum}`}>
              {priceLabel(summary.minimum)}
            </p>
            <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
              সবচেয়ে কম দামের বাজার
            </p>
          </li>
          <li className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
            <p className="text-[14px] leading-5 text-[#1d271f]/70">সর্বাধিক দাম</p>
            <p className={`mt-1 text-[24px] leading-8 font-bold ${summaryColor.maximum}`}>
              {priceLabel(summary.maximum)}
            </p>
            <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </li>
          <li className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
            <p className="text-[14px] leading-5 text-[#1d271f]/70">গড় দাম</p>
            <p className={`mt-1 text-[24px] leading-8 font-bold ${summaryColor.average}`}>
              {priceLabel(summary.average)}
            </p>
            <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
              প্রতি {unitWord(product.unit)}-এর হিসাবে
            </p>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[20px] leading-7 font-bold text-[#1d271f]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#e1e8e1] text-[14px] leading-5 font-semibold text-[#1d271f]">
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 font-semibold">সর্বাধিক</th>
                <th className="px-4 py-3 font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market, index) => (
                <tr
                  key={`${market.division}-${market.market}`}
                  className={`text-[14px] leading-5 text-[#1d271f] ${
                    index % 2 === 1 ? "bg-[#f3f7f3]" : "bg-[#fafcfa]"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{market.market}</td>
                  <td className="px-4 py-3">{market.division}</td>
                  <td className="px-4 py-3">{priceLabel(market.min)}</td>
                  <td className="px-4 py-3">{priceLabel(market.max)}</td>
                  <td className="px-4 py-3">
                    {priceLabel((market.min + market.max) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-40 animate-pulse rounded-2xl bg-[#fafcfa]" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-32 animate-pulse rounded-2xl bg-[#fafcfa]" />
        <div className="h-32 animate-pulse rounded-2xl bg-[#fafcfa]" />
        <div className="h-32 animate-pulse rounded-2xl bg-[#fafcfa]" />
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-[#fafcfa]" />
    </div>
  );
}
