import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const serviceRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  serviceId: z.string().min(1, 'Service ID is required'),
  details: z.string().min(1, 'Details are required'),
});

// GET /api/service-requests - Get all service requests
export async function GET() {
  try {
    const serviceRequests = await db.serviceRequest.findMany({
      include: {
        user: {
          select: { id: true, email: true },
        },
        service: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(serviceRequests);
  } catch (error) {
    console.error('Get service requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}

// POST /api/service-requests - Create a new service request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, serviceId, details } = serviceRequestSchema.parse(body);

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

    // Verify service exists
    const service = await db.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const serviceRequest = await db.serviceRequest.create({
      data: {
        userId,
        serviceId,
        details,
      },
      include: {
        user: {
          select: { id: true, email: true },
        },
        service: true,
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create service request error:', error);
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    );
  }
}
