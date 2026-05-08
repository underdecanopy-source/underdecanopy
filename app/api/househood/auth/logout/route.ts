import { NextResponse } from 'next/server';
import { HOUSEHOOD_SESSION_COOKIE } from '@/lib/househood/session';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set(HOUSEHOOD_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
