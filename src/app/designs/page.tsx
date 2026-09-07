import type { Metadata } from "next";
import { DesignsPage } from "./designs-client";
import type { Collection } from "@/lib/designs";
import { getAllActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Designs",
  description:
    "Browse every Willy-Nilly customised couple tshirt design. Filter by collection and customize on WhatsApp.",
  openGraph: {
    title: "Explore all Couple Tshirt Designs",
    description: "Bespoke matching couple tshirts across Honeymoon, Trip, Pre-Wedding & Love collections.",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const products = await getAllActiveProducts();
  return (
    <DesignsPage
      products={products}
      initialCollection={collection as Collection | undefined}
    />
  );
}
