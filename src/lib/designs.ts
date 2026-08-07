const monogramEssential1 = '/assets/Monogram-Essential-1.png';
const monogramEssential2 = '/assets/Monogram-Essential-2.jpg';
const monogramEssential3 = '/assets/Monogram-Essential-3.jpg';
const always1 = '/assets/always-1.png';
const always2 = '/assets/always-2.jpg';
const honeymoon = '/assets/col-honeymoon.jpg';
const trip = '/assets/col-trip.jpg';
const ourDesign1 = '/assets/our-design-1.png';
const ourDesign2 = '/assets/our-design-2.png';

const soldOutProudOwnerWhite = '/assets/our-design/sold-out-proud-owner-white.jpg';
const soldOutProudOwnerBlack = '/assets/our-design/sold-out-proud-owner-black.jpg';
const heroDirectorWhite = '/assets/our-design/hero-director-white.jpg';
const heroDirectorBlack = '/assets/our-design/hero-director-black.jpg';
const limitedEditionOwnerWhite = '/assets/our-design/limited-edition-owner-white.jpg';
const limitedEditionOwnerBlack = '/assets/our-design/limited-edition-owner-black.jpg';
const bookedBookingConfirmedWhite = '/assets/our-design/booked-booking-confirmed-white.jpg';
const bookedBookingConfirmedBlack = '/assets/our-design/booked-booking-confirmed-black.jpg';
const hoodie2 = '/assets/hoodie-2.jpg';

export type Collection = 'Couple T Shirt' | 'Couple Hoodie' | 'Our design';

export const collections: {
  name: Collection;
  tagline: string;
  image: string;
  images?: string[];
}[] = [
  {
    name: 'Couple T Shirt',
    tagline: 'Matching tees, made for your story',
    image: monogramEssential1,
    images: [monogramEssential1, always2],
  },
  {
    name: 'Couple Hoodie',
    tagline: 'Cozy pair sets for every season',
    image: hoodie2,
  },
  {
    name: 'Our design',
    tagline: 'Signature picks from the atelier',
    image: ourDesign1,
    images: [ourDesign1, ourDesign2],
  },
];

export type Design = {
  id: string;
  name: string;
  subtitle: string;
  collection: Collection;
  image: string;
  images?: string[];
  price: string;
};

export const topDesigns: Design[] = [
  {
    id: 'monogram-essential',
    name: 'Monogram Essential',
    subtitle: 'Embroidered initials',
    collection: 'Couple T Shirt',
    image: monogramEssential1,
    images: [monogramEssential1, monogramEssential2, monogramEssential3],
    price: '₹1,499',
  },
  {
    id: 'sold-out-proud-owner',
    name: 'Sold Out',
    subtitle: '+ Proud Owner',
    collection: 'Our design',
    image: soldOutProudOwnerWhite,
    images: [soldOutProudOwnerWhite, soldOutProudOwnerBlack],
    price: '₹1,499',
  },
  {
    id: 'hero-director',
    name: 'Hero',
    subtitle: '+ Director',
    collection: 'Our design',
    image: heroDirectorWhite,
    images: [heroDirectorWhite, heroDirectorBlack],
    price: '₹1,499',
  },
];

export const allDesigns: Design[] = [
  ...topDesigns,
  {
    id: 'route-66',
    name: 'Route 66',
    subtitle: 'Street hoodie series',
    collection: 'Couple Hoodie',
    image: trip,
    price: '₹2,499',
  },
  {
    id: 'vows',
    name: 'Vows',
    subtitle: 'Minimal couple hoodie',
    collection: 'Couple Hoodie',
    image: hoodie2,
    price: '₹2,499',
  },
  {
    id: 'always',
    name: 'Always',
    subtitle: 'Signature tee classic',
    collection: 'Couple T Shirt',
    image: always1,
    images: [always1, always2],
    price: '₹1,499',
  },
  {
    id: 'island',
    name: 'Island Days',
    subtitle: 'Premium tee fit',
    collection: 'Couple T Shirt',
    image: honeymoon,
    price: '₹1,499',
  },
  {
    id: 'limited-edition-owner',
    name: 'Limited Edition',
    subtitle: '+ Owner Of Limited Edition',
    collection: 'Our design',
    image: limitedEditionOwnerWhite,
    images: [limitedEditionOwnerWhite, limitedEditionOwnerBlack],
    price: '₹1,499',
  },
  {
    id: 'booked-booking-confirmed',
    name: 'Booked',
    subtitle: '+ Booking Confirmed',
    collection: 'Our design',
    image: bookedBookingConfirmedWhite,
    images: [bookedBookingConfirmedWhite, bookedBookingConfirmedBlack],
    price: '₹1,499',
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
