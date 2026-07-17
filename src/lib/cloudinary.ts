export async function uploadReferenceImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const error = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(
      error?.error ?? `Cloudinary upload failed with status ${res.status}`,
    );
  }

  const data: { secure_url?: string } = await res.json();
  if (!data.secure_url) {
    throw new Error('Cloudinary upload did not return a URL');
  }

  return data.secure_url;
}

export function isCloudinaryConfigured() {
  return true;
}
