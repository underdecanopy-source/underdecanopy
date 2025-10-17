'use server';

import { z } from 'zod';

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

  // For now, we'll just log the email to the console.
  // In a real application, you would add this email to your mailing list.
  console.log('New newsletter subscription:', email);

  return { message: 'Thank you for subscribing!' };
}
