import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { ProductsTable } from './products-table';
import { getAllProductsAdmin } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Admin — Products',
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const products = await getAllProductsAdmin();
  const activeCount = products.filter((p) => p.active).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  const stats = [
    { label: 'Total products', value: products.length },
    { label: 'Active', value: activeCount },
    { label: 'Hidden', value: products.length - activeCount },
    { label: 'Featured', value: featuredCount },
  ];

  return (
    <AdminShell
      title="Products"
      subtitle="Manage your catalog — add, edit, reorder, and publish."
      action={
        <Link
          href="/admin/products/new"
          className="inline-flex items-center rounded-full bg-burgundy px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-ivory hover:bg-burgundy-deep transition-colors"
        >
          Add product
        </Link>
      }
    >
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-5 ring-1 ring-black/5">
            <span className="block font-serif text-3xl text-burgundy">{s.value}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-ink/50">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <ProductsTable products={products} />
    </AdminShell>
  );
}
