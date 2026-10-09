import Link from "next/link";
import { Suspense } from "react";
import { CategoryProducts } from "@/components/category-products";
import { ProductSkeletons } from "@/components/product-skeletons";
import { getCategories, getProducts } from "@/lib/bazar";
import { hindSiliguri } from "@/fonts";

async function CategoryBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, categories] = await Promise.all([
    getProducts(slug),
    getCategories(),
  ]);

  if (!products.ok) {
    return (
      <p className={`${hindSiliguri.className} text-[16px] leading-6 text-[#1d271f]`}>
        দামের তালিকা এখন লোড করা যাচ্ছে না।
      </p>
    );
  }

  if (products.data.length === 0) {
    return (
      <div className={`${hindSiliguri.className} flex flex-col items-start gap-4`}>
        <p className="text-[16px] leading-6 text-[#1d271f]">
          এই শ্রেণিতে কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg border border-[#047f39] bg-[#05893e] px-[17px] text-[14px] leading-[21px] font-semibold text-[#f3fbf4]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const category = categories.ok
    ? categories.data.find((item) => item.slug === slug)
    : undefined;

  return (
    <CategoryProducts
      title={category?.name ?? slug}
      emoji={category?.emoji ?? ""}
      products={products.data}
    />
  );
}

export default function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  return (
    <div className="px-4 py-6">
      <Suspense fallback={<ProductSkeletons />}>
        <CategoryBody params={params} />
      </Suspense>
    </div>
  );
}
