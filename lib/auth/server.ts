"use server"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function getSupabaseAuthConfig() {
    const url = (
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        ''
    ).trim()
    const key = (
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        ''
    ).trim()

    if (!url || !key) {
        throw new Error(
            'Supabase auth is not configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY (or their supported public/anon-key equivalents).'
        )
    }

    let parsedUrl: URL
    try {
        parsedUrl = new URL(url)
    } catch {
        throw new Error('Supabase auth is misconfigured: SUPABASE_URL must be a valid HTTPS URL.')
    }

    if (parsedUrl.protocol !== 'https:' && parsedUrl.hostname !== 'localhost') {
        throw new Error('Supabase auth is misconfigured: SUPABASE_URL must use HTTPS.')
    }

    return { url, key }
}

export async function createClient() {
    const cookieStore = await cookies()
    const { url, key } = getSupabaseAuthConfig()

    return createServerClient(
        url,
        key,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

export async function getUser() {
    const { auth } = await createClient()
    const userObj = await auth.getUser()

    if (userObj.error) {
        console.log(userObj.error)
        return null
    }
    return userObj.data.user
}