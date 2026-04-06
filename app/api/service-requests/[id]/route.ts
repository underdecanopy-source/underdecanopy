import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const serviceRequestUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  details: z.string().min(1).optional(),
});

// GET /api/service-requests/[id] - Get a single service request
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceRequest = await db.serviceRequest.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, email: true },
        },
        service: true,
      },
    });

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(serviceRequest, { status: 200 });
  } catch (error) {
    console.error('Get service request error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/service-requests/[id] - Update service request status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updateData = serviceRequestUpdateSchema.parse(body);

    // Check if service request exists
    const existingRequest = await db.serviceRequest.findUnique({
      where: { id: params.id },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    // Update service request
    const serviceRequest = await db.serviceRequest.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true },
        },
        service: true,
      },
    });

    return NextResponse.json(
      { message: 'Service request updated successfully', serviceRequest },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update service request error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/service-requests/[id] - Delete a service request
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if service request exists
    const existingRequest = await db.serviceRequest.findUnique({
      where: { id: params.id },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }

    // Delete service request
    await db.serviceRequest.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Service request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete service request error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
