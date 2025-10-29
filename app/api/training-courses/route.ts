import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const trainingCourseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0, 'Price must be non-negative'),
});

// GET /api/training-courses - Get all training courses
export async function GET() {
  try {
    const trainingCourses = await db.trainingCourse.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(trainingCourses);
  } catch (error) {
    console.error('Get training courses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training courses' },
      { status: 500 }
    );
  }
}

// POST /api/training-courses - Create a new training course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, duration, price } = trainingCourseSchema.parse(body);

    const trainingCourse = await db.trainingCourse.create({
      data: {
        name,
        description,
        duration,
        price,
      },
    });

    return NextResponse.json(trainingCourse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create training course error:', error);
    return NextResponse.json(
      { error: 'Failed to create training course' },
      { status: 500 }
    );
  }
}
