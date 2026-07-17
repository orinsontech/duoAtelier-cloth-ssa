"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNav, SiteFooter, StickyWhatsApp } from "@/components/site-nav";
import { allDesigns, collections, type Collection } from "@/lib/designs";

export function DesignsPage({ initialCollection }: { initialCollection?: Collection }) {
  const [active, setActive] = useState<Collection | "All">(initialCollection ?? "All");
  const filtered = active === "All" ? allDesigns : allDesigns.filter((d) => d.collection === active);

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteNav />
      <header className="px-6 lg:px-10 pt-16 pb-10 text-center border-b border-border">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">The Archive</span>
        <h1 className="font-serif text-5xl md:text-6xl italic mt-4">Explore all the designs</h1>
        <p className="mt-4 text-sm text-ink/60 max-w-md mx-auto">
          Every design can be customised. Pick your favourite, choose your fabric, and order on WhatsApp.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(["All", ...collections.map((c) => c.name)] as (Collection | "All")[]).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                active === c
                  ? "bg-burgundy text-ivory border-burgundy"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((d) => (
            <div key={d.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream rounded-md ring-1 ring-black/5">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg">{d.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">{d.collection}</p>
                  <p className="mt-1 text-sm text-burgundy font-medium">{d.price}</p>
                </div>
                <Link
                  href={`/customize?design=${encodeURIComponent(d.id)}`}
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold text-burgundy border-b border-burgundy/60 pb-0.5 hover:text-burgundy-deep whitespace-nowrap"
                >
                  Customize your Tshirt
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}
