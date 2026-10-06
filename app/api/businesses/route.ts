import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';

const createBusinessSchema = z.object({
  name: z.string().trim().min(1).max(120),
  businessType: z.string().trim().max(80).optional(),
});

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const memberships = await db.businessMembership.findMany({
      where: { authUserId: user.id },
      select: {
        role: true,
        business: {
          select: {
            id: true,
            name: true,
            businessType: true,
            currency: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(memberships);
  } catch (error) {
    console.error('List businesses failed:', error);
    return NextResponse.json({ error: 'Failed to list businesses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
  }

  const parsed = createBusinessSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const business = await db.$transaction(async (tx) => {
      const created = await tx.business.create({
        data: {
          name: parsed.data.name,
          businessType: parsed.data.businessType || null,
        },
      });

      await tx.businessMembership.create({
        data: {
          businessId: created.id,
          authUserId: user.id,
          role: 'OWNER',
        },
      });

      await tx.auditLog.create({
        data: {
          businessId: created.id,
          actorAuthUserId: user.id,
          action: 'BUSINESS_CREATED',
          entity: 'Business',
          entityId: created.id,
        },
      });

      return created;
    });

    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Create business failed:', error);
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  }
}
