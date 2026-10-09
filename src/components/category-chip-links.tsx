"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hindSiliguri } from "@/fonts";
import type { Category } from "@/lib/bazar";

export function CategoryChipLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <div className="pt-px pb-px">
      <nav
        className={`${hindSiliguri.className} mx-auto flex h-12 w-full min-w-0 max-w-[1280px] items-center overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        <ul className="flex w-max items-center gap-1">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = pathname === href;
            return (
              <li key={category.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-[13px] text-[12px] leading-[17px] font-semibold ${
                    active
                      ? "border-[#047f39] bg-[#047f39] text-[#f3fbf4]"
                      : "border-transparent text-[#1d271f] hover:border-[#ccd0cc] hover:bg-[#dadeda]"
                  }`}
                >
                  {category.emoji ? (
                    <span className="text-[12px] leading-[18px]">{category.emoji}</span>
                  ) : null}
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
