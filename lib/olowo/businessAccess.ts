import { NextResponse } from 'next/server';
import type { BusinessRole } from '@/lib/generated/prisma';
import { getUser } from '@/lib/auth/server';
import db from '@/lib/prisma';

const inventoryWriteRoles: BusinessRole[] = ['OWNER', 'ADMINISTRATOR', 'MANAGER', 'INVENTORY_STAFF'];
const salesWriteRoles: BusinessRole[] = ['OWNER', 'ADMINISTRATOR', 'MANAGER', 'SALES_STAFF'];

export type BusinessWritePermission = 'inventory:write' | 'sales:write';

type BusinessAccess =
    | { ok: true; user: NonNullable<Awaited<ReturnType<typeof getUser>>>; role: BusinessRole }
    | { ok: false; response: NextResponse };

export async function requireBusinessAccess(
    businessId: string,
    permission: BusinessWritePermission | boolean = false,
): Promise<BusinessAccess> {
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

    // Keep `true` as an inventory-write alias for the existing inventory routes
    // while new routes explicitly declare the capability they need.
    const requestedPermission = permission === true ? 'inventory:write' : permission;
    const allowedRoles = requestedPermission === 'inventory:write'
        ? inventoryWriteRoles
        : requestedPermission === 'sales:write'
            ? salesWriteRoles
            : null;

    if (allowedRoles && !allowedRoles.includes(membership.role)) {
        return {
            ok: false,
            response: NextResponse.json({
                error: requestedPermission === 'inventory:write'
                    ? 'You do not have permission to change inventory'
                    : 'You do not have permission to record sales or manage customers',
            }, { status: 403 }),
        };
    }

    return { ok: true, user, role: membership.role };
}
