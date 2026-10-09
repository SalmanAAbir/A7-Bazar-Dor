import { ProductCard } from "@/components/product-card";
import {
  changeDirection,
  percentLabel,
  priceLabel,
  type Product,
} from "@/lib/bazar";
import { hindSiliguri } from "@/fonts";

const markStyle = {
  up: { mark: "▲", color: "text-[#d03739]" },
  down: { mark: "▼", color: "text-[#1a9951]" },
} as const;

export function PriceMovers({
  title,
  direction,
  products,
}: {
  title: string;
  direction: keyof typeof markStyle;
  products: Product[];
}) {
  const mark = markStyle[direction];

  return (
    <section className={`${hindSiliguri.className} flex flex-col gap-3`}>
      <h2 className="flex items-center gap-2 text-[20px] leading-7 font-bold text-[#1d271f]">
        <span className={`text-[16px] leading-6 font-normal ${mark.color}`}>
          {mark.mark}
        </span>
        {title}
      </h2>
      <ul className="flex flex-wrap gap-4">
        {products.map((product) => (
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
