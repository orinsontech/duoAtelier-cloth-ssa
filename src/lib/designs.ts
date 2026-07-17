const design1 = "/assets/design-1.jpg";
const design2 = "/assets/design-2.jpg";
const design3 = "/assets/design-3.jpg";
const honeymoon = "/assets/col-honeymoon.jpg";
const trip = "/assets/col-trip.jpg";
const prewedding = "/assets/col-prewedding.jpg";
const love = "/assets/col-love.jpg";

export type Collection = "Honeymoon" | "Trip" | "Pre-Wedding" | "Love";

export const collections: { name: Collection; tagline: string; image: string }[] = [
  { name: "Honeymoon", tagline: "For the first days of forever", image: honeymoon },
  { name: "Trip", tagline: "Miles worn together", image: trip },
  { name: "Pre-Wedding", tagline: "The build-up, in cotton", image: prewedding },
  { name: "Love", tagline: "The eternal classic", image: love },
];

export type Design = {
  id: string;
  name: string;
  subtitle: string;
  collection: Collection;
  image: string;
  price: string;
};

export const topDesigns: Design[] = [
  {
    id: "monogram-essential",
    name: "Monogram Essential",
    subtitle: "Embroidered initials",
    collection: "Love",
    image: design1,
    price: "₹1,499",
  },
  {
    id: "line-portrait",
    name: "Line Portrait",
    subtitle: "Custom couple sketch",
    collection: "Pre-Wedding",
    image: design2,
    price: "₹1,799",
  },
  {
    id: "coordinates",
    name: "Coordinates",
    subtitle: "The place it began",
    collection: "Trip",
    image: design3,
    price: "₹1,699",
  },
];

export const allDesigns: Design[] = [
  ...topDesigns,
  { id: "sunset-honey", name: "Sunset Honey", subtitle: "Honeymoon capsule", collection: "Honeymoon", image: honeymoon, price: "₹1,899" },
  { id: "route-66", name: "Route 66", subtitle: "Road trip series", collection: "Trip", image: trip, price: "₹1,699" },
  { id: "vows", name: "Vows", subtitle: "Pre-wedding minimal", collection: "Pre-Wedding", image: prewedding, price: "₹1,799" },
  { id: "always", name: "Always", subtitle: "Love classic", collection: "Love", image: love, price: "₹1,499" },
  { id: "island", name: "Island Days", subtitle: "Honeymoon linen", collection: "Honeymoon", image: honeymoon, price: "₹1,999" },
];

export const fabrics = [
  { gsm: "180 GSM", label: "Light & Breezy", note: "Summer weight, drapes soft" },
  { gsm: "200 GSM", label: "Everyday Luxe", note: "Our signature midweight" },
  { gsm: "250 GSM", label: "Structured Softness", note: "Holds shape beautifully" },
  { gsm: "280 GSM", label: "Heavyweight Heritage", note: "Vintage feel, boxy fit" },
] as const;
