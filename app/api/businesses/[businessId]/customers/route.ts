import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const customerSchema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254).optional().or(z.literal('')),
    phone: z.string().trim().max(32).optional(),
    address: z.string().trim().max(300).optional(),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;

        const customers = await db.customer.findMany({
            where: { businessId: params.businessId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                _count: { select: { sales: true } },
            },
            orderBy: { name: 'asc' },
            take: 100,
        });

        return NextResponse.json(customers);
    } catch (error) {
        console.error('List Olowo customers failed:', error);
        return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId, 'sales:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }

        const parsed = customerSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const input = parsed.data;
        const customer = await db.$transaction(async (tx) => {
            const created = await tx.customer.create({
                data: {
                    businessId: params.businessId,
                    name: input.name,
                    email: input.email || null,
                    phone: input.phone || null,
                    address: input.address || null,
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'CUSTOMER_CREATED',
                    entity: 'Customer',
                    entityId: created.id,
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'CUSTOMER_CREATED',
                    entityType: 'Customer',
                    entityId: created.id,
                    actorAuthUserId: access.user.id,
                },
            });
            return created;
        });

        return NextResponse.json(customer, { status: 201 });
    } catch (error) {
        console.error('Create Olowo customer failed:', error);
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}
