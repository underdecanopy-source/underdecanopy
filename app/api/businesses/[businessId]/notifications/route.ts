import { NextRequest, NextResponse } from 'next/server';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const notifications = await db.notification.findMany({
            where: {
                businessId: params.businessId,
                authUserId: access.user.id,
                status: { not: 'ARCHIVED' },
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(notifications);
    } catch (error) {
        console.error('List Olowo notifications failed:', error);
        return NextResponse.json({ error: 'Failed to load notifications' }, { status: 500 });
    }
}
