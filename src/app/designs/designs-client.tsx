"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNav, SiteFooter, StickyWhatsApp } from "@/components/site-nav";
import { allDesigns, type Collection } from "@/lib/designs";

const TABS = ["Customize Designs", "Our Designs"] as const;
type Tab = (typeof TABS)[number];

const CUSTOMIZE_SUB_TABS = ["Couple T Shirt", "Couple Hoodie"] as const;
type CustomizeSubTab = (typeof CUSTOMIZE_SUB_TABS)[number];

function tabForCollection(collection?: Collection): Tab {
  return collection === "Our design" ? "Our Designs" : "Customize Designs";
}

function subTabForCollection(collection?: Collection): CustomizeSubTab {
  return collection === "Couple Hoodie" ? "Couple Hoodie" : "Couple T Shirt";
}

export function DesignsPage({ initialCollection }: { initialCollection?: Collection }) {
  const [active, setActive] = useState<Tab>(tabForCollection(initialCollection));
  const [subTab, setSubTab] = useState<CustomizeSubTab>(subTabForCollection(initialCollection));
  const filtered = allDesigns.filter((d) =>
    active === "Our Designs" ? d.collection === "Our design" : d.collection === subTab,
  );

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteNav />
      <header className="px-6 lg:px-10 pt-16 pb-10 text-center border-b border-border">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">The Archive</span>
        <h1 className="font-serif text-5xl md:text-6xl italic mt-4">Explore all the designs</h1>
        <p className="mt-4 text-sm text-ink/60 max-w-md mx-auto">
          Pick your favourite design, customise it, or order on WhatsApp.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`w-44 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                active === t
                  ? "bg-burgundy text-ivory border-burgundy"
                  : "border-ink/15 text-ink/70 hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {active === "Customize Designs" && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {CUSTOMIZE_SUB_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setSubTab(t)}
                className={`px-5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] border transition-colors ${
                  subTab === t
                    ? "bg-ink text-ivory border-ink"
                    : "border-ink/15 text-ink/60 hover:border-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </header>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((d, i) => (
            <div key={d.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream rounded-md ring-1 ring-black/5">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  priority={i < 4}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <h3 className="mt-4 font-serif text-lg whitespace-nowrap">{d.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">{d.collection}</p>
              <p className="mt-1 text-sm text-burgundy font-medium">{d.price}</p>
              <Link
                href={`/customize?design=${encodeURIComponent(d.id)}`}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-burgundy px-4 py-2 text-center text-[10px] uppercase tracking-[0.2em] font-semibold text-ivory transition-colors hover:bg-burgundy-deep"
              >
                Buy Now - {d.collection === "Our design" ? "Order on WhatsApp" : "Customize your Tshirt"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}
