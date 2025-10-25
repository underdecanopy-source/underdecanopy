# 💻 Code Recommendations - Underdecanopy Digital Hub

---

## 🎯 Recommended Improvements with Code Examples

---

## 1. Email Service Integration (HIGH PRIORITY)

### Current Implementation
```typescript
// lib/actions/contact.ts
console.log("New contact form submission:");
console.log(validatedFields.data);
return { message: "Your message has been sent successfully!" };
```

### Recommended Implementation
```typescript
// lib/actions/contact.ts
"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function submitContactForm(
  prevState: State,
  formData: FormData
): Promise<State> {
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
    // Send email to admin
    await resend.emails.send({
      from: "noreply@underdecanopy.com",
      to: "support@underdecanopy.com",
      subject: `New Contact: ${validatedFields.data.subject || "No Subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Subject:</strong> ${validatedFields.data.subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.message}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "noreply@underdecanopy.com",
      to: validatedFields.data.email,
      subject: "We received your message",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>We've received your message and will get back to you soon.</p>
      `,
    });

    return { message: "Your message has been sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return {
      message: "Failed to send message. Please try again.",
      errors: {},
    };
  }
}
```

### Setup Steps
```bash
# 1. Install Resend
npm install resend

# 2. Add to .env.local
RESEND_API_KEY=your_api_key_here

# 3. Update lib/actions/contact.ts with code above

# 4. Test the form
```

---

## 2. Add Error Boundary (HIGH PRIORITY)

### Create Error Boundary Component
```typescript
// components/ErrorBoundary.tsx
'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Use in Layout
```typescript
// app/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

---

## 3. Add Loading Skeleton (MEDIUM PRIORITY)

### Create Skeleton Component
```typescript
// components/Skeleton.tsx
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
```

### Use in Components
```typescript
// app/(main)/applysmart/_components/AdmissionCalculator.tsx
import { Skeleton } from '@/components/Skeleton';

export default function AdmissionCalculator() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Your calculation logic
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Rest of component
}
```

---

## 4. Add Rate Limiting (MEDIUM PRIORITY)

### Create Rate Limit Utility
```typescript
// lib/utils/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function checkRateLimit(identifier: string) {
  try {
    const { success } = await ratelimit.limit(identifier);
    return success;
  } catch (error) {
    console.error('Rate limit error:', error);
    return true; // Allow on error
  }
}
```

### Use in Server Actions
```typescript
// lib/actions/contact.ts
import { checkRateLimit } from '@/lib/utils/rateLimit';

export async function submitContactForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const email = formData.get('email') as string;
  
  // Check rate limit
  const allowed = await checkRateLimit(email);
  if (!allowed) {
    return {
      message: 'Too many requests. Please try again later.',
      errors: {},
    };
  }

  // Rest of function
}
```

### Setup
```bash
npm install @upstash/ratelimit @upstash/redis
```

---

## 5. Add Analytics (MEDIUM PRIORITY)

### Setup Google Analytics
```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Add to .env.local
```
NEXT_PUBLIC_GA_ID=G_XXXXXXXXXX
```

---

## 6. Add Unit Tests (HIGH PRIORITY)

### Test Admission Calculator
```typescript
// lib/utils/__tests__/admissionCalculator.test.ts
import { calculateAdmissionChance, getChanceColor } from '../admissionCalculator';

describe('admissionCalculator', () => {
  it('should calculate admission chance correctly', () => {
    const result = calculateAdmissionChance(
      'UNILAG',
      'medicine',
      350,
      'Lagos'
    );
    
    expect(result).toBeDefined();
    expect(result.chance).toBeGreaterThan(0);
    expect(result.chance).toBeLessThanOrEqual(100);
  });

  it('should return correct color for chance', () => {
    expect(getChanceColor(80)).toBe('#22c55e'); // green
    expect(getChanceColor(50)).toBe('#eab308'); // yellow
    expect(getChanceColor(20)).toBe('#ef4444'); // red
  });
});
```

### Setup Jest
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## 7. Add CSP Headers (MEDIUM PRIORITY)

### Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com; style-src 'self' 'unsafe-inline'",
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
```

---

## 📋 Implementation Priority

1. **Week 1:** Email integration + Error boundaries
2. **Week 2:** Unit tests + Loading skeletons
3. **Week 3:** Analytics + Rate limiting
4. **Week 4:** CSP headers + Accessibility audit

---

## ✅ Verification Checklist

After implementing each recommendation:

- [ ] Code compiles without errors
- [ ] TypeScript strict mode passes
- [ ] ESLint passes
- [ ] Tests pass (if applicable)
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Performance not degraded

---

**Last Updated:** October 21, 2025

