import { toBengaliNumber } from "@/lib/bengali";

const base = "https://openapi.programming-hero.com/api/bazardor";

const unitNames: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

type ApiProduct = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  unit: string;
  image: string;
  today: number;
  change?: {
    dir?: string;
    pct?: number;
  };
};

type ApiCategory = {
  slug: string;
  nameBn: string;
  icon?: string;
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  category: string;
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};

export type BazarResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number | null };

function isProduct(value: unknown): value is ApiProduct {
  if (typeof value !== "object" || value === null) return false;
  return "nameBn" in value && "today" in value;
}

function isCategory(value: unknown): value is ApiCategory {
  if (typeof value !== "object" || value === null) return false;
  return "slug" in value && "nameBn" in value;
}

function changeAmount(change: ApiProduct["change"]) {
  const pct = change?.pct;
  if (typeof pct !== "number" || !Number.isFinite(pct)) return 0;
  if (change?.dir === "down") return -Math.abs(pct);
  if (change?.dir === "up") return Math.abs(pct);
  if (change?.dir === "flat") return 0;
  return pct;
}

function productFrom(product: ApiProduct): Product {
  const unit = unitNames[product.unit] ?? product.unit;
  return {
    id: String(product.id),
    name: product.nameBn,
    emoji: product.image,
    unit: unit.startsWith("প্রতি") ? unit : `প্রতি ${unit}`,
    price: product.today,
    change: changeAmount(product.change),
    category: product.category,
  };
}

async function readJson(path: string): Promise<BazarResult<unknown>> {
  try {
    const response = await fetch(`${base}${path}`);
    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true, data: await response.json() };
  } catch {
    return { ok: false, status: null };
  }
}

export async function getProducts(category?: string): Promise<BazarResult<Product[]>> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const result = await readJson(`/products${query}`);
  if (!result.ok) return result;
  if (!Array.isArray(result.data)) return { ok: false, status: null };
  return {
    ok: true,
    data: result.data.filter(isProduct).map(productFrom),
  };
}

export async function getCategories(): Promise<BazarResult<Category[]>> {
  const result = await readJson("/categories");
  if (!result.ok) return result;
  if (!Array.isArray(result.data)) return { ok: false, status: null };
  return {
    ok: true,
    data: result.data.filter(isCategory).map((category) => ({
      slug: category.slug,
      name: category.nameBn,
      emoji: category.icon ?? "",
    })),
  };
}

export function priceLabel(price: number) {
  const digits = Number.isInteger(price) ? 0 : 2;
  return `${toBengaliNumber(price, digits)} টাকা`;
}

export function percentLabel(change: number) {
  return `${toBengaliNumber(Math.abs(change), 1)}%`;
}

export function changeDirection(change: number): "up" | "down" | "flat" {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "flat";
}

export function topRisers(products: Product[]) {
  return products
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
}

export function topFallers(products: Product[]) {
  return products
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);
}
