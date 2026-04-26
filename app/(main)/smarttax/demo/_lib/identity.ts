import type { Profile } from './types';

export interface ResolvedTaxIdentity {
    primaryLabel: 'Tax ID';
    primaryValue: string;
    secondaryLabel: 'TIN' | null;
    secondaryValue: string | null;
    source: 'tax-id' | 'tin-fallback' | 'missing';
}

function sanitizeValue(value?: string | null): string {
    return value?.trim() ?? '';
}

export function resolveTaxIdentity(profile: Pick<Profile, 'taxId' | 'tin'>): ResolvedTaxIdentity {
    const taxId = sanitizeValue(profile.taxId);
    const tin = sanitizeValue(profile.tin);

    if (taxId) {
        return {
            primaryLabel: 'Tax ID',
            primaryValue: taxId,
            secondaryLabel: tin && tin !== taxId ? 'TIN' : null,
            secondaryValue: tin && tin !== taxId ? tin : null,
            source: 'tax-id',
        };
    }

    if (tin) {
        return {
            primaryLabel: 'Tax ID',
            primaryValue: tin,
            secondaryLabel: null,
            secondaryValue: null,
            source: 'tin-fallback',
        };
    }

    return {
        primaryLabel: 'Tax ID',
        primaryValue: '',
        secondaryLabel: null,
        secondaryValue: null,
        source: 'missing',
    };
}

export function requireTaxIdentity(profile: Pick<Profile, 'taxId' | 'tin'>): ResolvedTaxIdentity {
    const identity = resolveTaxIdentity(profile);
    if (!identity.primaryValue) {
        throw new Error('Missing Tax ID or TIN. Update SmartTax settings before generating a receipt or return.');
    }
    return identity;
}
