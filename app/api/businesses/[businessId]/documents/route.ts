import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const documentSchema = z.object({
    module: z.enum(['sales', 'purchases', 'expenses', 'inventory', 'business']),
    entityType: z.string().trim().min(1).max(64),
    entityId: z.string().trim().min(1).max(64),
    name: z.string().trim().min(1).max(120),
    contentType: z.string().trim().min(1).max(100),
    size: z.number().int().nonnegative().max(10 * 1024 * 1024),
    storageKey: z.string().trim().min(1).max(255),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const documents = await db.document.findMany({
            where: { businessId: params.businessId, status: 'UPLOADED' },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(documents);
    } catch (error) {
        console.error('List Olowo documents failed:', error);
        return NextResponse.json({ error: 'Failed to load documents' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }
        const parsed = documentSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        if (!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,254}$/.test(parsed.data.storageKey)) {
            return NextResponse.json({ error: 'Invalid storage key' }, { status: 400 });
        }
        if (!['application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
            .includes(parsed.data.contentType)) {
            return NextResponse.json({ error: 'Unsupported document content type' }, { status: 400 });
        }

        const document = await db.document.create({
            data: {
                businessId: params.businessId,
                module: parsed.data.module,
                entityType: parsed.data.entityType,
                entityId: parsed.data.entityId,
                name: parsed.data.name,
                contentType: parsed.data.contentType,
                size: parsed.data.size,
                storageKey: parsed.data.storageKey,
                actorAuthUserId: access.user.id,
            },
        });
        await db.auditLog.create({
            data: {
                businessId: params.businessId,
                actorAuthUserId: access.user.id,
                action: 'DOCUMENT_RECORDED',
                entity: 'Document',
                entityId: document.id,
                metadata: {
                    module: document.module,
                    entityType: document.entityType,
                    entityId: document.entityId,
                    name: document.name,
                },
            },
        });
        return NextResponse.json(document, { status: 201 });
    } catch (error) {
        console.error('Create Olowo document record failed:', error);
        return NextResponse.json({ error: 'Failed to record document' }, { status: 500 });
    }
}
