'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ConfirmSubmitButton } from '@/components/confirm-submit-button';
import { formatPrice } from '@/lib/price';
import type { Product } from '@/lib/products';
import { deleteProductAction, moveProductAction, toggleActiveAction } from './products/actions';

export function ProductsTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q),
    );
  }, [products, query]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full max-w-xs rounded-full border border-border bg-white px-4 py-2 text-sm outline-none focus:border-burgundy"
        />
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.15em] text-ink/40">
          {filtered.length} of {products.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[10px] uppercase tracking-[0.2em] text-ink/50">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Collection</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Colors</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                className={`border-b border-border last:border-0 ${i % 2 === 1 ? 'bg-cream/40' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-cream ring-1 ring-black/5">
                    {p.images[0] && (
                      <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-ink/50">{p.subtitle}</div>
                </td>
                <td className="px-4 py-3 text-ink/70">{p.collection}</td>
                <td className="px-4 py-3 font-medium text-burgundy">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  {p.colors.length > 0 ? (
                    <div className="flex -space-x-1">
                      {p.colors.slice(0, 5).map((c, idx) => (
                        <span
                          key={`${c.name}-${idx}`}
                          title={c.name}
                          className="h-4 w-4 rounded-full ring-2 ring-white"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-ink/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.isFeatured ? (
                    <span className="rounded-full bg-burgundy/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-burgundy">
                      Featured
                    </span>
                  ) : (
                    <span className="text-ink/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleActiveAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="active" value={String(p.active)} />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] transition-colors ${
                        p.active
                          ? 'bg-whatsapp/20 text-ink hover:bg-whatsapp/30'
                          : 'bg-black/5 text-ink/50 hover:bg-black/10'
                      }`}
                    >
                      {p.active ? 'Active' : 'Hidden'}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <form action={moveProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button type="submit" className="px-2 py-1 text-ink/50 hover:text-burgundy">
                        ↑
                      </button>
                    </form>
                    <form action={moveProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button type="submit" className="px-2 py-1 text-ink/50 hover:text-burgundy">
                        ↓
                      </button>
                    </form>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-[11px] uppercase tracking-[0.15em] text-ink/60 hover:text-burgundy"
                    >
                      Edit
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <ConfirmSubmitButton
                        confirmMessage={`Delete "${p.name}"? This cannot be undone.`}
                        className="text-[11px] uppercase tracking-[0.15em] text-destructive/80 hover:text-destructive"
                      >
                        Delete
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-ink/50">
                  {products.length === 0
                    ? 'No products yet — add your first one.'
                    : 'No products match your search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
