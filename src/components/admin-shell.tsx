import Link from 'next/link';
import { logout } from '@/app/admin/login/actions';

export function AdminShell({
  children,
  title,
  subtitle,
  action,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-10 border-b border-border bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-serif text-xl italic">Willy-Nilly</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40">Admin</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-[11px] uppercase tracking-[0.2em] text-ink/60 hover:text-burgundy transition-colors"
            >
              Products
            </Link>
            <Link
              href="/admin/products/new"
              className="text-[11px] uppercase tracking-[0.2em] text-ink/60 hover:text-burgundy transition-colors"
            >
              Add product
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-[11px] uppercase tracking-[0.2em] text-ink/50 hover:text-destructive transition-colors"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-ink/50">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
