import type { Metadata } from "next";
import { CustomizePage } from "./customize-client";

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
  return <CustomizePage designId={design} />;
}
