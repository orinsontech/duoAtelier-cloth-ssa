'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { Product, ProductColor } from '@/lib/products';
import { slugify } from '@/lib/slug';

const COLLECTIONS = ['Couple T Shirt', 'Couple Hoodie', 'Our design'] as const;

const inputClass =
  'w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-burgundy transition-colors text-base font-light';

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (formData: FormData) => void;
}) {
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [colors, setColors] = useState<ProductColor[]>(product?.colors ?? []);
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('#7a1f2b');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onFiles = async (files: FileList) => {
    setUploadError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/admin/products/upload', {
          method: 'POST',
          body: form,
        });
        const data = (await res.json()) as { secure_url?: string; error?: string };
        if (!res.ok || !data.secure_url) {
          throw new Error(data.error ?? 'Upload failed');
        }
        setImages((prev) => [...prev, data.secure_url as string]);
      }
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));
  const moveImage = (i: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const addColor = () => {
    const name = colorName.trim();
    if (!name) return;
    setColors((prev) => [...prev, { name, hex: colorHex }]);
    setColorName('');
  };
  const removeColor = (i: number) => setColors((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <form action={action} className="max-w-3xl space-y-6">
      <input type="hidden" name="images" value={JSON.stringify(images)} readOnly />
      <input type="hidden" name="colors" value={JSON.stringify(colors)} readOnly />

      <FormSection title="Basic info">
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Name</span>
            <input
              name="name"
              defaultValue={product?.name}
              required
              onChange={(e) => {
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Subtitle</span>
            <input name="subtitle" defaultValue={product?.subtitle} className={inputClass} />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Slug</span>
            <input
              name="slug"
              value={slug}
              required
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={inputClass}
            />
            <span className="mt-1 block text-[11px] text-ink/40">
              /customize?design={slug || 'your-slug'}
            </span>
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Collection</span>
            <select
              name="collection"
              defaultValue={product?.collection ?? COLLECTIONS[0]}
              className={inputClass}
            >
              {COLLECTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Description</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description}
            className={inputClass}
          />
        </label>
      </FormSection>

      <FormSection title="Pricing">
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">Price (₹)</span>
            <input
              name="price"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.price}
              required
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
              Compare-at price (₹) — optional
            </span>
            <input
              name="compareAtPrice"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.compareAtPrice ?? undefined}
              className={inputClass}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Images" description="First image is used as the cover.">
        <div className="flex flex-wrap gap-3">
          {images.map((src, i) => (
            <div
              key={src}
              className="group relative h-24 w-24 overflow-hidden rounded-md bg-cream ring-1 ring-black/10"
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-ivory/90 px-1.5 py-0.5 text-[9px] uppercase tracking-wide">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  aria-label="Move left"
                  onClick={() => moveImage(i, -1)}
                  className="px-1 text-xs text-ivory"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => removeImage(i)}
                  className="px-1 text-xs text-ivory"
                >
                  ✕
                </button>
                <button
                  type="button"
                  aria-label="Move right"
                  onClick={() => moveImage(i, 1)}
                  className="px-1 text-xs text-ivory"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="h-24 w-24 rounded-md border border-dashed border-ink/30 text-[10px] uppercase tracking-wide text-ink/50 hover:border-burgundy hover:text-burgundy disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : '+ Add'}
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) onFiles(e.target.files);
            e.target.value = '';
          }}
        />
        {uploadError && <p className="mt-2 text-[11px] text-destructive">{uploadError}</p>}
      </FormSection>

      <FormSection
        title="Colors"
        description="Optional — shown as swatches on the product page."
      >
        {colors.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {colors.map((c, i) => (
              <span
                key={`${c.name}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-border py-1 pl-1.5 pr-3 text-xs"
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="text-ink/40 hover:text-destructive"
                  aria-label={`Remove ${c.name}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            className="h-10 w-10 cursor-pointer rounded border border-border bg-transparent"
            aria-label="Swatch color"
          />
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addColor();
              }
            }}
            placeholder="Color name — e.g. Maroon"
            className="flex-1 border-b border-ink/20 bg-transparent py-2 text-sm outline-none focus:border-burgundy"
          />
          <button
            type="button"
            onClick={addColor}
            className="rounded-full border border-ink/20 px-4 py-2 text-[10px] uppercase tracking-wide hover:border-burgundy hover:text-burgundy"
          >
            + Add
          </button>
        </div>
      </FormSection>

      <FormSection title="Visibility">
        <div className="grid sm:grid-cols-2 gap-4">
          <ToggleField
            name="isFeatured"
            label="Featured on homepage"
            defaultChecked={product?.isFeatured}
          />
          <ToggleField
            name="active"
            label="Active (visible on site)"
            defaultChecked={product?.active ?? true}
          />
        </div>
      </FormSection>

      <button
        type="submit"
        disabled={uploading}
        className="inline-flex items-center rounded-full bg-burgundy px-8 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold text-ivory transition-colors hover:bg-burgundy-deep disabled:opacity-60"
      >
        {product ? 'Save changes' : 'Create product'}
      </button>
    </form>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-white p-6 ring-1 ring-black/5">
      <div className="mb-5">
        <h2 className="font-serif text-xl">{title}</h2>
        {description && <p className="mt-1 text-[11px] text-ink/50">{description}</p>}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function ToggleField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
      <span className="text-sm">{label}</span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-burgundy" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
