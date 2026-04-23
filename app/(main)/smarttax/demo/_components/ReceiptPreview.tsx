'use client';

import { Receipt as ReceiptIcon } from 'lucide-react';
import type { Profile, Transaction } from '../_lib/types';
import { formatNaira } from '../_lib/taxCalculator';
import { getTransactionLabel } from '../_lib/financials';

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
    whtPercentage: number;
    netAmount: number;
    receiptNumber?: string;
    createdAt?: string;
    transactionType: Transaction['type'];
    subCategory?: string;
    debitCreditFlag: Transaction['debitCreditFlag'];
    creditNoteGenerated?: boolean;
}

export function ReceiptPreview({
    profile,
    data,
    variant = 'live',
    id,
}: {
    profile: Profile;
    data: PreviewData;
    variant?: 'live' | 'final';
    id?: string;
}) {
    const isNonTaxable = data.customerType === 'non-taxable';
    const isLive = variant === 'live';
    const isRevenue = data.transactionType === 'revenue';
    const dateLabel = data.createdAt
        ? new Date(data.createdAt).toLocaleString('en-NG')
        : new Date().toLocaleString('en-NG');
    const whtAmount = data.amount * (data.whtPercentage / 100);

    return (
        <div id={id} className="bg-white border border-slate-200 rounded-lg p-5 md:p-6 print:border-0 print:shadow-none">
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
                    <p className="font-mono font-bold text-slate-900 text-sm">{data.receiptNumber || 'STX-PREVIEW'}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{dateLabel}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        isRevenue ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                >
                    {isRevenue ? 'Revenue' : 'Expense'}
                </span>
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        data.debitCreditFlag === 'credit' ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                    }`}
                >
                    {data.debitCreditFlag === 'credit' ? 'Credit' : 'Debit'}
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-[11px] font-semibold">
                    {transactionLabel}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase text-slate-500 mb-1">
                        {isRevenue ? 'Billed To' : 'Paid To'}
                    </p>
                    <p className="font-semibold text-slate-800 truncate">{data.customerName || '-'}</p>
                    {data.customerEmail && <p className="text-xs text-slate-600 truncate">{data.customerEmail}</p>}
                    {data.customerPhone && <p className="text-xs text-slate-600">{data.customerPhone}</p>}
                </div>
                <div className="text-right min-w-0">
                    <p className="text-[11px] font-semibold uppercase text-slate-500 mb-1">Classification</p>
                    <p className="font-semibold text-slate-800 truncate">{transactionLabel}</p>
                    <p className="text-[11px] text-slate-500 mt-1 capitalize">
                        Counterparty: {data.customerType.replace('-', ' ')}
                    </p>
                </div>
            </div>

            {isNonTaxable && (
                <div className="mb-3 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-900">
                    <strong>NO VAT and WHT supply.</strong> VAT and WHT are not applied for exempt goods or services.
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
                        <td className="py-2 text-slate-800">{data.description || '-'}</td>
                        <td className="py-2 text-right font-semibold text-slate-900">{formatNaira(data.amount)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="border-t border-slate-200 pt-2 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatNaira(data.amount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span className={data.vatable ? '' : 'line-through opacity-60'}>VAT Credit (7.5%)</span>
                    <span className={data.vatable ? 'text-orange-700' : 'text-slate-400'}>
                        {data.vatable ? `+ ${formatNaira(data.vatAmount)}` : 'Not applied'}
                    </span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span className={data.whtApplicable ? '' : 'line-through opacity-60'}>WHT Tax Credit</span>
                    <span className={data.whtApplicable ? 'text-rose-700' : 'text-slate-400'}>
                        {data.whtApplicable ? `- ${formatNaira(whtAmount)}` : 'Not deducted'}
                    </span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                    <span>{isRevenue ? 'Net Amount to Credit' : 'Net Amount Going Out'}</span>
                    <span>{formatNaira(data.netAmount)}</span>
                </div>
            </div>

            {!isRevenue && data.whtApplicable && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-800">
                    <strong>WHT Credit Note:</strong> Since {formatNaira(whtAmount)} has been withheld, we promise to remit this amount to the relevant tax authority. Kindly accept this Withholding Tax Credit Note from us as evidence of tax paid on your behalf.
                </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-200">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                    This receipt reflects the recorded financial event, its debit or credit classification, and the
                    applied tax treatment for audit and filing support.
                </p>
            </div>
        </div>
    );
}
