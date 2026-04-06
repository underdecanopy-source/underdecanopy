/**
 * Prisma client initialization & environment validation.
 *
 * Required / optional env vars:
 *   DATABASE_URL   -> Primary connection string (postgresql:// or postgres://)
 *   DIRECT_URL     -> (Optional) Direct connection string for migrations or Accelerate (points to primary DB)
 *   PRISMA_ACCELERATE=1 -> (Optional) Force enabling Prisma Accelerate extension (Data Proxy / performance)
 *
 * Notes:
 * - Never use localhost DATABASE_URL in production (Vercel). Use a managed Postgres host.
 * - If using Prisma Accelerate/Data Proxy, DATABASE_URL may start with prisma:// and DIRECT_URL should still be a valid postgres URL.
 */
import { PrismaClient } from './generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

type GlobalWithPrisma = typeof globalThis & { prisma?: PrismaClient }
const g = globalThis as GlobalWithPrisma
// Access env safely without requiring Node.js type globals in TS
const env: Record<string, string | undefined> = ((globalThis as any).process?.env ?? {})

export function warnIfInvalidDatabaseUrl() {
    const url = env.DATABASE_URL || ''
    const isProd = env.NODE_ENV === 'production'
    if (!url) {
        console.warn('[prisma] DATABASE_URL is not set.')
        return
    }
    // Allow prisma:// (Data Proxy) and postgres:// / postgresql://
    if (!/^(prisma:\/\/|postgres(ql)?:\/\/)/.test(url)) {
        console.warn('[prisma] DATABASE_URL must start with "postgresql://", "postgres://" or "prisma://". Got: ' + url.split(':')[0] + '://')
    }
    // Check for common mistake: https:// in the host portion
    if (/@https?:\/\//.test(url)) {
        console.error('[prisma] DATABASE_URL contains "http://" or "https://" in the host portion. Remove the protocol from the hostname.')
        console.error('[prisma] Example: postgresql://user:pass@hostname:5432/db (NOT @https://hostname)')
    }
    if (isProd && env.VERCEL && /localhost/i.test(url)) {
        console.warn('[prisma] DATABASE_URL points to localhost in a Vercel environment. Use a cloud Postgres URL in production.')
    }
}

export function warnIfInvalidDirectUrl() {
    const direct = env.DIRECT_URL || ''
    if (!direct) return // optional
    if (!/^postgres(ql)?:\/\//.test(direct)) {
        console.warn('[prisma] DIRECT_URL should be a direct Postgres connection (postgresql:// or postgres://). Got: ' + direct.split(':')[0] + '://')
    }
    // Check for common mistake: https:// in the host portion
    if (/@https?:\/\//.test(direct)) {
        console.error('[prisma] DIRECT_URL contains "http://" or "https://" in the host portion. Remove the protocol from the hostname.')
        console.error('[prisma] Example: postgresql://user:pass@hostname:5432/db (NOT @https://hostname)')
    }
    if (/localhost/i.test(direct) && env.VERCEL) {
        console.warn('[prisma] DIRECT_URL points to localhost on Vercel; migrations & direct connections will fail.')
    }
}

export function shouldUseAccelerate(): boolean {
        const url = env.DATABASE_URL || ''
        return url.startsWith('prisma://') || env.PRISMA_ACCELERATE === '1'
}

/**
 * If using Prisma Data Proxy (DATABASE_URL starts with prisma://), ensure DIRECT_URL is present and valid postgres URL.
 * This is required for schema pushes/migrations and some runtime features.
 */
export function warnIfMissingDirectUrlForPrismaProxy() {
    const url = env.DATABASE_URL || ''
    if (!url.startsWith('prisma://')) return
    const direct = env.DIRECT_URL || ''
    if (!direct) {
        console.warn('[prisma] Using prisma:// DATABASE_URL but DIRECT_URL is missing. Set DIRECT_URL to your primary postgres connection string.')
        return
    }
    if (!/^postgres(ql)?:\/\//.test(direct)) {
        console.warn('[prisma] Using prisma:// DATABASE_URL but DIRECT_URL is not a valid postgres URL (expected postgresql:// or postgres://).')
    }
}

function createClient(): PrismaClient {
    const base = new PrismaClient()
        return shouldUseAccelerate() ? (base.$extends(withAccelerate()) as unknown as PrismaClient) : base
}

export const db: PrismaClient = g.prisma ?? createClient()

if (env.NODE_ENV !== 'production') {
    g.prisma = db
}

warnIfInvalidDatabaseUrl()
warnIfInvalidDirectUrl()
warnIfMissingDirectUrlForPrismaProxy()

export default db