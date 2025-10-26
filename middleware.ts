import { NextRequest, NextResponse } from 'next/server';

const SUBDOMAINS = ['coophub', 'applysmart', 'smarttax', 'swiftwheel', 'techlift', 'trustfix'];
const ROOT_DOMAIN = 'underdecanopy.com';

export function middleware(req: NextRequest) {
  const hostHeader = req.headers.get('host') || '';
  const host = hostHeader.split(':')[0]; // strip port if any
  const url = req.nextUrl.clone();

  // Ensure we only rewrite requests for our domain
  if (!host.endsWith(ROOT_DOMAIN)) {
    return NextResponse.next();
  }

  // split host into parts: [sub, sub2?, domain, tld]
  const parts = host.split('.');
  // typical host forms:
  // underdecanopy.com -> ['underdecanopy','com']
  // coophub.underdecanopy.com -> ['coophub','underdecanopy','com']
  if (parts.length >= 3) {
    const sub = parts[0].toLowerCase();
    if (SUBDOMAINS.includes(sub)) {
      // rewrite to the corresponding site route
      url.pathname = `/sites/${sub}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // For main domain (underdecanopy.com or www) leave as-is (serves main landing)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api|favicon.ico).*)'],
};