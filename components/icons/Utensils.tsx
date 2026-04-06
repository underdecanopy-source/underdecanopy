// components/icons/Utensils.tsx
import React from 'react';

export default function UtensilsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <path d="M8 2v10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 6c2 0 4-1 6-1s3 1 3 3-1 3-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}