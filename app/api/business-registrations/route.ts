import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const businessRegistrationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
});

// GET /api/business-registrations - Get all business registrations
export async function GET() {
  try {
    const businessRegistrations = await db.businessRegistration.findMany({
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(businessRegistrations);
  } catch (error) {
    console.error('Get business registrations error:');
    return NextResponse.json(
      { error: 'Failed to fetch business registrations' },
      { status: 500 }
    );
  }
}

// POST /api/business-registrations - Create a new business registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, businessName, businessType } = businessRegistrationSchema.parse(body);

    // Verify user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const businessRegistration = await db.businessRegistration.create({
      data: {
        userId,
        businessName,
        businessType,
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    return NextResponse.json(businessRegistration, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create business registration error:');
    return NextResponse.json(
      { error: 'Failed to create business registration' },
      { status: 500 }
    );
  }
}
