import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CloudinaryUploadError, signedCloudinaryUpload } from '@/lib/cloudinary-server';
import { ADMIN_SESSION_COOKIE, isSessionTokenValid } from '@/lib/admin-auth';

// This route intentionally bypasses proxy.ts (see src/proxy.ts) — its automatic
// request-body buffering corrupts large multipart file uploads — so auth is
// checked here directly instead.
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
