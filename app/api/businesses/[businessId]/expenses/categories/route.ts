import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const categorySchema = z.object({
    name: z.string().trim().min(1).max(80),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const categories = await db.expenseCategory.findMany({
            where: { businessId: params.businessId },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error('List Olowo expense categories failed:', error);
        return NextResponse.json({ error: 'Failed to load expense categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId, 'expenses:write');
        if (!access.ok) return access.response;

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
        }
        const parsed = categorySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }
        const category = await db.expenseCategory.create({
            data: { businessId: params.businessId, name: parsed.data.name },
        });
        await db.auditLog.create({
            data: {
                businessId: params.businessId,
                actorAuthUserId: access.user.id,
                action: 'EXPENSE_CATEGORY_CREATED',
                entity: 'ExpenseCategory',
                entityId: category.id,
            },
        });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.constructor.name === 'PrismaClientKnownRequestError') {
            return NextResponse.json({ error: 'An expense category with this name already exists' }, { status: 409 });
        }
        console.error('Create Olowo expense category failed:', error);
        return NextResponse.json({ error: 'Failed to create expense category' }, { status: 500 });
    }
}
