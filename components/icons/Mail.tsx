// components/icons/Mail.tsx
import React from 'react';

export default function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6l9 7 9-7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}