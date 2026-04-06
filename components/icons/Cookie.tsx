// components/icons/Cookie.tsx
import React from 'react';

export default function CookieIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <circle cx="12" cy="12" r="8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
      <circle cx="13" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}