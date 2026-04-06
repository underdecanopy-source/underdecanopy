import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Get services error:');
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description } = serviceSchema.parse(body);

    const service = await db.service.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create service error:');
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
