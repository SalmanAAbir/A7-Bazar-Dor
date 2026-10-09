"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  changeDirection,
  percentLabel,
  priceLabel,
  type Product,
} from "@/lib/bazar";
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

  return (
    <section className={`${hindSiliguri.className} flex flex-col gap-4`}>
      <h1 className="flex items-center gap-2 text-[24px] leading-8 font-bold text-[#1d271f]">
        {emoji ? <span>{emoji}</span> : null}
        {title}
      </h1>
      <label className="flex w-fit items-center gap-2 text-[14px] leading-5 text-[#1d271f]">
        সাজান
        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as (typeof sorts)[number]["id"])
          }
          className="h-10 rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-[14px] text-[#1d271f]"
        >
          {sorts.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <ul className="flex flex-wrap gap-4">
        {ordered.map((product) => (
          <li key={product.id} className="w-full shrink-0 md:w-[363px]">
            <ProductCard
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
