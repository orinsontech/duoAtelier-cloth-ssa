import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME, buildWhatsAppUrl } from "@/lib/site";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 h-16 bg-ivory/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt={`${BRAND_NAME} logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
              priority
            />
            <span className="font-serif text-2xl italic tracking-tight text-ink">
              {BRAND_NAME}
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-ink/70">
            <Link href="/designs" className="hover:text-burgundy transition-colors">
              Collections
            </Link>
            <Link href="/#fabric" className="hover:text-burgundy transition-colors">Fabric</Link>
            <Link href="/#process" className="hover:text-burgundy transition-colors">Process</Link>
          </div>
        </div>
        <a
          href={buildWhatsAppUrl("Hi! I'd like to know more about your customised couple tshirts.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all hover:bg-ink hover:text-ivory active:scale-95"
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
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Image
              src="/logo.jpeg"
              alt={`${BRAND_NAME} logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
            />
            <p className="font-serif text-2xl italic">{BRAND_NAME}</p>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-ink/40">
            Bespoke Couple Apparel
          </p>
        </div>
        <a
          href={buildWhatsAppUrl("Hi! I'd like to place a couple tshirt order.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-xs uppercase tracking-[0.2em] text-ivory transition-transform hover:scale-105"
        >
          Place your order on WhatsApp
        </a>
        <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
          © {new Date().getFullYear()} {BRAND_NAME}
        </p>
      </div>
    </footer>
  );
}
