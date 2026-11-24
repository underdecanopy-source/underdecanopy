import { getSupabaseAuthConfig } from '../server'

describe('getSupabaseAuthConfig', () => {
    const originalEnv = process.env

    beforeEach(() => {
        process.env = { ...originalEnv }
        delete process.env.SUPABASE_URL
        delete process.env.SUPABASE_PUBLISHABLE_KEY
        delete process.env.SUPABASE_ANON_KEY
        delete process.env.NEXT_PUBLIC_SUPABASE_URL
        delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

    afterAll(() => {
        process.env = originalEnv
    })

    it('uses the canonical server environment variables', () => {
        process.env.SUPABASE_URL = 'https://project.supabase.co'
        process.env.SUPABASE_PUBLISHABLE_KEY = 'publishable-key'

        expect(getSupabaseAuthConfig()).toEqual({
            url: 'https://project.supabase.co',
            key: 'publishable-key',
        })
    })

    it('supports standard public URL and anon-key aliases', () => {
        process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://project.supabase.co'
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon-key'

        expect(getSupabaseAuthConfig()).toEqual({
            url: 'https://project.supabase.co',
            key: 'anon-key',
        })
    })

    it('rejects missing configuration with a safe actionable error', () => {
        expect(() => getSupabaseAuthConfig()).toThrow('Supabase auth is not configured')
    })

    it('rejects non-HTTPS production URLs', () => {
        process.env.SUPABASE_URL = 'http://project.supabase.co'
        process.env.SUPABASE_PUBLISHABLE_KEY = 'publishable-key'

        expect(() => getSupabaseAuthConfig()).toThrow('SUPABASE_URL must use HTTPS')
    })
})
