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
