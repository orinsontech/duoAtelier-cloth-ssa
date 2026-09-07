import { query } from '@/lib/db';
import type { Collection } from '@/lib/designs';

export { slugify } from '@/lib/slug';
export { formatPrice } from '@/lib/price';

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  collection: Collection;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  colors: ProductColor[];
  isFeatured: boolean;
  active: boolean;
  sortOrder: number;
};

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  collection: Collection;
  price: string;
  compare_at_price: string | null;
  images: string[];
  colors: ProductColor[] | null;
  is_featured: boolean;
  active: boolean;
  sort_order: number;
};

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle,
    description: row.description,
    collection: row.collection,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price === null ? null : Number(row.compare_at_price),
    images: row.images ?? [],
    colors: row.colors ?? [],
    isFeatured: row.is_featured,
    active: row.active,
    sortOrder: row.sort_order,
  };
}

export async function getAllActiveProducts(): Promise<Product[]> {
  const { rows } = await query<ProductRow>(
    `SELECT * FROM products WHERE active = true ORDER BY sort_order ASC, id ASC`,
  );
  return rows.map(mapRow);
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const { rows } = await query<ProductRow>(
    `SELECT * FROM products WHERE active = true AND is_featured = true
     ORDER BY sort_order ASC, id ASC LIMIT $1`,
    [limit],
  );
  return rows.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { rows } = await query<ProductRow>(
    `SELECT * FROM products WHERE slug = $1 AND active = true LIMIT 1`,
    [slug],
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function getRelatedProducts(
  collection: Collection,
  excludeSlug: string,
  limit = 4,
): Promise<Product[]> {
  const { rows } = await query<ProductRow>(
    `SELECT * FROM products WHERE active = true AND collection = $1 AND slug != $2
     ORDER BY sort_order ASC, id ASC LIMIT $3`,
    [collection, excludeSlug, limit],
  );
  return rows.map(mapRow);
}

// --- Admin ---

export async function getAllProductsAdmin(): Promise<Product[]> {
  const { rows } = await query<ProductRow>(
    `SELECT * FROM products ORDER BY sort_order ASC, id ASC`,
  );
  return rows.map(mapRow);
}

export async function getProductByIdAdmin(id: number): Promise<Product | null> {
  const { rows } = await query<ProductRow>(`SELECT * FROM products WHERE id = $1`, [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

export type ProductInput = {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  collection: Collection;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  colors: ProductColor[];
  isFeatured: boolean;
  active: boolean;
};

export async function createProduct(input: ProductInput): Promise<Product> {
  const { rows } = await query<{ next_sort: number }>(
    `SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_sort FROM products`,
  );
  const sortOrder = rows[0]?.next_sort ?? 1;
  const { rows: inserted } = await query<ProductRow>(
    `INSERT INTO products
       (slug, name, subtitle, description, collection, price, compare_at_price,
        images, colors, is_featured, active, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [
      input.slug,
      input.name,
      input.subtitle,
      input.description,
      input.collection,
      input.price,
      input.compareAtPrice,
      input.images,
      JSON.stringify(input.colors),
      input.isFeatured,
      input.active,
      sortOrder,
    ],
  );
  return mapRow(inserted[0]);
}

export async function updateProduct(id: number, input: ProductInput): Promise<Product> {
  const { rows } = await query<ProductRow>(
    `UPDATE products SET
       slug = $2, name = $3, subtitle = $4, description = $5, collection = $6,
       price = $7, compare_at_price = $8, images = $9, colors = $10, is_featured = $11,
       active = $12, updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      input.slug,
      input.name,
      input.subtitle,
      input.description,
      input.collection,
      input.price,
      input.compareAtPrice,
      input.images,
      JSON.stringify(input.colors),
      input.isFeatured,
      input.active,
    ],
  );
  return mapRow(rows[0]);
}

export async function deleteProduct(id: number): Promise<void> {
  await query(`DELETE FROM products WHERE id = $1`, [id]);
}

export async function setProductActive(id: number, active: boolean): Promise<void> {
  await query(`UPDATE products SET active = $2, updated_at = now() WHERE id = $1`, [id, active]);
}

export async function moveProduct(id: number, direction: 'up' | 'down'): Promise<void> {
  const all = await getAllProductsAdmin();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return;
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= all.length) return;
  const a = all[index];
  const b = all[swapWith];
  await query(`UPDATE products SET sort_order = $2 WHERE id = $1`, [a.id, b.sortOrder]);
  await query(`UPDATE products SET sort_order = $2 WHERE id = $1`, [b.id, a.sortOrder]);
}
