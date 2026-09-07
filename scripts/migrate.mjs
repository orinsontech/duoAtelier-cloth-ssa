// Creates the products table (if missing) and seeds it with the current
// catalog on first run. Safe to re-run — seeding is skipped once any row exists.
//
// Usage: npm run db:migrate
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DB_URL;
if (!connectionString) {
  console.error('Missing DB_URL environment variable.');
  process.exit(1);
}

const pool = new Pool({ connectionString });

const SEED_PRODUCTS = [
  {
    slug: 'monogram-essential',
    name: 'Monogram Essential',
    subtitle: 'Embroidered initials',
    description:
      'Our signature couple tee with hand-finished monogram embroidery — a timeless pick for everyday matching.',
    collection: 'Couple T Shirt',
    price: 1499,
    images: [
      '/assets/Monogram-Essential-1.png',
      '/assets/Monogram-Essential-2.jpg',
      '/assets/Monogram-Essential-3.jpg',
    ],
    isFeatured: true,
  },
  {
    slug: 'sold-out-proud-owner',
    name: 'Sold Out + Proud Owner',
    subtitle: '+ Proud Owner',
    description:
      'A playful his-and-hers print from our atelier collection — bold graphic type, made to order.',
    collection: 'Our design',
    price: 1499,
    images: [
      '/assets/our-design/sold-out-proud-owner-white.jpg',
      '/assets/our-design/sold-out-proud-owner-black.jpg',
    ],
    isFeatured: true,
  },
  {
    slug: 'hero-director',
    name: 'Hero + Director',
    subtitle: '+ Director',
    description:
      'A signature atelier print pairing "Hero" with "Director" — a fun nod to who really runs the show.',
    collection: 'Our design',
    price: 1499,
    images: [
      '/assets/our-design/hero-director-white.jpg',
      '/assets/our-design/hero-director-black.jpg',
    ],
    isFeatured: true,
  },
  {
    slug: 'route-66',
    name: 'Route 66',
    subtitle: 'Street hoodie series',
    description:
      'Cozy, oversized couple hoodies with a road-trip graphic — built for cool evenings and matching selfies.',
    collection: 'Couple Hoodie',
    price: 2499,
    images: ['/assets/col-trip-2.jpg'],
    isFeatured: false,
  },
  {
    slug: 'vows',
    name: 'Vows',
    subtitle: 'Minimal couple hoodie',
    description: 'A minimal, understated hoodie for couples who like their matching subtle.',
    collection: 'Couple Hoodie',
    price: 2499,
    images: ['/assets/hoodie-2.jpg'],
    isFeatured: false,
  },
  {
    slug: 'always',
    name: 'Always',
    subtitle: 'Signature tee classic',
    description: 'Our classic matching tee — soft, breathable, and made to last.',
    collection: 'Couple T Shirt',
    price: 1499,
    images: ['/assets/always-1.png', '/assets/always-2.jpg'],
    isFeatured: false,
  },
  {
    slug: 'island',
    name: 'Island Days',
    subtitle: 'Premium tee fit',
    description: 'A premium relaxed fit tee inspired by honeymoon mornings.',
    collection: 'Couple T Shirt',
    price: 1499,
    images: ['/assets/col-honeymoon.jpg'],
    isFeatured: false,
  },
  {
    slug: 'limited-edition-owner',
    name: 'Limited Edition + Owner Of Limited Edition',
    subtitle: '+ Owner Of Limited Edition',
    description: 'A signature atelier print for the one-of-a-kind couple.',
    collection: 'Our design',
    price: 1499,
    images: [
      '/assets/our-design/limited-edition-owner-white.jpg',
      '/assets/our-design/limited-edition-owner-black.jpg',
    ],
    isFeatured: false,
  },
  {
    slug: 'booked-booking-confirmed',
    name: 'Booked + Booking Confirmed',
    subtitle: '+ Booking Confirmed',
    description: 'A signature atelier print — perfect for the newly engaged.',
    collection: 'Our design',
    price: 1499,
    images: [
      '/assets/our-design/booked-booking-confirmed-white.jpg',
      '/assets/our-design/booked-booking-confirmed-black.jpg',
    ],
    isFeatured: false,
  },
];

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      collection TEXT NOT NULL CHECK (collection IN ('Couple T Shirt','Couple Hoodie','Our design')),
      price NUMERIC(10,2) NOT NULL,
      compare_at_price NUMERIC(10,2),
      images TEXT[] NOT NULL DEFAULT '{}',
      colors JSONB NOT NULL DEFAULT '[]',
      is_featured BOOLEAN NOT NULL DEFAULT false,
      active BOOLEAN NOT NULL DEFAULT true,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await pool.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS colors JSONB NOT NULL DEFAULT '[]';`);
  console.log('✓ products table ready');

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products');
  if (rows[0].count > 0) {
    console.log(`✓ products table already has ${rows[0].count} rows — skipping seed`);
    return;
  }

  for (const [i, p] of SEED_PRODUCTS.entries()) {
    await pool.query(
      `INSERT INTO products
         (slug, name, subtitle, description, collection, price, images, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [p.slug, p.name, p.subtitle, p.description, p.collection, p.price, p.images, p.isFeatured, i + 1],
    );
  }
  console.log(`✓ seeded ${SEED_PRODUCTS.length} products`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
