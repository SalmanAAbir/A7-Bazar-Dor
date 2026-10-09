import { PriceMovers } from "@/components/price-movers";
import { ProductCard } from "@/components/product-card";
import {
  changeDirection,
  getProducts,
  percentLabel,
  priceLabel,
  topFallers,
  topRisers,
} from "@/lib/bazar";
import { toBengaliNumber } from "@/lib/bengali";
import { hindSiliguri } from "@/fonts";

export async function HomeProducts() {
  const result = await getProducts();

  if (!result.ok || result.data.length === 0) {
    return (
      <p
        id="সব-পণ্য"
        className={`${hindSiliguri.className} text-[16px] leading-6 text-[#1d271f]`}
      >
        দামের তালিকা এখন লোড করা যাচ্ছে না।
      </p>
    );
  }

  const products = result.data;

  return (
    <>
      <PriceMovers
        title="আজ দাম বেড়েছে"
        direction="up"
        products={topRisers(products)}
      />
      <PriceMovers
        title="আজ দাম কমেছে"
        direction="down"
        products={topFallers(products)}
      />
      <section id="সব-পণ্য" className={`${hindSiliguri.className} flex flex-col gap-3`}>
        <div>
          <h2 className="text-[20px] leading-7 font-bold text-[#1d271f]">সব পণ্য</h2>
          <p className="text-[14px] leading-5 text-[#1d271f]/70">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
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
    </>
  );
}
