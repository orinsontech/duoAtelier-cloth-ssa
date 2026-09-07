import type { Metadata } from "next";
import { CustomizePage } from "./customize-client";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Customize Your Couple Tshirt",
  description:
    "Upload your reference, pick your fabric, add your details and place your bespoke couple tshirt order on WhatsApp.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ design?: string }>;
}) {
  const { design } = await searchParams;
  const product = design ? await getProductBySlug(design) : null;
  const related = product
    ? await getRelatedProducts(product.collection, product.slug, 4)
    : [];

  return <CustomizePage product={product} relatedProducts={related} />;
}
