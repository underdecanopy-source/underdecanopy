import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// GET /api/newsletter - Get all newsletter subscriptions
export async function GET() {
  try {
    const subscriptions = await db.newsletterSubscription.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: 'desc' },
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Get newsletter subscriptions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscriptions' },
      { status: 500 }
    );
  }
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    // Check if already subscribed
    const existingSubscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        const updatedSubscription = await db.newsletterSubscription.update({
          where: { email },
          data: { isActive: true },
        });
        return NextResponse.json(
          { message: 'Subscription reactivated successfully', subscription: updatedSubscription },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const subscription = await db.newsletterSubscription.create({
      data: { email },
    });

    return NextResponse.json(
      { message: 'Subscribed successfully', subscription },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const subscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await db.newsletterSubscription.update({
      where: { email },
      data: { isActive: false },
    });

    return NextResponse.json(
      { message: 'Unsubscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
