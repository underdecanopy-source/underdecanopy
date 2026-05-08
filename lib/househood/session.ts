import { createHmac, timingSafeEqual } from 'crypto';
import type { HousehoodRole, HousehoodUser } from '@/lib/househood/types';

export const HOUSEHOOD_SESSION_COOKIE = 'househood_session';

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type HousehoodSessionPayload = {
  userId: string;
  email: string;
  role: HousehoodRole;
  exp: number;
};

function getSessionSecret() {
  return (
    process.env.HOUSEHOOD_SESSION_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'underdecanopy-househood-dev-secret'
  );
}

function sign(encodedPayload: string) {
  return createHmac('sha256', getSessionSecret()).update(encodedPayload).digest('base64url');
}

function toSessionPayload(user: HousehoodUser): HousehoodSessionPayload {
  return {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
}

export function createHousehoodSessionToken(user: HousehoodUser) {
  const payload = Buffer.from(JSON.stringify(toSessionPayload(user))).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyHousehoodSessionToken(token: string | undefined | null): HousehoodSessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as HousehoodSessionPayload;
    if (!payload.userId || !payload.email || !payload.role || payload.exp <= Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function getHousehoodSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  };
}
