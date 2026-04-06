import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const cafeMenuItemSchema = z.object({
  name: z.string().min(1, 'Menu item name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
});

// GET /api/cafe-menu/[id] - Get a single menu item
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menuItem = await db.cafeMenuItem.findUnique({
      where: { id: params.id },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error('Get menu item error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/cafe-menu/[id] - Update a menu item
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description, price, category } = cafeMenuItemSchema.parse(body);

    // Check if menu item exists
    const existingMenuItem = await db.cafeMenuItem.findUnique({
      where: { id: params.id },
    });

    if (!existingMenuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    // Update menu item
    const menuItem = await db.cafeMenuItem.update({
      where: { id: params.id },
      data: { name, description, price, category },
    });

    return NextResponse.json(
      { message: 'Menu item updated successfully', menuItem },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Update menu item error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cafe-menu/[id] - Delete a menu item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if menu item exists
    const existingMenuItem = await db.cafeMenuItem.findUnique({
      where: { id: params.id },
    });

    if (!existingMenuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    // Delete menu item
    await db.cafeMenuItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete menu item error:');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
