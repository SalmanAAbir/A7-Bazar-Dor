import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import {
  ProductDetailSkeleton,
  ProductDetailView,
} from "@/components/product-detail";
import { hindSiliguri } from "@/fonts";
import { getAuth } from "@/lib/auth";
import { getProduct } from "@/lib/bazar";
import { env } from "@/lib/env";

async function ProductBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProduct(slug);

  if (!result.ok) {
    return (
      <p className={`${hindSiliguri.className} text-[16px] leading-6 text-[#1d271f]`}>
        দামের তালিকা এখন লোড করা যাচ্ছে না।
      </p>
    );
  }

  if (!result.data) {
    notFound();
  }

  const signedIn =
    Boolean(env("BETTER_AUTH_MONGODB_URL")) &&
    Boolean(
      await getAuth().api.getSession({
        headers: await headers(),
      }),
    );

  if (!signedIn) {
    redirect(
      `/signin?reason=protected&next=${encodeURIComponent(`/product/${slug}`)}`,
    );
  }

  return <ProductDetailView product={result.data} />;
}

export default function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  return (
    <div className="px-4 py-6">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductBody params={params} />
      </Suspense>
    </div>
  );
}
