import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const resolveSchema = z.object({
    status: z.enum(['APPROVED', 'REJECTED', 'CANCELLED']),
    reason: z.string().trim().max(300).optional(),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const requests = await db.approvalRequest.findMany({
            where: { businessId: params.businessId },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(requests);
    } catch (error) {
        console.error('List Olowo approvals failed:', error);
        return NextResponse.json({ error: 'Failed to load approvals' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId, 'approvals:resolve');
        if (!access.ok) return access.response;
        const parsed = resolveSchema.safeParse(await request.json());
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const approvalId = request.nextUrl.searchParams.get('approvalId');
        if (!approvalId) {
            return NextResponse.json({ error: 'approvalId is required' }, { status: 400 });
        }
        const updated = await db.$transaction(async (tx) => {
            const approval = await tx.approvalRequest.findFirst({
                where: { id: approvalId, businessId: params.businessId, status: 'PENDING' },
            });
            if (!approval) throw new ApprovalNotFoundError();
            const resolved = await tx.approvalRequest.update({
                where: { businessId_id: { businessId: params.businessId, id: approval.id } },
                data: {
                    status: parsed.data.status,
                    reason: parsed.data.reason || null,
                    resolvedByAuthUserId: access.user.id,
                    resolvedAt: new Date(),
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'APPROVAL_RESOLVED',
                    entity: 'ApprovalRequest',
                    entityId: resolved.id,
                    metadata: { status: resolved.status, reason: resolved.reason },
                },
            });
            return resolved;
        });
        return NextResponse.json(updated);
    } catch (error) {
        if (error instanceof ApprovalNotFoundError) {
            return NextResponse.json({ error: 'Pending approval not found' }, { status: 404 });
        }
        console.error('Resolve Olowo approval failed:', error);
        return NextResponse.json({ error: 'Failed to resolve approval' }, { status: 500 });
    }
}

class ApprovalNotFoundError extends Error {}
