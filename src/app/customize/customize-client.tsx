'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import { SiteNav, SiteFooter, StickyWhatsApp } from '@/components/site-nav';
import { allDesigns, fabrics } from '@/lib/designs';
import { buildWhatsAppUrl, SITE_URL } from '@/lib/site';
import { uploadReferenceImage } from '@/lib/cloudinary';

const detailsSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80),
  phone: z.string().trim().min(7, 'Valid phone required').max(20),
  address: z.string().trim().min(10, 'Full address required').max(500),
  size1: z.string().min(1, 'Select size'),
  size2: z.string().min(1, 'Select size'),
  notes: z.string().max(500).optional(),
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function CustomizePage({ designId }: { designId?: string }) {
  const preselected = useMemo(
    () => allDesigns.find((d) => d.id === designId) ?? null,
    [designId],
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    preselected?.image ?? null,
  );
  const [fileName, setFileName] = useState<string | null>(
    preselected ? `${preselected.name} (from catalog)` : null,
  );
  const [fabric, setFabric] = useState<string>('200 GSM');
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
    // If the user picked a file on the landing page we stored a blob URL
    // and filename in sessionStorage. Attempt to reconstruct the File so
    // the preview and upload flow work seamlessly after navigation.
    const tryRestore = async () => {
      try {
        const blobUrl = sessionStorage.getItem('da_uploaded_preview');
        const name = sessionStorage.getItem('da_uploaded_name');
        if (blobUrl && name && !file) {
          // Try to fetch the blob and convert to File. This works when the
          // blob URL was created in the same browsing context during SPA
          // navigation.
          const resp = await fetch(blobUrl);
          if (resp.ok) {
            const b = await resp.blob();
            const reconstructed = new File([b], name, { type: b.type });
            onFile(reconstructed);
            // Clean up the session keys to avoid stale data later.
            sessionStorage.removeItem('da_uploaded_preview');
            sessionStorage.removeItem('da_uploaded_name');
          } else {
            // If fetch failed, at least show the preview URL and filename
            setPreview(blobUrl);
            setFileName(name);
          }
        }
      } catch (e) {
        // Non-fatal — if reconstruction fails, we silently fall back and
        // let the user re-upload on this page.
      }
    };

    tryRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    // Try to get a link to the reference photo so it rides along with the
    // WhatsApp text. Custom uploads go to Cloudinary; catalog picks just use
    // the design's own image URL. If the upload fails, fall back to asking
    // the customer to attach it manually in the chat.
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
    } else if (!file && preselected) {
      imageUrl = `${SITE_URL}${preselected.image}`;
    }

    const lines = [
      '*New Couple Tshirt Order — Willy-Lilly*',
      '',
      `*Design:* ${preselected ? preselected.name : fileName ? `Custom upload — ${fileName}` : 'Custom upload'}`,
      preselected ? `*Collection:* ${preselected.collection}` : null,
      `*Fabric:* ${fabric}`,
      `*Size (Partner 1):* ${data.size1}`,
      `*Size (Partner 2):* ${data.size2}`,
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

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteNav />

      <header className="px-6 lg:px-10 pt-14 pb-8 text-center border-b border-border">
        <span className="text-[10px] uppercase tracking-[0.35em] text-burgundy">
          Your Bespoke Order
        </span>
        <h1 className="font-serif text-4xl md:text-6xl italic mt-3">
          Customize your Couple Tshirt
        </h1>
        <p className="mt-4 text-sm text-ink/60 max-w-lg mx-auto">
          Upload a reference, choose your fabric, and share your details. Your
          order goes to us on WhatsApp.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto px-6 lg:px-10 py-16 space-y-20"
      >
        {/* STEP 1: Reference */}
        <section>
          <StepLabel n="01" title="Your reference" />
          <div className="mt-6 grid md:grid-cols-[280px_1fr] gap-8 items-start">
            <div className="relative aspect-[4/5] rounded-md ring-1 ring-black/5 bg-cream overflow-hidden grid place-items-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Reference preview"
                  fill
                  sizes="280px"
                  className="object-cover"
                  unoptimized={preview.startsWith('blob:')}
                />
              ) : (
                <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
                  No image yet
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-ink/70 max-w-md">
                {preselected
                  ? `You've selected "${preselected.name}" from our catalog. You can also upload your own reference below.`
                  : "Upload a photo you love — a couple portrait, a mood image, or a design sketch. We'll craft the print from it."}
              </p>
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
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[11px] uppercase tracking-[0.25em] hover:border-ink hover:bg-cream"
              >
                {file ? 'Replace image' : 'Upload your design'}
              </button>
              {fileName && (
                <p className="mt-3 text-xs text-ink/50">Selected: {fileName}</p>
              )}
              {uploadError && (
                <p className="mt-2 text-xs text-destructive">{uploadError}</p>
              )}
            </div>
          </div>
        </section>

        {/* STEP 2: Fabric */}
        <section>
          <StepLabel n="02" title="Select fabric weight" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {fabrics.map((f) => {
              const active = fabric === f.gsm;
              return (
                <button
                  key={f.gsm}
                  type="button"
                  onClick={() => setFabric(f.gsm)}
                  className={`text-left p-5 rounded-xl border transition-colors ${
                    active
                      ? 'border-burgundy bg-burgundy/5'
                      : 'border-border hover:border-ink'
                  }`}
                >
                  <span className="block font-serif text-2xl">{f.gsm}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-burgundy font-medium mt-1 block">
                    {f.label}
                  </span>
                  <span className="text-[11px] text-ink/50 mt-2 block">
                    {f.note}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 3: Details */}
        <section>
          <StepLabel n="03" title="Your details" />
          <div className="mt-6 grid md:grid-cols-2 gap-6">
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
            <div className="md:col-span-2">
              <Field
                label="Delivery address"
                name="address"
                textarea
                error={errors.address}
                placeholder="Flat, street, city, state, PIN"
              />
            </div>
            <SelectField
              label="Size — Partner 1"
              name="size1"
              options={sizes}
              error={errors.size1}
            />
            <SelectField
              label="Size — Partner 2"
              name="size2"
              options={sizes}
              error={errors.size2}
            />
            <div className="md:col-span-2">
              <Field
                label="Anything special? (names, dates, colours)"
                name="notes"
                textarea
                placeholder="Optional — e.g. embroider 'A & R since 12.07.2024'"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border pt-12 text-center">
          <p className="text-sm text-ink/60 max-w-md mx-auto">
            Tap below to open WhatsApp with your order — and reference photo
            link — pre-filled.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-whatsapp text-ink px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold shadow-luxe hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? 'Uploading photo…' : 'Place order on WhatsApp'}
          </button>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-ink/40">
            or{' '}
            <Link href="/designs" className="border-b border-ink/30">
              browse more designs
            </Link>
          </p>
        </section>
      </form>

      <SiteFooter />
      <StickyWhatsApp />
    </div>
  );
}

function StepLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-serif text-3xl italic text-burgundy">{n}</span>
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
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
      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={2}
          placeholder={placeholder}
          className={shared}
        />
      ) : (
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          className={shared}
        />
      )}
      {error && (
        <span className="mt-1 block text-[11px] text-destructive">{error}</span>
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[];
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-burgundy transition-colors text-base font-light"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <span className="mt-1 block text-[11px] text-destructive">{error}</span>
      )}
    </label>
  );
}
