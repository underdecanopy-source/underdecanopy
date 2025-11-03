import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// WARNING: This implementation has limitations:
// - Will not work across multiple server instances (use Redis for multi-instance)
// - Will lose data on server restart
// - Memory cleanup runs in each instance
// For production with multiple instances, use Redis with ioredis or upstash-redis
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // max requests per window
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute

// Track cleanup interval to prevent multiple intervals
let cleanupIntervalId: NodeJS.Timeout | null = null;

export function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  
  // Start cleanup if not already running
  if (!cleanupIntervalId) {
    startCleanup();
  }
  
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
function startCleanup() {
  cleanupIntervalId = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
  
  // Prevent the interval from keeping the process alive
  if (cleanupIntervalId.unref) {
    cleanupIntervalId.unref();
  }
}

// For testing: allow cleanup to be stopped
export function stopCleanup() {
  if (cleanupIntervalId) {
    clearInterval(cleanupIntervalId);
    cleanupIntervalId = null;
  }
}
