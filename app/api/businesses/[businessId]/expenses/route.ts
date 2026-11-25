import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const expenseSchema = z.object({
    categoryId: z.string().trim().min(1).max(64),
    amount: z.number().finite().positive().max(9999999999.99)
        .refine((value) => Number(value.toFixed(2)) === value),
    paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'POS', 'OTHER']).default('CASH'),
    description: z.string().trim().min(1).max(300),
    occurredAt: z.string().datetime().optional(),
    idempotencyKey: z.string().uuid(),
});

type RouteContext = { params: { businessId: string } };

export async function GET(_request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;
        const expenses = await db.expense.findMany({
            where: { businessId: params.businessId },
            include: { category: { select: { id: true, name: true } } },
            orderBy: { occurredAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(expenses);
    } catch (error) {
        console.error('List Olowo expenses failed:', error);
        return NextResponse.json({ error: 'Failed to load expenses' }, { status: 500 });
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
        const parsed = expenseSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const input = parsed.data;
        const amount = new Prisma.Decimal(String(input.amount));
        const occurredAt = input.occurredAt ? new Date(input.occurredAt) : new Date();

        const expense = await db.$transaction(async (tx) => {
            const previous = await tx.expense.findUnique({
                where: {
                    businessId_idempotencyKey: {
                        businessId: params.businessId,
                        idempotencyKey: input.idempotencyKey,
                    },
                },
            });
            if (previous) return { expense: previous, replayed: true };

            const category = await tx.expenseCategory.findFirst({
                where: { id: input.categoryId, businessId: params.businessId },
                select: { id: true, name: true },
            });
            if (!category) throw new MissingExpenseCategoryError();

            const created = await tx.expense.create({
                data: {
                    businessId: params.businessId,
                    categoryId: category.id,
                    amount,
                    status: 'APPROVED',
                    paymentMethod: input.paymentMethod,
                    description: input.description,
                    occurredAt,
                    idempotencyKey: input.idempotencyKey,
                    actorAuthUserId: access.user.id,
                    approvedByAuthUserId: access.user.id,
                    paidAt: occurredAt,
                },
                include: { category: { select: { id: true, name: true } } },
            });

            const accounts = await tx.account.findMany({
                where: { businessId: params.businessId, code: { in: ['1000', '5000'] } },
                select: { id: true, code: true },
            });
            const accountId = Object.fromEntries(accounts.map((account) => [account.code, account.id]));
            if (!accountId['1000'] || !accountId['5000']) throw new MissingExpenseAccountError();

            await tx.journalEntry.create({
                data: {
                    businessId: params.businessId,
                    sourceType: 'EXPENSE',
                    sourceId: created.id,
                    memo: `Expense: ${created.description}`,
                    actorAuthUserId: access.user.id,
                    lines: {
                        create: [
                            { accountId: accountId['5000'], debit: amount, credit: new Prisma.Decimal(0) },
                            { accountId: accountId['1000'], debit: new Prisma.Decimal(0), credit: amount },
                        ],
                    },
                },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'EXPENSE_RECORDED',
                    entity: 'Expense',
                    entityId: created.id,
                    metadata: {
                        categoryId: category.id,
                        amount: amount.toString(),
                        paymentMethod: input.paymentMethod,
                    },
                },
            });
            await tx.businessEvent.create({
                data: {
                    businessId: params.businessId,
                    eventType: 'EXPENSE_RECORDED',
                    entityType: 'Expense',
                    entityId: created.id,
                    actorAuthUserId: access.user.id,
                    data: { categoryId: category.id, amount: amount.toString(), paymentMethod: input.paymentMethod },
                },
            });
            return { expense: created, replayed: false };
        }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

        return NextResponse.json(expense, { status: expense.replayed ? 200 : 201 });
    } catch (error) {
        if (error instanceof MissingExpenseCategoryError) {
            return NextResponse.json({ error: 'Expense category not found' }, { status: 400 });
        }
        if (error instanceof MissingExpenseAccountError) {
            return NextResponse.json({ error: 'Required cash or expense accounts are missing' }, { status: 409 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
            return NextResponse.json({ error: 'Expense changed concurrently. Refresh and retry.' }, { status: 409 });
        }
        console.error('Create Olowo expense failed:', error);
        return NextResponse.json({ error: 'Failed to record expense' }, { status: 500 });
    }
}

class MissingExpenseCategoryError extends Error {}
class MissingExpenseAccountError extends Error {}
