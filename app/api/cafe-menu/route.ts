import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const cafeMenuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  category: z.string().min(1, 'Category is required'),
});

// GET /api/cafe-menu - Get all cafe menu items
export async function GET() {
  try {
    const cafeMenuItems = await db.cafeMenuItem.findMany({
      orderBy: { category: 'asc' },
    });

    return NextResponse.json(cafeMenuItems);
  } catch (error) {
    console.error('Get cafe menu items error:');
    return NextResponse.json(
      { error: 'Failed to fetch cafe menu items' },
      { status: 500 }
    );
  }
}

// POST /api/cafe-menu - Create a new cafe menu item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, category } = cafeMenuItemSchema.parse(body);

    const cafeMenuItem = await db.cafeMenuItem.create({
      data: {
        name,
        description,
        price,
        category,
      },
    });

    return NextResponse.json(cafeMenuItem, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create cafe menu item error:');
    return NextResponse.json(
      { error: 'Failed to create cafe menu item' },
      { status: 500 }
    );
  }
}
