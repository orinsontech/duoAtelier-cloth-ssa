import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin-shell';
import { ProductForm } from '../../product-form';
import { updateProductAction } from '../../actions';
import { getProductByIdAdmin } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Admin — Edit Product',
  robots: { index: false, follow: false },
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(Number(id));
  if (!product) notFound();

  const action = updateProductAction.bind(null, product.id);

  return (
    <AdminShell title={`Edit — ${product.name}`}>
      <ProductForm product={product} action={action} />
    </AdminShell>
  );
}
