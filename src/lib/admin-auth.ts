import crypto from 'node:crypto';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('Missing ADMIN_SESSION_SECRET environment variable');
  }
  return secret;
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

function safeEqual(value: string, expected: string) {
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function verifyCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) {
    throw new Error('Missing ADMIN_USERNAME or ADMIN_PASSWORD environment variable');
  }
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isSessionTokenValid(token: string | undefined | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split('.');
  if (!issuedAt || !signature) return false;
  if (sign(issuedAt) !== signature) return false;
  const age = Date.now() - Number(issuedAt);
  return age >= 0 && age <= SESSION_MAX_AGE_SECONDS * 1000;
}

export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;
