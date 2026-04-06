import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  const { name, email, message, origin } = await req.json();

  if (!name || !email || !message || !origin) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate env vars are configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP environment variables not configured');
    return NextResponse.json({ error: 'Mail service not configured' }, { status: 503 });
  }

  const host = req.headers.get('host') || 'underdecanopy.com';

  const emailMapping: Record<string, string> = {
    'underdecanopy.com': 'underdecanopy@gmail.com',
    'smarttax.underdecanopy.com': 'underdecanopy@gmail.com',
    'swiftwheel.underdecanopy.com': 'underdecanopy@gmail.com',
    'coophub.underdecanopy.com': 'underdecanopy@gmail.com',
    'applysmart.underdecanopy.com': 'underdecanopy@gmail.com',
    'techlift.underdecanopy.com': 'underdecanopy@gmail.com',
    'trustfix.underdecanopy.com': 'underdecanopy@gmail.com',
  };

  const recipient = emailMapping[origin as string] || 'underdecanopy@gmail.com';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Sanitize user input for HTML email
  const safeName = escapeHtml(String(name));
  const safeEmail = escapeHtml(String(email));
  const safeMessage = escapeHtml(String(message));
  const safeOrigin = escapeHtml(String(origin));

  try {
    await transporter.sendMail({
      from: `"${safeName} via Underdecanopy" <${process.env.SMTP_USER}>`,
      replyTo: `"${safeName}" <${safeEmail}>`,
      to: recipient,
      subject: `New message from ${safeOrigin}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p><p>${safeMessage}</p>`,
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch {
    console.error('Failed to send contact form email');
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}