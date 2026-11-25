const NETWORK_ERROR_MESSAGE =
    'The account service is unreachable. Please verify that this Vercel environment has the correct Supabase URL and matching publishable/anon key configured.'

export function getAuthErrorMessage(error: unknown): string {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === 'object' &&
                error !== null &&
                'message' in error &&
                typeof error.message === 'string'
              ? error.message
              : ''

    if (/fetch failed|failed to fetch|network request failed/i.test(message)) {
        return NETWORK_ERROR_MESSAGE
    }

    return message || 'An unexpected account-service error occurred.'
}
