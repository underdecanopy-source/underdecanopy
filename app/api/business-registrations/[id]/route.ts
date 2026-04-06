import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const businessRegistrationUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']).optional(),
  businessName: z.string().min(1).optional(),
  businessType: z.string().min(1).optional(),
});

// GET /api/business-registrations/[id] - Get a single business registration
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const registration = await db.businessRegistration.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Business registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(registration, { status: 200 });
  } catch (error) {
    console.error('Get business registration error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/business-registrations/[id] - Update business registration
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updateData = businessRegistrationUpdateSchema.parse(body);

    // Check if registration exists
    const existingRegistration = await db.businessRegistration.findUnique({
      where: { id: params.id },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'Business registration not found' },
        { status: 404 }
      );
    }

    // Update registration
    const registration = await db.businessRegistration.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
    });

    return NextResponse.json(
      { message: 'Business registration updated successfully', registration },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update business registration error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/business-registrations/[id] - Delete business registration
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if registration exists
    const existingRegistration = await db.businessRegistration.findUnique({
      where: { id: params.id },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'Business registration not found' },
        { status: 404 }
      );
    }

    // Delete registration
    await db.businessRegistration.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Business registration deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete business registration error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
