import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email routing configuration based on subdomain/purpose
const EMAIL_ROUTING: Record<string, string[]> = {
  coophub: ['contactus@underdecanopy.com', 'partners@underdecanopy.com'],
  applysmart: ['contactus@underdecanopy.com'],
  smarttax: ['support@underdecanopy.com', 'contactus@underdecanopy.com'],
  swiftwheel: ['contactus@underdecanopy.com', 'support@underdecanopy.com'],
  techlift: ['contactus@underdecanopy.com'],
  trustfix: ['contactus@underdecanopy.com'],
  default: ['contactus@underdecanopy.com'],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, purpose, path } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Determine recipient emails based on purpose/path
    const hostname = new URL(path || 'https://underdecanopy.com').hostname;
    const subdomain = hostname.split('.')[0];
    const recipients = EMAIL_ROUTING[subdomain] || EMAIL_ROUTING.default;

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'no-reply@underdecanopy.com',
      to: recipients.join(', '),
      subject: `New Contact Form Submission from ${subdomain || 'main site'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${subdomain || 'main site'}</p>
            <p><strong>URL:</strong> ${path || 'N/A'}</p>
            <p><strong>Purpose:</strong> ${purpose || 'General inquiry'}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #2c5530; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-left: 4px solid #2c5530;">
            <p style="margin: 0; font-size: 12px; color: #555;">
              This message was sent via the Underdecanopy contact form on ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Source: ${subdomain || 'main site'}
URL: ${path || 'N/A'}
Purpose: ${purpose || 'General inquiry'}

Message:
${message}

---
Sent via Underdecanopy contact form on ${new Date().toLocaleString()}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}