import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const supplierSchema = z.object({
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
        const suppliers = await db.supplier.findMany({
            where: { businessId: params.businessId },
            orderBy: { name: 'asc' },
            take: 100,
        });
        return NextResponse.json(suppliers);
    } catch (error) {
        console.error('List Olowo suppliers failed:', error);
        return NextResponse.json({ error: 'Failed to load suppliers' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId, 'purchases:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }
        const parsed = supplierSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const supplier = await db.$transaction(async (tx) => {
            const created = await tx.supplier.create({
                data: {
                    businessId: params.businessId,
                    name: parsed.data.name,
                    email: parsed.data.email || null,
                    phone: parsed.data.phone || null,
                    address: parsed.data.address || null,
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'SUPPLIER_CREATED',
                    entity: 'Supplier',
                    entityId: created.id,
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'SUPPLIER_CREATED',
                    entityType: 'Supplier',
                    entityId: created.id,
                    actorAuthUserId: access.user.id,
                },
            });
            return created;
        });

        return NextResponse.json(supplier, { status: 201 });
    } catch (error) {
        console.error('Create Olowo supplier failed:', error);
        return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
    }
}
