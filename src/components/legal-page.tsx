import { SiteNav, SiteFooter, StickyWhatsApp } from "@/components/site-nav";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteNav />
      <header className="px-6 lg:px-10 pt-16 pb-10 text-center border-b border-border">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">
          {eyebrow}
        </span>
        <h1 className="font-serif text-5xl md:text-6xl italic mt-4">
          {title}
        </h1>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink/40">
          Last updated {updated}
        </p>
      </header>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed text-ink/70 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:not-italic [&_h2]:mb-3 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-burgundy [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </section>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}
