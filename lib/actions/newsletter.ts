'use server';

import { z } from 'zod';
import db from '@/lib/prisma';

const newsletterFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type NewsletterState = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const validatedFields = newsletterFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  const email = validatedFields.data.email;

  try {
    // Check if already subscribed
    const existingSubscription = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscription && existingSubscription.isActive) {
      return { message: 'You are already subscribed to our newsletter!' };
    }

    // Create or reactivate subscription
    await db.newsletterSubscription.upsert({
      where: { email },
      update: { isActive: true },
      create: { email },
    });

    return { message: 'Thank you for subscribing!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      message: 'Failed to subscribe. Please try again.',
    };
  }
}
