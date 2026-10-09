import { Hero } from "@/components/hero";
import { PriceMovers } from "@/components/price-movers";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6">
      <Hero />
      <PriceMovers />
    </div>
  );
}
