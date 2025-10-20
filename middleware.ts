import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Only match API routes and specific paths that need middleware
         * This prevents the middleware from running on static assets
         */
        '/api/:path*',
    ],
}