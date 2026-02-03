import { Pool } from "pg";

// Keep a single Pool across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __pt_ugc_pool: Pool | undefined;
}

function sanitizeConnectionString(raw: string): string {
  try {
    const u = new URL(raw);
    // Avoid pg-connection-string sslmode semantics overriding Pool.ssl.
    u.searchParams.delete("sslmode");
    u.searchParams.delete("uselibpqcompat");
    return u.toString();
  } catch {
    // If it's not a URL (shouldn't happen), return as-is.
    return raw;
  }
}

function getConnectionString(): string {
  const v = process.env.UGC_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!v) throw new Error("Missing UGC_DATABASE_URL (or DATABASE_URL) in app/web/.env.local");
  return sanitizeConnectionString(v);
}

export function ugcPool(): Pool {
  if (global.__pt_ugc_pool) return global.__pt_ugc_pool;

  const connectionString = getConnectionString();

  // Supabase requires TLS; sslmode=require in the URL is good, but we also set ssl here to avoid local TLS quirks.
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });

  global.__pt_ugc_pool = pool;
  return pool;
}
