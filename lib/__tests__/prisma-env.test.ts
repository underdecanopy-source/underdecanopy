/// <reference types="jest" />
import {
  warnIfInvalidDatabaseUrl,
  warnIfInvalidDirectUrl,
  warnIfMissingDirectUrlForPrismaProxy,
  shouldUseAccelerate,
} from '../prisma'

const originalEnv = { ...((globalThis as any).process?.env || {}) }

function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const g: any = (globalThis as any)
  const env = g.process ? g.process.env : (g.process = { env: {} }).env
  const prev = { ...env }
  Object.assign(env, vars)
  try { fn() } finally {
    Object.keys(env).forEach(k => delete env[k])
    Object.assign(env, prev)
  }
}

describe('prisma env validators', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  afterEach(() => {
    warnSpy.mockClear()
    errorSpy.mockClear()
  })

  afterAll(() => {
    warnSpy.mockRestore()
    errorSpy.mockRestore()
    // restore env
    withEnv(originalEnv, () => {})
  })

  it('warns when DATABASE_URL is missing', () => {
    withEnv({ DATABASE_URL: '' }, () => {
      warnIfInvalidDatabaseUrl()
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  it('warns for invalid DATABASE_URL protocol', () => {
    withEnv({ DATABASE_URL: 'mysql://foo' }, () => {
      warnIfInvalidDatabaseUrl()
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  it('errors when DATABASE_URL contains https in host portion', () => {
    withEnv({ DATABASE_URL: 'postgresql://user:pass@https://host:5432/db' }, () => {
      warnIfInvalidDatabaseUrl()
      expect(errorSpy).toHaveBeenCalled()
    })
  })

  it('warns for localhost on Vercel', () => {
    withEnv({ DATABASE_URL: 'postgresql://user:pass@localhost:5432/db', VERCEL: '1', NODE_ENV: 'production' }, () => {
      warnIfInvalidDatabaseUrl()
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  it('DIRECT_URL protocol validation', () => {
    withEnv({ DIRECT_URL: 'mysql://foo' }, () => {
      warnIfInvalidDirectUrl()
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  it('errors when DIRECT_URL contains https in host portion', () => {
    withEnv({ DIRECT_URL: 'postgresql://user:pass@https://host:5432/db' }, () => {
      warnIfInvalidDirectUrl()
      expect(errorSpy).toHaveBeenCalled()
    })
  })

  it('prisma:// requires DIRECT_URL', () => {
    withEnv({ DATABASE_URL: 'prisma://whatever' }, () => {
      warnIfMissingDirectUrlForPrismaProxy()
      expect(warnSpy).toHaveBeenCalled()
    })
  })

  it('shouldUseAccelerate returns true for prisma://', () => {
    withEnv({ DATABASE_URL: 'prisma://whatever' }, () => {
      expect(shouldUseAccelerate()).toBe(true)
    })
  })

  it('shouldUseAccelerate returns true when PRISMA_ACCELERATE=1', () => {
    withEnv({ DATABASE_URL: 'postgresql://user:pass@host:5432/db', PRISMA_ACCELERATE: '1' }, () => {
      expect(shouldUseAccelerate()).toBe(true)
    })
  })
})
