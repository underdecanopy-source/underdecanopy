import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    try {
        let response = NextResponse.next({
            request: {
                headers: request.headers,
            },
        })

        // Only process if Supabase environment variables are available
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) {
            return response
        }

        const supabase = createServerClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_PUBLISHABLE_KEY,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            response.cookies.set(name, value, options)
                        )
                    },
                },
            }
        )

        // Refresh session if needed
        await supabase.auth.getSession()

        return response
    } catch (error) {
        // Log error but don't fail the middleware
        console.error('Middleware error:', error)
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}