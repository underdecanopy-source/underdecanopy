import * as React from 'react';
import type { SVGProps } from 'react';

const HandHelping = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 12h2a2 2 0 1 0 0-4h-3c-1.1 0-2 .9-2 2v1a2 2 0 1 0 4 0v-1m-6 8a2 2 0 1 1 4 0v-6H6z" />
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 19a2 2 0 1 0 4 0v-8.5a2 2 0 0 0-2-2h-6V16" />
  </svg>
);
export default HandHelping;