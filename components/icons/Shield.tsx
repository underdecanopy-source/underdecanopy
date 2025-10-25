// components/icons/Shield.tsx
import React from 'react';

export default function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <path d="M12 2l7 3v6c0 5-4 9-7 11-3-2-7-6-7-11V5l7-3z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8v5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}