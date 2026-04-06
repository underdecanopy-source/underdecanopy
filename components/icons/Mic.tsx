// components/icons/Mic.tsx
import React from 'react';

export default function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" {...props} aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3" strokeWidth="1.5" />
      <path d="M12 17v4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 21h8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}