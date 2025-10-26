# Phase 1 Implementation Guide - Critical Website Fixes
Complete guide for implementing all critical fixes identified in the comprehensive audit.

## Table of Contents
1. Overview & Timeline
2. Quick Start
3. Fix #1: Viewport & SEO Metadata
4. Fix #2: Broken Podcast Link
5. Fix #3: Contact Form Email Integration
6. Fix #4: Sitemap & Robots.txt
7. Fix #5: Image Optimization
8. Testing Guide
9. Deployment Checklist

## 1. Overview & Timeline
This document outlines the critical fixes needed to enhance the website's performance and SEO. The implementation timeline is as follows:
- Week 1: Fix #1 & #2
- Week 2: Fix #3 & #4
- Week 3: Fix #5 & Testing

## 2. Quick Start
To start implementing the fixes, follow the respective sections below. Make sure to back up your code before making any changes.

## 3. Fix #1: Viewport & SEO Metadata
Update the `app/layout.tsx` file with the following code:
```tsx
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Your Website Description" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Your Website Name',
            url: 'https://yourwebsite.com',
          })}
        </script>
      </Head>
      {children}
    </>
  );
}
```

## 4. Fix #2: Broken Podcast Link
Update the `components/Navigation.tsx` file to fix the podcast link:
```tsx
const Navigation = () => {
  return (
    <nav>
      <a href="https://yourpodcastlink.com">Podcast</a>
    </nav>
  );
};
export default Navigation;
```

## 5. Fix #3: Contact Form Email Integration
Update the `lib/actions/contact.ts` file with Resend integration:
```ts
import Resend from 'resend';

const resend = new Resend('YOUR_API_KEY');

export const sendContactEmail = async (data) => {
  await resend.sendEmail({
    to: data.email,
    from: 'your-email@domain.com',
    subject: 'Contact Form Submission',
    html: `<p>${data.message}</p>`,
  });
};
```

## 6. Fix #4: Sitemap & Robots.txt
Create the `app/sitemap.ts` file:
```ts
export default function Sitemap() {
  return 'Sitemap content';
}
```
Create the `app/robots.ts` file:
```ts
export default function Robots() {
  return 'User-agent: *\nDisallow: /private/';
}
```

## 7. Fix #5: Image Optimization
Include image optimization examples:
```tsx
<img src="/path/to/image.jpg" loading="lazy" alt="Description" />
```

## 8. Testing Guide
After implementing the fixes, run the following tests:
- Check the viewport using Chrome DevTools.
- Verify the podcast link works.
- Test the contact form submission.
- Ensure the sitemap and robots.txt are accessible.
- Review image loading performance.

## 9. Deployment Checklist
- [ ] Code changes pushed to repository
- [ ] Tests completed successfully
- [ ] Backup of the current deployment
- [ ] Deployment to production environment

Please ensure you follow the instructions carefully and reach out if you encounter any issues.