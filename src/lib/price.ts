export function formatPrice(price: number) {
  return `₹${Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(price)}`;
}
