import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const trainingCourseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  description: z.string().min(1, 'Course description is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().positive('Price must be positive'),
});

// GET /api/training-courses/[id] - Get a single training course
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = await db.trainingCourse.findUnique({
      where: { id: params.id },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Training course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Get training course error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/training-courses/[id] - Update a training course
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description, duration, price } = trainingCourseSchema.parse(body);

    // Check if course exists
    const existingCourse = await db.trainingCourse.findUnique({
      where: { id: params.id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Training course not found' },
        { status: 404 }
      );
    }

    // Update course
    const course = await db.trainingCourse.update({
      where: { id: params.id },
      data: { name, description, duration, price },
    });

    return NextResponse.json(
      { message: 'Training course updated successfully', course },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update training course error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/training-courses/[id] - Delete a training course
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if course exists
    const existingCourse = await db.trainingCourse.findUnique({
      where: { id: params.id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Training course not found' },
        { status: 404 }
      );
    }

    // Delete course
    await db.trainingCourse.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Training course deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete training course error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
