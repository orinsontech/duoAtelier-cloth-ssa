'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
  verifyCredentials,
} from '@/lib/admin-auth';

export async function login(formData: FormData) {
  const username = String(formData.get('username') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!username || !password || !verifyCredentials(username, password)) {
    redirect('/admin/login?error=1');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: '/',
  });

  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect('/admin/login');
}
