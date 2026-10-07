import { NextResponse } from 'next/server';
import type { BusinessRole } from '@/lib/generated/prisma';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';

const inventoryWriteRoles: BusinessRole[] = ['OWNER', 'ADMINISTRATOR', 'MANAGER', 'INVENTORY_STAFF'];

type BusinessAccess =
    | { ok: true; user: NonNullable<Awaited<ReturnType<typeof getUser>>>; role: BusinessRole }
    | { ok: false; response: NextResponse };

export async function requireBusinessAccess(businessId: string, writeInventory = false): Promise<BusinessAccess> {
    const user = await getUser();
    if (!user) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Authentication required' }, { status: 401 }),
        };
    }

    const membership = await db.businessMembership.findUnique({
        where: {
            businessId_authUserId: {
                businessId,
                authUserId: user.id,
            },
        },
        select: { role: true },
    });

    if (!membership) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Business access denied' }, { status: 403 }),
        };
    }

    if (writeInventory && !inventoryWriteRoles.includes(membership.role)) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'You do not have permission to change inventory' }, { status: 403 }),
        };
    }

    return { ok: true, user, role: membership.role };
}
