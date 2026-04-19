'use client';

import { Receipt as ReceiptIcon } from 'lucide-react';
import type { Profile } from '../_lib/types';
import { formatNaira } from '../_lib/taxCalculator';

export interface PreviewData {
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerType: 'individual' | 'corporate' | 'non-taxable';
    description: string;
    category?: string;
    amount: number;
    vatable: boolean;
    whtApplicable: boolean;
    vatAmount: number;
    whtAmount: number;
    netAmount: number;
    receiptNumber?: string;
    createdAt?: string;
}

export function ReceiptPreview({
    profile,
    data,
    variant = 'live',
}: {
    profile: Profile;
    data: PreviewData;
    variant?: 'live' | 'final';
}) {
    const isNonTaxable = data.customerType === 'non-taxable';
    const isLive = variant === 'live';
    const dateLabel = data.createdAt
        ? new Date(data.createdAt).toLocaleString('en-NG')
        : new Date().toLocaleString('en-NG');

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6 print:border-0 print:shadow-none">
            {isLive && (
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-50 rounded-md px-3 py-1.5 w-fit">
                    <ReceiptIcon className="h-3.5 w-3.5" /> Live Preview
                </div>
            )}

            <div className="flex items-start justify-between border-b border-slate-200 pb-3 mb-3 gap-3">
                <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">
                        {profile.businessName || profile.name || 'Your Business'}
                    </h3>
                    {profile.email && <p className="text-xs text-slate-600 truncate">{profile.email}</p>}
                    {profile.phone && <p className="text-xs text-slate-600">{profile.phone}</p>}
                    {profile.address && <p className="text-xs text-slate-600">{profile.address}</p>}
                    <p className="text-[11px] text-slate-500 mt-1">
                        TIN: <span className="font-mono">{profile.tin || 'Not set'}</span>
                        {profile.vatNumber && data.vatable && (
                            <span className="ml-2">
                                | VAT Reg: <span className="font-mono">{profile.vatNumber}</span>
                            </span>
                        )}
                    </p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-[11px] font-semibold uppercase text-slate-500">Receipt</p>
                    <p className="font-mono font-bold text-slate-900 text-sm">
                        {data.receiptNumber || 'STX-PREVIEW'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">{dateLabel}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase text-slate-500 mb-1">Billed To</p>
                    <p className="font-semibold text-slate-800 truncate">{data.customerName || '—'}</p>
                    {data.customerEmail && <p className="text-xs text-slate-600 truncate">{data.customerEmail}</p>}
                    {data.customerPhone && <p className="text-xs text-slate-600">{data.customerPhone}</p>}
                </div>
                <div className="text-right min-w-0">
                    <p className="text-[11px] font-semibold uppercase text-slate-500 mb-1">Category</p>
                    <p className="font-semibold text-slate-800 truncate">{data.category || 'Sales'}</p>
                    <p className="text-[11px] text-slate-500 mt-1 capitalize">
                        Customer: {data.customerType.replace('-', ' ')}
                    </p>
                </div>
            </div>

            {isNonTaxable && (
                <div className="mb-3 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-900">
                    <strong>NO VAT &amp; WHT supply.</strong> VAT and WHT are not applied — e.g. basic food items,
                    educational materials, or other exempt goods/services under the Nigeria Tax Act.
                </div>
            )}

            <table className="w-full text-sm mb-3">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="text-left py-2 text-slate-500 font-medium">Description</th>
                        <th className="text-right py-2 text-slate-500 font-medium">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 text-slate-800">{data.description || '—'}</td>
                        <td className="py-2 text-right font-semibold text-slate-900">
                            {formatNaira(data.amount)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="border-t border-slate-200 pt-2 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatNaira(data.amount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span className={data.vatable ? '' : 'line-through opacity-60'}>VAT (7.5%)</span>
                    <span className={data.vatable ? 'text-orange-700' : 'text-slate-400'}>
                        {data.vatable ? `+ ${formatNaira(data.vatAmount)}` : 'Not applied'}
                    </span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span className={data.whtApplicable ? '' : 'line-through opacity-60'}>
                        Withholding Tax
                    </span>
                    <span className={data.whtApplicable ? 'text-rose-700' : 'text-slate-400'}>
                        {data.whtApplicable ? `− ${formatNaira(data.whtAmount)}` : 'Not deducted'}
                    </span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                    <span>Amount Payable</span>
                    <span>{formatNaira(data.netAmount)}</span>
                </div>
            </div>

            {data.whtApplicable && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
                    <strong>WHT Credit Note Required:</strong> Since {formatNaira(data.whtAmount)} has been withheld, the payer must remit this amount to the relevant tax authority and issue a Withholding Tax Credit Note to us as evidence of tax paid on our behalf.
                </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                    This is a legally compliant digital receipt issued under the Nigerian Revenue Service Act and the
                    Nigeria Tax Act 2025. Keep for your tax records. VAT (where applicable) remitted to NRS; WHT
                    deducted and remittable to the relevant tax authority by the payer.
                </p>
            </div>
        </div>
    );
}
