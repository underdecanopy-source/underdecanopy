import { defaultProfile, loadState } from '../store';

const storageKey = 'smarttax-demo-state-v1';

describe('Olowo demo state migration', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('uses Olowo defaults for a new demo profile', () => {
        const state = loadState();

        expect(state.profile).toEqual(defaultProfile);
        expect(state.profile.businessName).toBe('Olowo Demo Business');
        expect(state.profile.email).toBe('demo@olowo.ng');
    });

    it('rebrands legacy demo defaults without overwriting customized profile data', () => {
        window.localStorage.setItem(
            storageKey,
            JSON.stringify({
                profile: {
                    ...defaultProfile,
                    email: 'demo@smarttax.ng',
                    businessName: 'SmartTax Demo Business',
                    taxId: 'STX-DEMO-TAX-1001',
                    address: '12 Market Road',
                },
                transactions: [],
                receipts: [],
                taxReturns: [],
                reminders: [],
                auditTrail: [],
                settings: {},
            }),
        );

        const state = loadState();

        expect(state.profile.email).toBe('demo@olowo.ng');
        expect(state.profile.businessName).toBe('Olowo Demo Business');
        expect(state.profile.taxId).toBe('OLW-DEMO-TAX-1001');
        expect(state.profile.address).toBe('12 Market Road');

        const storedState = JSON.parse(window.localStorage.getItem(storageKey) || '{}');
        expect(storedState.profile.businessName).toBe('Olowo Demo Business');
    });

    it('preserves a user-customized business identity', () => {
        window.localStorage.setItem(
            storageKey,
            JSON.stringify({
                profile: {
                    ...defaultProfile,
                    email: 'owner@example.com',
                    businessName: 'My Shop',
                    taxId: 'CUSTOM-TAX-ID',
                },
                transactions: [],
                receipts: [],
                taxReturns: [],
                reminders: [],
                auditTrail: [],
                settings: {},
            }),
        );

        const state = loadState();

        expect(state.profile.email).toBe('owner@example.com');
        expect(state.profile.businessName).toBe('My Shop');
        expect(state.profile.taxId).toBe('CUSTOM-TAX-ID');
    });

    it('relabels legacy demo returns as prepared rather than authority-filed', () => {
        window.localStorage.setItem(
            storageKey,
            JSON.stringify({
                profile: defaultProfile,
                transactions: [],
                receipts: [],
                taxReturns: [
                    {
                        id: 'return-1',
                        status: 'filed',
                        totalIncome: 1000,
                        totalVatCollected: 75,
                    },
                ],
                reminders: [],
                auditTrail: [
                    {
                        id: 'audit-1',
                        resourceType: 'taxReturn',
                        action: 'filed',
                        timestamp: new Date().toISOString(),
                        recordHash: 'hash',
                    },
                ],
                settings: {},
            }),
        );

        const state = loadState();

        expect(state.taxReturns[0].status).toBe('prepared');
        expect(state.auditTrail[0].action).toBe('create');
        expect(state.auditTrail[0].note).toContain('tax-authority submission was not confirmed');
    });
});
