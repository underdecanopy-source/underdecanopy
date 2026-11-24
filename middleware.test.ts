/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import middleware from './middleware';

describe('shared authentication routes', () => {
    it.each(['/login?next=%2Folowo%2Fbusinesses', '/signup?next=%2Folowo%2Fbusinesses'])(
        'does not rewrite %s into a site folder',
        (pathname) => {
            const request = new NextRequest(`https://underdecanopy-source.vercel.app${pathname}`);

            const response = middleware(request);

            expect(response.headers.get('x-middleware-next')).toBe('1');
            expect(response.headers.get('x-middleware-rewrite')).toBeNull();
        },
    );
});
