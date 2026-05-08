import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getHousehoodUserById } from '@/lib/househood/account';
import {
  getHousehoodSessionCookieOptions,
  HOUSEHOOD_SESSION_COOKIE,
  verifyHousehoodSessionToken,
} from '@/lib/househood/session';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(HOUSEHOOD_SESSION_COOKIE)?.value;
  const session = verifyHousehoodSessionToken(token);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await getHousehoodUserById(session.userId);
  if (!user) {
    const response = NextResponse.json({ user: null }, { status: 401 });
    response.cookies.set(HOUSEHOOD_SESSION_COOKIE, '', {
      ...getHousehoodSessionCookieOptions(),
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.json({ user }, { status: 200 });
}
