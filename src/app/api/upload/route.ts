import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }
  return value;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Please upload an image file.' },
        { status: 400 },
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WEBP, and GIF images are allowed.' },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'Image must be 10MB or smaller.' },
        { status: 400 },
      );
    }

    const cloudName = getRequiredEnv('CLOUDINARY_CLOUD_NAME');
    const apiKey = getRequiredEnv('CLOUDINARY_API_KEY');
    const apiSecret = getRequiredEnv('CLOUDINARY_API_SECRET');
    const folder = process.env.CLOUDINARY_FOLDER?.trim() || 'willy-nilly';
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signatureBase = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash('sha1')
      .update(signatureBase)
      .digest('hex');

    const uploadForm = new FormData();
    uploadForm.append('file', file, file.name);
    uploadForm.append('api_key', apiKey);
    uploadForm.append('timestamp', timestamp);
    uploadForm.append('folder', folder);
    uploadForm.append('signature', signature);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadForm,
      },
    );

    const uploadData = (await uploadResponse.json()) as {
      secure_url?: string;
      error?: { message?: string };
    } | null;

    if (!uploadResponse.ok) {
      return NextResponse.json(
        { error: uploadData?.error?.message ?? 'Cloudinary upload failed.' },
        { status: uploadResponse.status },
      );
    }

    if (!uploadData?.secure_url) {
      return NextResponse.json(
        { error: 'Cloudinary did not return an image URL.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ secure_url: uploadData.secure_url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected upload error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
