const design1 = '/assets/design-1.jpg';
const design2 = '/assets/design-2.jpg';
const design3 = '/assets/design-3.jpg';
const honeymoon = '/assets/col-honeymoon.jpg';
const trip = '/assets/col-trip.jpg';
const prewedding = '/assets/col-prewedding.jpg';
const love = '/assets/col-love.jpg';

export type Collection = 'Couple T Shirt' | 'Couple Hoodie' | 'Our design';

export const collections: {
  name: Collection;
  tagline: string;
  image: string;
}[] = [
  {
    name: 'Couple T Shirt',
    tagline: 'Matching tees, made for your story',
    image: love,
  },
  {
    name: 'Couple Hoodie',
    tagline: 'Cozy pair sets for every season',
    image: trip,
  },
  {
    name: 'Our design',
    tagline: 'Signature picks from the atelier',
    image: prewedding,
  },
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
    id: 'monogram-essential',
    name: 'Monogram Essential',
    subtitle: 'Embroidered initials',
    collection: 'Couple T Shirt',
    image: design1,
    price: '₹1,499',
  },
  {
    id: 'line-portrait',
    name: 'Line Portrait',
    subtitle: 'Custom couple sketch',
    collection: 'Our design',
    image: design2,
    price: '₹1,799',
  },
  {
    id: 'coordinates',
    name: 'Coordinates',
    subtitle: 'The place it began',
    collection: 'Our design',
    image: design3,
    price: '₹1,699',
  },
];

export const allDesigns: Design[] = [
  ...topDesigns,
  {
    id: 'sunset-honey',
    name: 'Sunset Honey',
    subtitle: 'Classic tee capsule',
    collection: 'Couple T Shirt',
    image: honeymoon,
    price: '₹1,899',
  },
  {
    id: 'route-66',
    name: 'Route 66',
    subtitle: 'Street hoodie series',
    collection: 'Couple Hoodie',
    image: trip,
    price: '₹1,699',
  },
  {
    id: 'vows',
    name: 'Vows',
    subtitle: 'Minimal couple hoodie',
    collection: 'Couple Hoodie',
    image: prewedding,
    price: '₹1,799',
  },
  {
    id: 'always',
    name: 'Always',
    subtitle: 'Signature tee classic',
    collection: 'Couple T Shirt',
    image: love,
    price: '₹1,499',
  },
  {
    id: 'island',
    name: 'Island Days',
    subtitle: 'Premium tee fit',
    collection: 'Couple T Shirt',
    image: honeymoon,
    price: '₹1,999',
  },
  {
    id: 'booked-confirmed',
    name: 'Booked ✔️',
    subtitle: '+ Booking Confirmed',
    collection: 'Our design',
    image: design1,
    price: '₹1,599',
  },
  {
    id: 'haan-bol-diya',
    name: 'Haan Bol Diya',
    subtitle: '+ Haan Bulwaya Gaya Tha',
    collection: 'Our design',
    image: design2,
    price: '₹1,599',
  },
  {
    id: 'add-to-cart-buy-now',
    name: 'Add To Cart',
    subtitle: '+ Buy Now',
    collection: 'Our design',
    image: design3,
    price: '₹1,499',
  },
  {
    id: 'zomato-swiggy',
    name: 'Zomato',
    subtitle: '+ Swiggy Bhi',
    collection: 'Our design',
    image: love,
    price: '₹1,499',
  },
  {
    id: 'wifi-password',
    name: 'WiFi',
    subtitle: '+ Password',
    collection: 'Our design',
    image: trip,
    price: '₹1,599',
  },
  {
    id: 'typing-seen',
    name: 'Typing…',
    subtitle: '+ Seen',
    collection: 'Our design',
    image: honeymoon,
    price: '₹1,599',
  },
  {
    id: 'ac-18-vs-26',
    name: 'AC 18°',
    subtitle: '+ AC 26° + Kambal',
    collection: 'Our design',
    image: prewedding,
    price: '₹1,699',
  },
  {
    id: 'handsome-choice',
    name: 'Handsome',
    subtitle: '+ Uski Choice Dekhlo',
    collection: 'Our design',
    image: design1,
    price: '₹1,499',
  },
  {
    id: 'better-half',
    name: 'Half',
    subtitle: '+ Better Half (Obviously)',
    collection: 'Our design',
    image: design2,
    price: '₹1,599',
  },
  {
    id: 'paise-ka-ped-maali',
    name: 'Paise Ka Ped Nahi Hoon',
    subtitle: '+ Maali',
    collection: 'Our design',
    image: design3,
    price: '₹1,699',
  },
];

export const fabrics = [
  {
    gsm: '180 GSM',
    label: 'Light & Breezy',
    note: 'Summer weight, drapes soft',
  },
  { gsm: '200 GSM', label: 'Everyday Luxe', note: 'Our signature midweight' },
  {
    gsm: '250 GSM',
    label: 'Structured Softness',
    note: 'Holds shape beautifully',
  },
  {
    gsm: '280 GSM',
    label: 'Heavyweight Heritage',
    note: 'Vintage feel, boxy fit',
  },
] as const;
