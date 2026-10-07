import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const warehouseSchema = z.object({
    name: z.string().trim().min(1).max(100),
    address: z.string().trim().max(240).optional(),
});

type RouteContext = { params: { businessId: string } };

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId, true);
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }

        const parsed = warehouseSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const warehouse = await db.$transaction(async (tx) => {
            const created = await tx.warehouse.create({
                data: {
                    businessId: params.businessId,
                    name: parsed.data.name,
                    address: parsed.data.address || null,
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'WAREHOUSE_CREATED',
                    entity: 'Warehouse',
                    entityId: created.id,
                },
            });
            return created;
        });

        return NextResponse.json(warehouse, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({ error: 'A warehouse with this name already exists in this business' }, { status: 409 });
        }
        console.error('Create Olowo warehouse failed:', error);
        return NextResponse.json({ error: 'Failed to create warehouse' }, { status: 500 });
    }
}
