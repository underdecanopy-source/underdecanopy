import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://underdecanopy.com',
  'https://www.underdecanopy.com',
  'https://coophub.underdecanopy.com',
  'https://applysmart.underdecanopy.com',
  'https://smarttax.underdecanopy.com',
  'https://swiftwheel.underdecanopy.com',
  'https://techlift.underdecanopy.com',
  'https://trustfix.underdecanopy.com',
];

if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000');
}

export function corsMiddleware(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin');
  
  // Check if origin is allowed
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
  
  return res;
}

export function handleCorsPreflightRequest(req: NextRequest) {
  const origin = req.headers.get('origin');
  
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return new NextResponse(null, { status: 403 });
}
