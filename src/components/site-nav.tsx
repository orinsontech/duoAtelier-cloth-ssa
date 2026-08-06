import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, buildWhatsAppUrl } from '@/lib/site';

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="flex items-center min-w-0">
            <Image
              src="/logo.png"
              alt={`${BRAND_NAME} logo`}
              width={660}
              height={146}
              className="h-7 w-auto shrink-0 sm:h-8"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-ink/70">
            <Link
              href="/designs"
              className="hover:text-burgundy transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/#fabric"
              className="hover:text-burgundy transition-colors"
            >
              Fabric
            </Link>
            <Link
              href="/#how-to-order"
              className="hover:text-burgundy transition-colors"
            >
              How to Order
            </Link>
          </div>
        </div>
        <a
          href={buildWhatsAppUrl(
            "Hi! I'd like to know more about your customised couple tshirts.",
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-ink/15 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.06em] font-medium transition-all hover:bg-ink hover:text-ivory active:scale-95 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.2em]"
        >
          Order on WhatsApp
        </a>
      </div>
    </nav>
  );
}

export function StickyWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl("Hi! I'd like to place a couple tshirt order.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-burgundy px-5 py-3 text-ivory shadow-luxe transition-transform hover:-translate-y-1"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ivory opacity-60"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ivory"></span>
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
        Order on WhatsApp
      </span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-16 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src="/logo.png"
                alt={`${BRAND_NAME} logo`}
                width={660}
                height={146}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-ink/40">
              Bespoke Couple Apparel
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(
              "Hi! I'd like to place a couple tshirt order.",
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ivory transition-transform hover:scale-105"
          >
            Place your order on WhatsApp
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-8 text-center md:text-left">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-ink/50">
            <Link href="/contact" className="hover:text-burgundy transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-burgundy transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-burgundy transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-burgundy transition-colors">
              Refund Policy
            </Link>
          </nav>
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
