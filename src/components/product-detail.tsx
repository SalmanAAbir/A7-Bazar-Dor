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
    return `গতকালের তুলনায় আজ দাম বেড়েছে ${toBengaliNumber(delta)} টাকা`;
  }
  if (delta < 0) {
    return `গতকালের তুলনায় আজ দাম কমেছে ${toBengaliNumber(Math.abs(delta))} টাকা`;
  }
  return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
}

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const summary = priceSummary(product);
  const direction = changeDirection(product.change);
  const mark = direction === "down" ? "▼" : direction === "flat" ? "—" : "▲";

  return (
    <div className={`${hindSiliguri.className} flex flex-col gap-6`}>
      <section className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-[32px] leading-10">
              {product.emoji}
            </div>
            <div>
              <h1 className="text-[24px] leading-8 font-bold text-[#1d271f]">
                {product.name}
              </h1>
              <p className="mt-1 text-[14px] leading-5 text-[#1d271f]/70">
                {comparedWithYesterday(product.price, product.yesterday)}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#f0f5f0] px-2 text-[14px] leading-5 font-medium text-[#1d271f]"
                >
                  {product.categoryEmoji ? <span>{product.categoryEmoji}</span> : null}
                  {product.categoryName}
                </Link>
                <span className="text-[14px] leading-5 text-[#1d271f]/70">
                  {product.unit}
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[12px] leading-4 text-[#1d271f]/70">আজকের দাম</p>
            <p className="text-[28px] leading-9 font-bold text-[#1d271f]">
              {priceLabel(product.price)}
            </p>
            <p
              className={`mt-1 inline-flex items-center gap-1 rounded-xl bg-[#f0f5f0] px-2 py-1 text-[12px] leading-4 font-semibold ${changeColor[direction]}`}
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
            <p className="mt-1 text-[24px] leading-8 font-bold text-[#1d271f]">
              {priceLabel(summary.minimum)}
            </p>
            {summary.lowMarket ? (
              <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
                সবচেয়ে কম দামের বাজার
                <span className="mt-0.5 block text-[14px] leading-5 font-medium text-[#1d271f]">
                  {summary.lowMarket}
                </span>
              </p>
            ) : null}
          </li>
          <li className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
            <p className="text-[14px] leading-5 text-[#1d271f]/70">সর্বাধিক দাম</p>
            <p className="mt-1 text-[24px] leading-8 font-bold text-[#1d271f]">
              {priceLabel(summary.maximum)}
            </p>
            {summary.highMarket ? (
              <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
                সবচেয়ে বেশি দামের বাজার
                <span className="mt-0.5 block text-[14px] leading-5 font-medium text-[#1d271f]">
                  {summary.highMarket}
                </span>
              </p>
            ) : null}
          </li>
          <li className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4">
            <p className="text-[14px] leading-5 text-[#1d271f]/70">গড় দাম</p>
            <p className="mt-1 text-[24px] leading-8 font-bold text-[#1d271f]">
              {priceLabel(summary.average)}
            </p>
            <p className="mt-2 text-[12px] leading-4 text-[#1d271f]/60">
              {toBengaliNumber(product.markets.length)}টি বাজারের গড়
            </p>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[20px] leading-7 font-bold text-[#1d271f]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#e1e8e1] text-[14px] leading-5 font-semibold text-[#1d271f]">
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 font-semibold">সর্বাধিক</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market) => (
                <tr
                  key={`${market.division}-${market.market}`}
                  className="border-b border-[#e1e8e1] text-[14px] leading-5 text-[#1d271f] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{market.market}</td>
                  <td className="px-4 py-3">{market.division}</td>
                  <td className="px-4 py-3">{priceLabel(market.min)}</td>
                  <td className="px-4 py-3">{priceLabel(market.max)}</td>
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
