import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /_next (Next.js internals)
     * 2. /_static (inside /public)
     * 3. /_vercel (Vercel internals)
     * 4. Static files with extensions (e.g. /favicon.ico, /robots.txt, etc.)
     */
    '/((?!_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get hostname from request headers, remove port if present
  let hostname = req.headers.get('host') || 'underdecanopy.com';
  hostname = hostname.split(':')[0]; // Remove port for local development
  
  // Define hostname to site folder mappings
  const hostnameMap: Record<string, string> = {
    'underdecanopy.com': 'main',
    'www.underdecanopy.com': 'main',
    'coophub.underdecanopy.com': 'coophub',
    'applysmart.underdecanopy.com': 'applysmart',
    'smarttax.underdecanopy.com': 'smarttax',
    'swiftwheel.underdecanopy.com': 'swiftwheel',
    'techlift.underdecanopy.com': 'techlift',
    'trustfix.underdecanopy.com': 'trustfix',
    // Local development hostnames
    'localhost': 'main',
    '127.0.0.1': 'main',
  };

  // Get the site folder for current hostname, default to 'main'
  const siteFolder = hostnameMap[hostname] || 'main';

  // Check if the path is already rewritten to avoid infinite loops
  if (url.pathname.startsWith('/sites/')) {
    return NextResponse.next();
  }

  // Sub-site names that have their own /sites/<name>/ folder
  const subSites = ['coophub', 'applysmart', 'smarttax', 'swiftwheel', 'techlift', 'trustfix', 'naijapolis'];

  // On the main domain, if the path starts with a sub-site name, let Next.js
  // route it to the (main) route group which has the full page content
  if (siteFolder === 'main') {
    const firstSegment = url.pathname.split('/')[1]; // e.g. "trustfix" from "/trustfix"
    if (firstSegment && subSites.includes(firstSegment)) {
      return NextResponse.next();
    }
  }

  // Check if it's an API route — let them through without rewriting
  // API routes live at /app/api/* and should not be rewritten to site-specific paths
  if (url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Rewrite all other requests to the appropriate site folder
  url.pathname = `/sites/${siteFolder}${url.pathname}`;
  return NextResponse.rewrite(url);
}