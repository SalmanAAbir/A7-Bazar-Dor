import { toBengaliNumber } from "@/lib/bengali";

const bases = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function listFrom(payload: unknown) {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];
  for (const key of ["products", "data", "items", "categories", "result"]) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
}

function pick(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function numberFrom(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const latin = value.replace(/[০-৯]/g, (digit) =>
    String("০১২৩৪৫৬৭৮৯".indexOf(digit)),
  );
  const match = latin.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function textFrom(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function changeFrom(record: Record<string, unknown>) {
  const raw = pick(record, [
    "changePercent",
    "change_percent",
    "priceChange",
    "percent",
    "percentage",
    "change",
  ]);
  const amount = numberFrom(raw);
  if (amount === null) return 0;
  const direction = textFrom(
    pick(record, ["direction", "trend", "changeDirection"]),
  ).toLowerCase();
  const rawText = textFrom(raw);
  if (direction === "down" || rawText.includes("▼")) return -Math.abs(amount);
  if (direction === "up" || rawText.includes("▲")) return Math.abs(amount);
  return amount;
}

function productFrom(value: unknown, index: number): Product | null {
  if (!isRecord(value)) return null;
  const name = textFrom(pick(value, ["name", "title", "productName", "product_name"]));
  const price = numberFrom(pick(value, ["price", "currentPrice", "current_price", "todayPrice"]));
  if (!name || price === null) return null;
  const idValue = pick(value, ["id", "slug", "_id"]);
  const category = textFrom(
    pick(value, ["category", "categorySlug", "category_slug", "categoryId"]),
  );
  const unit = textFrom(pick(value, ["unit", "unitName", "unit_name"])) || "কেজি";
  return {
    id: idValue === undefined ? String(index) : String(idValue),
    name,
    emoji: textFrom(pick(value, ["emoji", "icon", "image"])) || "🛒",
    unit: unit.startsWith("প্রতি") ? unit : `প্রতি ${unit}`,
    price,
    change: changeFrom(value),
    category,
  };
}

function categoryFrom(value: unknown): Category | null {
  if (!isRecord(value)) return null;
  const slug = textFrom(pick(value, ["slug", "id", "category", "key"]));
  const name = textFrom(pick(value, ["name", "title", "label"]));
  if (!slug || !name) return null;
  return {
    slug,
    name,
    emoji: textFrom(pick(value, ["emoji", "icon"])) || "",
  };
}

async function readJson(path: string): Promise<BazarResult<unknown>> {
  let status: number | null = null;
  for (const base of bases) {
    try {
      const response = await fetch(`${base}${path}`);
      status = response.status;
      if (!response.ok) continue;
      return { ok: true, data: await response.json() };
    } catch {
      status = null;
    }
  }
  return { ok: false, status };
}

export async function getProducts(category?: string): Promise<BazarResult<Product[]>> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const result = await readJson(`/products${query}`);
  if (!result.ok) return result;
  const products = listFrom(result.data)
    .map(productFrom)
    .filter((product): product is Product => product !== null);
  const rows = listFrom(result.data);
  if (products.length === 0 && rows.length > 0) {
    const first = rows[0];
    console.error(
      "Bazar Dor product shape was not recognized",
      isRecord(first) ? Object.keys(first) : first,
    );
  } else if (products.length > 0 && products.every((product) => product.change === 0)) {
    const first = rows[0];
    console.error(
      "Bazar Dor price change field was not recognized",
      isRecord(first) ? Object.keys(first) : first,
    );
  }
  return { ok: true, data: products };
}

export async function getCategories(): Promise<BazarResult<Category[]>> {
  const result = await readJson("/categories");
  if (!result.ok) return result;
  const categories = listFrom(result.data)
    .map(categoryFrom)
    .filter((category): category is Category => category !== null);
  return { ok: true, data: categories };
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
