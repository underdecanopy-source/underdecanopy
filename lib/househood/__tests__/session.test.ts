import { createHousehoodSessionToken, verifyHousehoodSessionToken } from '../session';
import type { HousehoodUser } from '../types';

describe('Househood session tokens', () => {
    const secretNames = ['HOUSEHOOD_SESSION_SECRET', 'AUTH_SECRET', 'NEXTAUTH_SECRET'] as const;
    const originalSecrets = Object.fromEntries(
        secretNames.map((name) => [name, process.env[name]]),
    ) as Record<(typeof secretNames)[number], string | undefined>;
    const user: HousehoodUser = {
        id: 'user-1',
        email: 'manager@example.com',
        role: 'manager',
    };

    beforeEach(() => {
        secretNames.forEach((name) => delete process.env[name]);
    });

    afterEach(() => {
        secretNames.forEach((name) => {
            const original = originalSecrets[name];
            if (original === undefined) {
                delete process.env[name];
            } else {
                process.env[name] = original;
            }
        });
    });

    it('does not create tokens with a missing or weak secret', () => {
        expect(() => createHousehoodSessionToken(user)).toThrow(
            'Configure a Househood session secret with at least 32 characters.',
        );

        process.env.HOUSEHOOD_SESSION_SECRET = 'weak-secret';
        expect(() => createHousehoodSessionToken(user)).toThrow(
            'Configure a Househood session secret with at least 32 characters.',
        );
    });

    it('verifies signed tokens and rejects tampered tokens', () => {
        process.env.HOUSEHOOD_SESSION_SECRET = 'househood-test-secret-with-more-than-32-chars';
        const token = createHousehoodSessionToken(user);

        expect(verifyHousehoodSessionToken(token)).toMatchObject({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        expect(verifyHousehoodSessionToken(`${token}x`)).toBeNull();
    });

    it('rejects tokens when no secret is configured', () => {
        expect(verifyHousehoodSessionToken('encoded.signature')).toBeNull();
    });
});
