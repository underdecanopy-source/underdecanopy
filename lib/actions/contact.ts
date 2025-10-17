"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().optional(),
  message: z.string().min(1, { message: "Message is required." }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
};

export async function submitContactForm(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }

  // For now, we'll just log the data to the console.
  // In a real application, you would send an email or save this to a database.
  console.log("New contact form submission:");
  console.log(validatedFields.data);

  // In a real app, you'd clear the form upon successful submission.
  // For this example, we'll just return a success message.
  return { message: "Your message has been sent successfully!" };
}
