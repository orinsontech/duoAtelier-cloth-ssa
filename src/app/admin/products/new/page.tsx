import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin-shell';
import { ProductForm } from '../product-form';
import { createProductAction } from '../actions';

export const metadata: Metadata = {
  title: 'Admin — Add Product',
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return (
    <AdminShell title="Add product">
      <ProductForm action={createProductAction} />
    </AdminShell>
  );
}
