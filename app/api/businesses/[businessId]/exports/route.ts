import { NextRequest, NextResponse } from 'next/server';
import { requireBusinessAccess } from '@/lib/olowo/businessAccess';
import db from '@/lib/prisma';

type RouteContext = { params: { businessId: string } };

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const access = await requireBusinessAccess(params.businessId);
        if (!access.ok) return access.response;

        const format = request.nextUrl.searchParams.get('format') === 'csv' ? 'csv' : 'json';
        const moduleName = request.nextUrl.searchParams.get('module') || 'sales';
        if (!['sales', 'purchases', 'expenses', 'inventory'].includes(moduleName)) {
            return NextResponse.json({ error: 'Unsupported export module' }, { status: 400 });
        }

        let rows: unknown[] = [];
        if (moduleName === 'sales') {
            rows = await db.sale.findMany({
                where: { businessId: params.businessId },
                include: { customer: { select: { name: true } }, warehouse: { select: { name: true } } },
                orderBy: { occurredAt: 'asc' },
                take: 10000,
            });
        } else if (moduleName === 'purchases') {
            rows = await db.purchase.findMany({
                where: { businessId: params.businessId },
                include: { supplier: { select: { name: true } }, warehouse: { select: { name: true } } },
                orderBy: { occurredAt: 'asc' },
                take: 10000,
            });
        } else if (moduleName === 'expenses') {
            rows = await db.expense.findMany({
                where: { businessId: params.businessId },
                include: { category: { select: { name: true } } },
                orderBy: { occurredAt: 'asc' },
                take: 10000,
            });
        } else {
            rows = await db.stockMovement.findMany({
                where: { businessId: params.businessId },
                include: { product: { select: { name: true } }, warehouse: { select: { name: true } } },
                orderBy: { createdAt: 'asc' },
                take: 10000,
            });
        }

        if (format === 'json') {
            return NextResponse.json({
                module: moduleName,
                exportedAt: new Date().toISOString(),
                rows,
            });
        }

        const flattened = rows.map((row) => flattenRow(row));
        const headers = Array.from(new Set(flattened.flatMap((row) => Object.keys(row))));
        const csv = [
            headers.map(csvEscape).join(','),
            ...flattened.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
        ].join('\r\n');
        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="olowo-${moduleName}-export.csv"`,
            },
        });
    } catch (error) {
        console.error('Olowo export failed:', error);
        return NextResponse.json({ error: 'Failed to export business data' }, { status: 500 });
    }
}

function flattenRow(value: unknown, prefix = '', result: Record<string, string> = {}) {
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date) && typeof (value as { toString?: unknown }).toString !== 'undefined') {
        for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
            const path = prefix ? `${prefix}.${key}` : key;
            if (nested && typeof nested === 'object' && !Array.isArray(nested) && !isDecimal(nested)) {
                if (nested instanceof Date) {
                    result[path] = nested.toISOString();
                } else {
                    flattenRow(nested, path, result);
                }
            } else if (Array.isArray(nested)) {
                result[path] = JSON.stringify(nested);
            } else if (nested !== null && nested !== undefined) {
                result[path] = String(nested);
            }
        }
    }
    return result;
}

function isDecimal(value: unknown) {
    return typeof value === 'object' && value !== null && typeof (value as { toFixed?: unknown }).toFixed === 'function';
}

function csvEscape(value: unknown) {
    const text = value === null || value === undefined ? '' : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
