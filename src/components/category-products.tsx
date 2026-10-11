"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  changeDirection,
  percentLabel,
  priceLabel,
  type Product,
} from "@/lib/bazar";
import { toBengaliNumber } from "@/lib/bengali";
import { hindSiliguri } from "@/fonts";

const sorts = [
  { id: "default", label: "ডিফল্ট" },
  { id: "asc", label: "দাম: কম থেকে বেশি" },
  { id: "desc", label: "দাম: বেশি থেকে কম" },
] as const;

export function CategoryProducts({
  title,
  emoji,
  products,
}: {
  title: string;
  emoji: string;
  products: Product[];
}) {
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("default");
  const ordered =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "asc" ? a.price - b.price : b.price - a.price,
        );

  const count = toBengaliNumber(products.length);

  return (
    <section className={`${hindSiliguri.className} flex flex-col gap-4`}>
      <div className="flex items-center gap-3 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-5 py-4">
        {emoji ? (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f0f5f0] text-[24px] leading-8">
            {emoji}
          </span>
        ) : null}
        <div>
          <h1 className="text-[20px] leading-7 font-bold text-[#1d271f]">
            {title}
          </h1>
          <p className="text-[14px] leading-5 text-[#1d271f]/60">
            {count}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-3">
        <label className="flex items-center gap-3 text-[14px] leading-5 text-[#1d271f]/70">
          সাজান
          <span className="relative">
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as (typeof sorts)[number]["id"])
              }
              className="h-9 appearance-none rounded-lg border border-[#e1e8e1] bg-[#fafcfa] pr-8 pl-3 text-[14px] text-[#1d271f] outline-none"
            >
              {sorts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[12px] text-[#1d271f]"
            >
              ▾
            </span>
          </span>
        </label>
      </div>
      <p className="text-[14px] leading-5 text-[#1d271f]/60">
        মোট {count}টি পণ্য দেখানো হচ্ছে
      </p>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {ordered.map((product) => (
          <li key={product.id}>
            <ProductCard
              href={`/product/${product.slug}`}
              icon={product.emoji}
              name={product.name}
              unit={product.unit}
              price={priceLabel(product.price)}
              change={percentLabel(product.change)}
              direction={changeDirection(product.change)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
