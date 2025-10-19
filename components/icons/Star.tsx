// components/icons/Star.tsx
import React from 'react';

export default function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <path d="M12 2l2.6 6.6L21 10l-5 3.8L17 21l-5-3.2L7 21l1-7.2L3 10l6.4-1.4L12 2z" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}