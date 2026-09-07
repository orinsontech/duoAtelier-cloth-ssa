import { Pool } from 'pg';

declare global {
  var __pgPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DB_URL;
  if (!connectionString) {
    throw new Error('Missing DB_URL environment variable');
  }
  return new Pool({ connectionString });
}

// Reuse the pool across hot-reloads in dev so we don't leak connections.
export const pool = global.__pgPool ?? createPool();
if (process.env.NODE_ENV !== 'production') {
  global.__pgPool = pool;
}

export function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params);
}
