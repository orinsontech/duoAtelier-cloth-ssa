'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SiteNav, SiteFooter, StickyWhatsApp } from '@/components/site-nav';
import { CoupleStoryVideos } from '@/components/couple-story-videos';
import { collections, topDesigns, fabrics } from '@/lib/designs';
import { buildWhatsAppUrl } from '@/lib/site';

export function Landing() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onUploadPick = (file: File) => {
    // Stash a lightweight token; the customize page reads it and asks
    // the user to re-select if the tab was fully closed.
    try {
      sessionStorage.setItem('da_uploaded_name', file.name);
      // Create an object URL so we can show a preview on the next page.
      // We'll store the blob URL (string) in sessionStorage and attempt
      // to reconstruct the File there for upload. This keeps the UX
      // smooth during client navigation while avoiding exposing the
      // binary in the URL.
      const blobUrl = URL.createObjectURL(file);
      sessionStorage.setItem('da_uploaded_preview', blobUrl);
    } catch {}
    router.push('/customize?source=upload');
  };

  return (
    <div className="min-h-screen bg-ivory text-ink font-sans">
      <SiteNav />

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUploadPick(f);
        }}
      />

      {/* HERO */}
      <header className="pt-16 pb-16 px-6 lg:px-10 text-center bg-gradient-to-b from-cream via-ivory to-ivory">
        <span className="animate-fade-up inline-block text-[10px] uppercase tracking-[0.35em] text-burgundy mb-6">
          The Bespoke Couple Atelier
        </span>
        <h1 className="animate-fade-up font-serif text-5xl md:text-7xl lg:text-[92px] leading-[0.95] text-balance max-w-5xl mx-auto">
          Personalize it with your names, quotes, photos,{' '}
          <span className="italic text-burgundy">
            or choose from our exclusive collection.
          </span>
        </h1>
        <p className="animate-fade-up mt-8 text-base md:text-lg text-ink/60 max-w-xl mx-auto text-pretty">
          Customized your Couple Tshirt and order on WhatsApp. Tailored in
          premium cotton for the moments that matter most.
        </p>

        <div className="animate-fade-up mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="bg-burgundy text-ivory px-9 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-burgundy-deep transition-colors"
          >
            Upload your design
          </button>
          <Link
            href="/designs"
            className="border border-ink/20 px-9 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium hover:border-ink hover:bg-cream transition-colors"
          >
            Explore our Designs
          </Link>
        </div>

        <div className="animate-fade-up mt-20 max-w-6xl mx-auto">
          <div className="relative aspect-video rounded-t-[160px] overflow-hidden ring-1 ring-black/5 shadow-luxe">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/hero.jpg"
            >
              {/* Drop your MP4 in /public and reference it here to enable video */}
              {/* <source src="/hero.mp4" type="video/mp4" /> */}
            </video>
            <Image
              src="/assets/hero.jpg"
              alt="Couple in matching custom tshirts"
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-ink/10" />
            <button className="absolute bottom-8 right-8 flex items-center gap-3 rounded-full bg-ivory/90 backdrop-blur px-5 py-3 text-[10px] uppercase tracking-[0.25em] font-medium">
              <span className="grid place-items-center w-6 h-6 rounded-full bg-burgundy text-ivory">
                ▶
              </span>
              Play film
            </button>
          </div>
        </div>
      </header>

      {/* COLLECTIONS */}
      <section id="collections" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy">
                (01) The Anthology
              </span>
              <h2 className="font-serif text-4xl md:text-5xl italic mt-3">
                The Collections
              </h2>
            </div>
            <Link
              href="/designs"
              className="hidden md:inline-block text-[11px] uppercase tracking-[0.25em] border-b border-ink/30 pb-0.5 hover:border-burgundy hover:text-burgundy"
            >
              Browse all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((c) => (
              <Link
                key={c.name}
                href={`/designs?collection=${encodeURIComponent(c.name)}`}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md ring-1 ring-black/5">
                  <Image
                    src={c.image}
                    alt={`${c.name} Collection`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl italic mt-4">
                  {c.name} Collection
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">
                  {c.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FABRIC */}
      <section id="fabric" className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start gap-12">
          <div className="lg:w-1/3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy">
              (02) Material Archive
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-3">
              Choose your weight
            </h2>
            <p className="mt-4 text-sm text-ink/60 max-w-md">
              Every tshirt is milled from ethically-sourced 100% cotton. Select
              the weight that defines your silhouette.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            {fabrics.map((f, i) => (
              <div
                key={f.gsm}
                className={`p-6 rounded-xl text-center border transition-colors ${
                  i === 1
                    ? 'border-burgundy bg-burgundy/5'
                    : 'border-border hover:border-ink'
                }`}
              >
                <span className="block font-serif text-2xl mb-1">{f.gsm}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-burgundy font-medium block">
                  {f.label}
                </span>
                <span className="text-[11px] text-ink/50 mt-2 block">
                  {f.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP DESIGNS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy">
              (03) From our Atelier
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic mt-3">
              Top Designs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {topDesigns.map((d) => (
              <div key={d.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream ring-1 ring-black/5 rounded-md">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-xl">{d.name}</h4>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">
                      {d.subtitle}
                    </p>
                    <p className="mt-2 text-sm text-burgundy font-medium">
                      {d.price}
                    </p>
                  </div>
                  {d.collection === "Our design" ? (
                    <Link
                      href={`/customize?design=${encodeURIComponent(d.id)}`}
                      className="text-[10px] uppercase tracking-[0.2em] font-semibold text-burgundy border-b border-burgundy/60 pb-0.5 hover:text-burgundy-deep whitespace-nowrap"
                    >
                      Order on WhatsApp
                    </Link>
                  ) : (
                    <Link
                      href={`/customize?design=${encodeURIComponent(d.id)}`}
                      className="text-[10px] uppercase tracking-[0.2em] font-semibold text-burgundy border-b border-burgundy/60 pb-0.5 hover:text-burgundy-deep whitespace-nowrap"
                    >
                      Customize your Tshirt
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy">
              (04) Worn with Love
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic mt-3">
              Stories from our Couples
            </h2>
          </div>
          <CoupleStoryVideos />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-burgundy">
              (05) The Ritual
            </span>
            <h2 className="font-serif text-4xl md:text-5xl italic mt-3">
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              ['01', 'Upload', 'Share a photo or design reference.'],
              ['02', 'Pick Fabric', '180 to 280 GSM — your feel.'],
              ['03', 'Add Details', 'Name, address, sizes.'],
              ['04', 'WhatsApp Order', 'Confirm on WhatsApp. Done.'],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span className="font-serif text-4xl italic text-burgundy">
                  {n}
                </span>
                <h4 className="mt-3 text-xs uppercase tracking-[0.25em] font-semibold">
                  {t}
                </h4>
                <p className="mt-2 text-sm text-ink/60 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a
              href={buildWhatsAppUrl(
                "Hi! I'd like to start a couple tshirt order.",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-burgundy text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-burgundy-deep transition-colors"
            >
              Start your order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}
