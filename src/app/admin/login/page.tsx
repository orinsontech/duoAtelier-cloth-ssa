import type { Metadata } from 'next';
import { login } from './actions';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-ivory text-ink grid place-items-center px-6">
      <div className="w-full max-w-sm">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">
          Willy-Nilly
        </span>
        <h1 className="font-serif text-3xl italic mt-2">Admin Login</h1>
        <form action={login} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
              Username
            </span>
            <input
              name="username"
              type="text"
              autoFocus
              required
              autoComplete="username"
              className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-burgundy transition-colors text-base font-light"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-burgundy transition-colors text-base font-light"
            />
          </label>
          {error && (
            <p className="text-[11px] text-destructive">
              Incorrect username or password. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-full bg-burgundy px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold text-ivory transition-colors hover:bg-burgundy-deep"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
