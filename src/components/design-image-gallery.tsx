'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export function DesignImageGallery({
  images,
  alt,
  priority,
  imageClassName,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
  imageClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-cream rounded-md ring-1 ring-black/5">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={alt}
              fill
              draggable={false}
              priority={priority && i === 0}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`object-cover select-none ${imageClassName ?? ''}`}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(index - 1);
            }}
            disabled={index === 0}
            className="absolute left-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(index + 1);
            }}
            disabled={index === images.length - 1}
            className="absolute right-2 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            ›
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-4 bg-ivory' : 'w-1.5 bg-ivory/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
