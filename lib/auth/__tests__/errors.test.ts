import { getAuthErrorMessage } from '../errors'

describe('getAuthErrorMessage', () => {
    it.each([
        new Error('fetch failed'),
        { message: 'Failed to fetch' },
        { message: 'Network request failed' },
    ])('returns actionable feedback for network errors', (error) => {
        expect(getAuthErrorMessage(error)).toBe(
            'The account service is unreachable. Please verify that this Vercel environment has the correct Supabase URL and matching publishable/anon key configured.'
        )
    })

    it('preserves useful authentication errors', () => {
        expect(getAuthErrorMessage({ message: 'Invalid login credentials' })).toBe(
            'Invalid login credentials'
        )
    })

    it('returns a safe fallback for unknown errors', () => {
        expect(getAuthErrorMessage(null)).toBe(
            'An unexpected account-service error occurred.'
        )
    })
})
