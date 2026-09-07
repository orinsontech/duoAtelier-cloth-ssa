import crypto from 'node:crypto';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

export class CloudinaryUploadError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }
  return value;
}

export async function signedCloudinaryUpload(file: File, folder?: string): Promise<string> {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new CloudinaryUploadError('Only JPG, PNG, WEBP, and GIF images are allowed.');
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new CloudinaryUploadError('Image must be 10MB or smaller.');
  }

  const cloudName = getRequiredEnv('CLOUDINARY_CLOUD_NAME');
  const apiKey = getRequiredEnv('CLOUDINARY_API_KEY');
  const apiSecret = getRequiredEnv('CLOUDINARY_API_SECRET');
  const resolvedFolder = (folder ?? process.env.CLOUDINARY_FOLDER)?.trim() || 'willy-nilly';
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const signatureBase = `folder=${resolvedFolder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureBase).digest('hex');

  const uploadForm = new FormData();
  uploadForm.append('file', file, file.name);
  uploadForm.append('api_key', apiKey);
  uploadForm.append('timestamp', timestamp);
  uploadForm.append('folder', resolvedFolder);
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
    throw new CloudinaryUploadError(
      uploadData?.error?.message ?? 'Cloudinary upload failed.',
      uploadResponse.status,
    );
  }

  if (!uploadData?.secure_url) {
    throw new CloudinaryUploadError('Cloudinary did not return an image URL.', 502);
  }

  return uploadData.secure_url;
}
