import type { Metadata } from "next";
import { Landing } from "./landing-client";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Create Your Customised Couple Tshirt",
  description:
    "Bespoke matching couple tshirts. Upload your design, pick your fabric (180–280 GSM) and order on WhatsApp.",
  openGraph: {
    title: "Create Your Customised Couple Tshirt",
    description: "Customized your Couple Tshirt and order on WhatsApp.",
  },
};

export default async function Page() {
  const featuredProducts = await getFeaturedProducts(3);
  return <Landing featuredProducts={featuredProducts} />;
}
