// components/icons/Coffee.tsx
import React from 'react';

export default function CoffeeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <path d="M3 7h14v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}