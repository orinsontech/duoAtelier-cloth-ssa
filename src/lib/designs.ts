const design1 = '/assets/design-1.jpg';
const design2 = '/assets/design-2.jpg';
const design3 = '/assets/design-3.jpg';
const honeymoon = '/assets/col-honeymoon.jpg';
const trip = '/assets/col-trip.jpg';
const prewedding = '/assets/col-prewedding.jpg';
const love = '/assets/col-love.jpg';

const soldOutProudOwner = '/assets/our-design/sold-out-proud-owner.jpg';
const theekHaiKuchTheekNahi = '/assets/our-design/theek-hai-kuch-theek-nahi.jpg';
const heroDirector = '/assets/our-design/hero-director.jpg';
const oneManShowProducer = '/assets/our-design/one-man-show-producer.jpg';
const limitedEditionOwner = '/assets/our-design/limited-edition-owner.jpg';
const bigdaHuaBigaadneWali = '/assets/our-design/bigda-hua-bigaadne-wali.jpg';
const tripSponsorPlanner = '/assets/our-design/trip-sponsor-planner.jpg';

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
    id: 'sold-out-proud-owner',
    name: 'Sold Out',
    subtitle: '+ Proud Owner',
    collection: 'Our design',
    image: soldOutProudOwner,
    price: '₹1,499',
  },
  {
    id: 'hero-director',
    name: 'Hero',
    subtitle: '+ Director',
    collection: 'Our design',
    image: heroDirector,
    price: '₹1,499',
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
    id: 'theek-hai-kuch-theek-nahi',
    name: '"Theek Hai"',
    subtitle: '+ Kuch Theek Nahi Hai',
    collection: 'Our design',
    image: theekHaiKuchTheekNahi,
    price: '₹1,599',
  },
  {
    id: 'one-man-show-producer',
    name: 'One Man Show',
    subtitle: '+ Show Ki Producer',
    collection: 'Our design',
    image: oneManShowProducer,
    price: '₹1,599',
  },
  {
    id: 'limited-edition-owner',
    name: 'Limited Edition',
    subtitle: '+ Owner Of Limited Edition',
    collection: 'Our design',
    image: limitedEditionOwner,
    price: '₹1,699',
  },
  {
    id: 'bigda-hua-bigaadne-wali',
    name: 'Bigda Hua',
    subtitle: '+ Bigaadne Wali',
    collection: 'Our design',
    image: bigdaHuaBigaadneWali,
    price: '₹1,499',
  },
  {
    id: 'trip-sponsor-planner',
    name: 'Trip Sponsor',
    subtitle: '+ Trip Planner',
    collection: 'Our design',
    image: tripSponsorPlanner,
    price: '₹1,599',
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
