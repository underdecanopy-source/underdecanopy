import { getSafeRedirectPath } from '../redirect';

describe('getSafeRedirectPath', () => {
    it('allows same-site destinations with query strings and hashes', () => {
        expect(getSafeRedirectPath('/olowo/businesses?tab=active#form')).toBe('/olowo/businesses?tab=active#form');
    });

    it('falls back for external and malformed destinations', () => {
        expect(getSafeRedirectPath(undefined)).toBe('/');
        expect(getSafeRedirectPath('https://example.com')).toBe('/');
        expect(getSafeRedirectPath('//example.com')).toBe('/');
        expect(getSafeRedirectPath('/\\example.com')).toBe('/');
    });
});
