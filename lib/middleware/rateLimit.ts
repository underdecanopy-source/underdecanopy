import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// For production, use Redis or a dedicated rate limiting service
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // max requests per window

export function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  
  const clientData = rateLimit.get(ip);
  
  if (!clientData || now > clientData.resetTime) {
    // First request or window expired
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return null; // No rate limit hit
  }
  
  if (clientData.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((clientData.resetTime - now) / 1000)),
          'X-RateLimit-Limit': String(MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(clientData.resetTime),
        }
      }
    );
  }
  
  clientData.count++;
  return null; // No rate limit hit
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetTime) {
      rateLimit.delete(key);
    }
  }
}, WINDOW_MS);
