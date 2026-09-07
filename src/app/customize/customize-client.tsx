'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { Truck, RefreshCw, ShieldCheck, Banknote } from 'lucide-react';
import { SiteNav, SiteFooter } from '@/components/site-nav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { fabrics } from '@/lib/designs';
import { buildWhatsAppUrl, SITE_URL } from '@/lib/site';
import { uploadReferenceImage } from '@/lib/cloudinary';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/price';

const detailsSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  phone: z.string().trim().min(7, 'Valid phone required').max(20),
  address: z.string().trim().min(10, 'Full address required').max(500),
  size1: z.string().min(1, 'Select size'),
  size2: z.string().min(1, 'Select size'),
  notes: z.string().max(500).optional(),
});

const fixedDesignSchema = z.object({
  size1: z.string().min(1, 'Select size'),
  size2: z.string().min(1, 'Select size'),
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function toAbsoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

export function CustomizePage({
  product,
  relatedProducts,
}: {
  product: Product | null;
  relatedProducts: Product[];
}) {
  const isFixedDesign = product?.collection === 'Our design';
  const productTitle = product
    ? isFixedDesign
      ? `${product.name} - ${product.subtitle.replace(/^\+\s*/, '')}`
      : product.name
    : 'Customize your Couple Tshirt';

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(product?.images[0] ?? null);
  const [fileName, setFileName] = useState<string | null>(
    product ? `${productTitle} (from catalog)` : null,
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [fabric, setFabric] = useState<string>('180 GSM');
  const [color, setColor] = useState<string>(product?.colors[0]?.name ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onFile = (f: File) => {
    setFile(f);
    setFileName(f.name);
    setUploadError(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  useEffect(() => {
    const tryRestore = async () => {
      try {
        const blobUrl = sessionStorage.getItem('da_uploaded_preview');
        const name = sessionStorage.getItem('da_uploaded_name');
        if (blobUrl && name && !file) {
          const resp = await fetch(blobUrl);
          if (resp.ok) {
            const b = await resp.blob();
            const reconstructed = new File([b], name, { type: b.type });
            onFile(reconstructed);
            sessionStorage.removeItem('da_uploaded_preview');
            sessionStorage.removeItem('da_uploaded_name');
          } else {
            setPreview(blobUrl);
            setFileName(name);
          }
        }
      } catch {
        // Non-fatal — if reconstruction fails, the user can re-upload here.
      }
    };

    tryRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFixedDesign && product) {
      const form = new FormData(e.currentTarget);
      const data = {
        size1: String(form.get('size1') ?? ''),
        size2: String(form.get('size2') ?? ''),
      };
      const parsed = fixedDesignSchema.safeParse(data);
      if (!parsed.success) {
        const errs: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          errs[String(issue.path[0])] = issue.message;
        }
        setErrors(errs);
        return;
      }
      setErrors({});

      const imageUrl = product.images[0] ? toAbsoluteUrl(product.images[0]) : null;
      const lines = [
        '*New Couple Tshirt Order — Willy-Nilly*',
        '',
        `*Design:* ${productTitle}`,
        `*Collection:* ${product.collection}`,
        `*Fabric:* ${fabric}`,
        color ? `*Color:* ${color}` : null,
        `*Price:* ${formatPrice(product.price)}`,
        `*Size (Her):* ${data.size1}`,
        `*Size (Him):* ${data.size2}`,
        '',
        "I'll share my delivery details in this chat.",
        imageUrl ? `*Reference photo:* ${imageUrl}` : null,
      ]
        .filter(Boolean)
        .join('\n');
      window.open(buildWhatsAppUrl(lines), '_blank');
      return;
    }

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get('name') ?? ''),
      phone: String(form.get('phone') ?? ''),
      address: String(form.get('address') ?? ''),
      size1: String(form.get('size1') ?? ''),
      size2: String(form.get('size2') ?? ''),
      notes: String(form.get('notes') ?? ''),
    };
    const parsed = detailsSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setUploadError(null);

    let imageUrl: string | null = null;
    if (file) {
      setSubmitting(true);
      try {
        imageUrl = await uploadReferenceImage(file);
      } catch {
        setUploadError(
          "Couldn't upload the photo — you can attach it manually in WhatsApp instead.",
        );
      } finally {
        setSubmitting(false);
      }
    } else if (!file && product?.images[0]) {
      imageUrl = toAbsoluteUrl(product.images[0]);
    }

    const lines = [
      '*New Couple Tshirt Order — Willy-Nilly*',
      '',
      `*Design:* ${product ? productTitle : fileName ? `Custom upload — ${fileName}` : 'Custom upload'}`,
      product ? `*Collection:* ${product.collection}` : null,
      product ? `*Price:* ${formatPrice(product.price)}` : null,
      `*Fabric:* ${fabric}`,
      color ? `*Color:* ${color}` : null,
      `*Size (Her):* ${data.size1}`,
      `*Size (Him):* ${data.size2}`,
      '',
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Address:* ${data.address}`,
      data.notes ? `*Notes:* ${data.notes}` : null,
      '',
      imageUrl
        ? `*Reference photo:* ${imageUrl}`
        : "I'll share the reference image in this chat next 🙌",
    ]
      .filter(Boolean)
      .join('\n');

    window.open(buildWhatsAppUrl(lines), '_blank');
  };

  const showGallery = !file && product && product.images.length > 0;
  const galleryImages = product?.images ?? [];

  return (
    <div className="min-h-screen bg-ivory text-ink pb-28 lg:pb-0">
      <SiteNav />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 text-[11px] uppercase tracking-[0.15em] text-ink/40">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/designs" className="hover:text-burgundy transition-colors">
          {product ? product.collection : 'Customize'}
        </Link>
        {product && (
          <>
            <span className="mx-2">/</span>
            <span className="text-ink/70">{productTitle}</span>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} id="product-form">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: GALLERY */}
          <div className="lg:sticky lg:top-24">
            {showGallery ? (
              <div>
                <div className="relative aspect-[4/5] rounded-md ring-1 ring-black/5 bg-cream overflow-hidden">
                  <Image
                    src={galleryImages[galleryIndex]}
                    alt={productTitle}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {galleryImages.length > 1 && (
                  <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
                    {galleryImages.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setGalleryIndex(i)}
                        className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-md transition-all ${
                          i === galleryIndex
                            ? 'ring-2 ring-burgundy'
                            : 'ring-1 ring-black/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-[4/5] rounded-md ring-1 ring-black/5 bg-cream overflow-hidden grid place-items-center">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Reference preview"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    unoptimized={preview.startsWith('blob:')}
                  />
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    No image yet
                  </span>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: INFO PANEL */}
          <div className="lg:sticky lg:top-24 space-y-9">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">
                {product ? product.collection : 'Bespoke Order'}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl italic mt-3 text-balance">
                {productTitle}
              </h1>

              {product ? (
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl text-burgundy font-medium">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-base text-ink/40 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-ink/40">inclusive of taxes</span>
                </div>
              ) : (
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink/40">
                  Final price confirmed on WhatsApp
                </p>
              )}

              <p className="mt-5 text-sm text-ink/70 leading-relaxed max-w-md">
                {product
                  ? product.description ||
                    `You've selected "${productTitle}" from our catalog. Choose your fabric and size below.`
                  : "Upload a photo you love — a couple portrait, a mood image, or a design sketch. We'll craft the print from it."}
              </p>

              {!isFixedDesign && (
                <div className="mt-6">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onFile(f);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[11px] uppercase tracking-[0.25em] hover:border-ink hover:bg-cream"
                  >
                    {file ? 'Replace image' : product ? 'Or upload your own design' : 'Upload your design'}
                  </button>
                  {fileName && (
                    <p className="mt-3 text-xs text-ink/50">Selected: {fileName}</p>
                  )}
                  {uploadError && (
                    <p className="mt-2 text-xs text-destructive">{uploadError}</p>
                  )}
                </div>
              )}
            </div>

            {/* FABRIC */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                Fabric weight
              </span>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {fabrics.map((f) => {
                  const active = fabric === f.gsm;
                  return (
                    <button
                      key={f.gsm}
                      type="button"
                      onClick={() => setFabric(f.gsm)}
                      className={`text-left p-3 rounded-lg border transition-colors ${
                        active
                          ? 'border-burgundy bg-burgundy/5'
                          : 'border-border hover:border-ink'
                      }`}
                    >
                      <span className="block font-serif text-lg">{f.gsm}</span>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-burgundy font-medium mt-0.5 block">
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLOR */}
            {product && product.colors.length > 0 && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                  Color{color ? ` — ${color}` : ''}
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      title={c.name}
                      onClick={() => setColor(c.name)}
                      className={`h-9 w-9 rounded-full ring-1 ring-black/10 transition-all ${
                        color === c.name
                          ? 'ring-2 ring-offset-2 ring-burgundy'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SizePicker label="Size — Her" name="size1" error={errors.size1} />
              <SizePicker label="Size — Him" name="size2" error={errors.size2} />
            </div>

            {/* CUSTOM ORDER DETAILS */}
            {!isFixedDesign && (
              <div className="space-y-6 border-t border-border pt-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                  Your details
                </span>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Full name"
                    name="name"
                    error={errors.name}
                    placeholder="Aanya Kapoor"
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    error={errors.phone}
                    placeholder="+91 98xxxxxxxx"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Delivery address"
                      name="address"
                      textarea
                      error={errors.address}
                      placeholder="Flat, street, city, state, PIN"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Anything special? (names, dates, colours)"
                      name="notes"
                      textarea
                      placeholder="Optional — e.g. embroider 'A & R since 12.07.2024'"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-border py-6">
              <TrustBadge icon={Banknote} label="Cash on delivery available" />
              <TrustBadge icon={Truck} label="Pan-India shipping" />
              <TrustBadge icon={ShieldCheck} label="Made to order, with care" />
              <TrustBadge icon={RefreshCw} label="Easy size exchange" />
            </div>

            {/* CTA */}
            <div>
              <button
                type="submit"
                form="product-form"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-whatsapp text-ink px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold shadow-luxe hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? 'Uploading photo…' : 'Place order on WhatsApp'}
              </button>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-ink/40">
                or{' '}
                <Link href="/designs" className="border-b border-ink/30">
                  browse more designs
                </Link>
              </p>
            </div>

            {/* ACCORDIONS */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.2em]">
                  Product details
                </AccordionTrigger>
                <AccordionContent className="text-sm text-ink/60 leading-relaxed">
                  {product?.description ||
                    'Every piece is cut and printed to order — expect small, lovely variations from batch to batch.'}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="fabric">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.2em]">
                  Fabric &amp; care
                </AccordionTrigger>
                <AccordionContent className="text-sm text-ink/60 leading-relaxed">
                  100% combed cotton, milled in 180–280 GSM weights. Machine wash cold,
                  inside out, with like colours. Do not bleach. Iron on reverse.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-[11px] uppercase tracking-[0.2em]">
                  Shipping &amp; returns
                </AccordionTrigger>
                <AccordionContent className="text-sm text-ink/60 leading-relaxed">
                  Made to order and dispatched within 3–5 business days, shipped
                  pan-India. Wrong size or a print issue? Easy exchange within 7 days
                  of delivery — just message us on WhatsApp.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </form>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border py-16 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl italic mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.slug} href={`/customize?design=${encodeURIComponent(p.slug)}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md ring-1 ring-black/5 bg-cream">
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-base">{p.name}</h3>
                  <p className="mt-1 text-sm text-burgundy font-medium">
                    {formatPrice(p.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-ivory/95 backdrop-blur px-5 py-3 lg:hidden">
        <div>
          {product ? (
            <span className="block text-lg font-medium text-burgundy">
              {formatPrice(product.price)}
            </span>
          ) : (
            <span className="block text-[10px] uppercase tracking-[0.2em] text-ink/50">
              Price on WhatsApp
            </span>
          )}
        </div>
        <button
          type="submit"
          form="product-form"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp text-ink px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold shadow-luxe disabled:opacity-60"
        >
          {submitting ? 'Uploading…' : 'Order on WhatsApp'}
        </button>
      </div>
    </div>
  );
}

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 shrink-0 text-burgundy" />
      <span className="text-[11px] text-ink/60 leading-tight">{label}</span>
    </div>
  );
}

function SizePicker({
  label,
  name,
  error,
}: {
  label: string;
  name: string;
  error?: string;
}) {
  const [value, setValue] = useState('');
  return (
    <div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">{label}</span>
      <input type="hidden" name={name} value={value} />
      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setValue(s)}
            className={`h-9 min-w-9 px-2 rounded-full border text-xs uppercase tracking-wide transition-colors ${
              value === s
                ? 'border-burgundy bg-burgundy text-ivory'
                : 'border-ink/20 hover:border-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </div>
  );
}

function Field({
  label,
  name,
  error,
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const shared =
    'w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-burgundy transition-colors text-base font-light placeholder:text-ink/30';
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">{label}</span>
      {textarea ? (
        <textarea name={name} rows={2} placeholder={placeholder} className={shared} />
      ) : (
        <input name={name} type="text" placeholder={placeholder} className={shared} />
      )}
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
