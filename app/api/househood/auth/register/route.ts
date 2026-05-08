import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { HOUSEHOOD_ROLES, registerHousehoodUser } from '@/lib/househood/account';
import {
  createHousehoodSessionToken,
  getHousehoodSessionCookieOptions,
  HOUSEHOOD_SESSION_COOKIE,
} from '@/lib/househood/session';

const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
    role: z.enum(HOUSEHOOD_ROLES),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = registerSchema.parse(body);

    const user = await registerHousehoodUser(email, password, role);

    const response = NextResponse.json({ message: 'Househood account created', user }, { status: 201 });
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

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
