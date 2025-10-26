import { NextRequest, NextResponse } from 'next/server';

const HOST_MAP: Record<string, string> = {
  'underdecanopy.com': '/sites/underdecanopy',
  'www.underdecanopy.com': '/sites/underdecanopy',
  'coophub.underdecanopy.com': '/sites/coophub',
  'applysmart.underdecanopy.com': '/sites/applysmart',
  'smarttax.underdecanopy.com': '/sites/smarttax',
  'swiftwheel.underdecanopy.com': '/sites/swiftwheel',
  'techlift.underdecanopy.com': '/sites/techlift',
  'trustfix.underdecanopy.com': '/sites/trustfix',
  'localhost': '/sites/underdecanopy',
  '127.0.0.1': '/sites/underdecanopy',
};

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];

  const targetPrefix = HOST_MAP[hostname];
  if (!targetPrefix) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  if (url.pathname.startsWith(targetPrefix)) {
    return NextResponse.next();
  }

  url.pathname = `${targetPrefix}${url.pathname === '/' ? '/' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/:path*',
};
