import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateHousehoodUser } from '@/lib/househood/account';
import {
  createHousehoodSessionToken,
  getHousehoodSessionCookieOptions,
  HOUSEHOOD_SESSION_COOKIE,
} from '@/lib/househood/session';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await authenticateHousehoodUser(email, password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid Househood credentials.' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Login successful', user });
    response.cookies.set(
      HOUSEHOOD_SESSION_COOKIE,
      createHousehoodSessionToken(user),
      getHousehoodSessionCookieOptions(),
    );

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
