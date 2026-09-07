'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '@/lib/slug';
import {
  createProduct,
  deleteProduct,
  moveProduct,
  setProductActive,
  updateProduct,
  type ProductColor,
  type ProductInput,
} from '@/lib/products';

function revalidatePublicPaths() {
  revalidatePath('/');
  revalidatePath('/designs');
  revalidatePath('/customize');
  revalidatePath('/admin');
}

function parseInput(formData: FormData): ProductInput {
  const name = String(formData.get('name') ?? '').trim();
  const subtitle = String(formData.get('subtitle') ?? '').trim();
  const slugRaw = String(formData.get('slug') ?? '').trim();
  const collection = String(
    formData.get('collection') ?? 'Couple T Shirt',
  ) as ProductInput['collection'];
  const price = Number(formData.get('price'));
  const compareAtPriceRaw = String(formData.get('compareAtPrice') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const imagesRaw = String(formData.get('images') ?? '[]');
  const colorsRaw = String(formData.get('colors') ?? '[]');

  if (!name) throw new Error('Product name is required.');
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('Price must be a positive number.');
  }

  let images: string[] = [];
  try {
    const parsed = JSON.parse(imagesRaw);
    if (Array.isArray(parsed)) images = parsed.filter((x) => typeof x === 'string');
  } catch {
    images = [];
  }

  let colors: ProductColor[] = [];
  try {
    const parsed = JSON.parse(colorsRaw);
    if (Array.isArray(parsed)) {
      colors = parsed.filter(
        (c): c is ProductColor =>
          c && typeof c.name === 'string' && typeof c.hex === 'string',
      );
    }
  } catch {
    colors = [];
  }

  return {
    slug: slugify(slugRaw || name),
    name,
    subtitle,
    description,
    collection,
    price,
    compareAtPrice: compareAtPriceRaw ? Number(compareAtPriceRaw) : null,
    images,
    colors,
    isFeatured: formData.get('isFeatured') === 'on',
    active: formData.get('active') === 'on',
  };
}

export async function createProductAction(formData: FormData) {
  const input = parseInput(formData);
  await createProduct(input);
  revalidatePublicPaths();
  redirect('/admin');
}

export async function updateProductAction(id: number, formData: FormData) {
  const input = parseInput(formData);
  await updateProduct(id, input);
  revalidatePublicPaths();
  redirect('/admin');
}

export async function deleteProductAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) return;
  await deleteProduct(id);
  revalidatePublicPaths();
}

export async function toggleActiveAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const currentlyActive = formData.get('active') === 'true';
  if (!Number.isFinite(id)) return;
  await setProductActive(id, !currentlyActive);
  revalidatePublicPaths();
}

export async function moveProductAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const direction = formData.get('direction') === 'up' ? 'up' : 'down';
  if (!Number.isFinite(id)) return;
  await moveProduct(id, direction);
  revalidatePublicPaths();
}
