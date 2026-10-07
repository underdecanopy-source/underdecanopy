import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/lib/generated/prisma';
import { z } from 'zod';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

const productSchema = z.object({
    name: z.string().trim().min(1).max(120),
    sku: z.string().trim().max(64).optional(),
    category: z.string().trim().max(80).optional(),
    unit: z.string().trim().min(1).max(24).default('each'),
    costPrice: z.number().finite().min(0).max(9999999999.99)
        .refine((value) => Number(value.toFixed(2)) === value, 'Cost price may have up to 2 decimal places'),
    sellingPrice: z.number().finite().min(0).max(9999999999.99)
        .refine((value) => Number(value.toFixed(2)) === value, 'Selling price may have up to 2 decimal places'),
    trackInventory: z.boolean().default(true),
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

        const parsed = productSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', details: parsed.error.issues }, { status: 400 });
        }

        const input = parsed.data;
        const categoryName = input.category || '';
        const product = await db.$transaction(async (tx) => {
            const category = categoryName
                ? await tx.productCategory.upsert({
                    where: { businessId_name: { businessId: params.businessId, name: categoryName } },
                    create: { businessId: params.businessId, name: categoryName },
                    update: {},
                    select: { id: true },
                })
                : null;

            const created = await tx.product.create({
                data: {
                    businessId: params.businessId,
                    categoryId: category?.id,
                    name: input.name,
                    sku: input.sku || null,
                    unit: input.unit,
                    costPrice: new Prisma.Decimal(String(input.costPrice)),
                    sellingPrice: new Prisma.Decimal(String(input.sellingPrice)),
                    trackInventory: input.trackInventory,
                },
                include: { category: { select: { id: true, name: true } } },
            });
            await tx.auditLog.create({
                data: {
                    businessId: params.businessId,
                    actorAuthUserId: access.user.id,
                    action: 'PRODUCT_CREATED',
                    entity: 'Product',
                    entityId: created.id,
                    metadata: { sku: created.sku, category: categoryName || null },
                },
            });
            return created;
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({ error: 'A product with this SKU already exists in this business' }, { status: 409 });
        }
        console.error('Create Olowo product failed:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
