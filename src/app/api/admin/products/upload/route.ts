import { NextResponse } from 'next/server';
import { CloudinaryUploadError, signedCloudinaryUpload } from '@/lib/cloudinary-server';

// Auth is enforced in src/proxy.ts for every /api/admin/* route.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload an image file.' }, { status: 400 });
    }
    const folder = `${process.env.CLOUDINARY_FOLDER?.trim() || 'willy-nilly'}/products`;
    const secure_url = await signedCloudinaryUpload(file, folder);
    return NextResponse.json({ secure_url });
  } catch (error) {
    if (error instanceof CloudinaryUploadError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : 'Unexpected upload error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
