"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

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

  try {
    console.log('New contact form submission:');
    console.log(validatedFields.data);

    // send email via Resend
    await resend.emails.send({
      from: "contact@underdecanopy.com",
      to: "info@underdecanopy.com",
      replyTo: validatedFields.data.email,
      subject: `Contact Form: ${validatedFields.data.subject || "New Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Subject:</strong> ${validatedFields.data.subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.message}</p>
      `,
    });

    return { message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      message: "Failed to send message. Please try again or contact us directly.",
    };
  }
}