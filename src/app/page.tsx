import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { HomeProducts } from "@/components/home-products";
import { ProductSkeletons } from "@/components/product-skeletons";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6">
      <Hero />
      <Suspense fallback={<ProductSkeletons />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
