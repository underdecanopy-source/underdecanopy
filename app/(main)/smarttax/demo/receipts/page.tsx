'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader, EmptyState } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';
import { formatNaira } from '../_lib/taxCalculator';
import { Mail, MessageCircle, Phone, Printer, Receipt as ReceiptIcon, X, Check } from 'lucide-react';

function ReceiptsInner() {
    const { state, hydrated, markReceiptSent } = useSmartTaxStore();
    const params = useSearchParams();
    const focusId = params.get('id');
    const [selectedId, setSelectedId] = useState<string | null>(focusId);
    const [sendStatus, setSendStatus] = useState<string | null>(null);

    const selected = useMemo(() => {
        const id = selectedId ?? state.receipts[0]?.id ?? null;
        if (!id) return null;
        const receipt = state.receipts.find((r) => r.id === id);
        if (!receipt) return null;
        const txn = state.transactions.find((t) => t.id === receipt.transactionId);
        if (!txn) return null;
        return { receipt, txn };
    }, [selectedId, state]);

    function handleSend(channel: 'email' | 'sms' | 'whatsapp') {
        if (!selected) return;
        markReceiptSent(selected.receipt.id, channel);
        const label =
            channel === 'email'
                ? selected.txn.customerEmail || 'the customer email on file'
                : selected.txn.customerPhone || 'the customer phone on file';
        setSendStatus(
            `Simulated ${channel.toUpperCase()} delivery to ${label}. In production, SmartTax integrates with email, SMS gateways, and the WhatsApp Business API.`
        );
        setTimeout(() => setSendStatus(null), 6000);
    }

    function handlePrint() {
        if (typeof window !== 'undefined') window.print();
    }

    if (!hydrated) {
        return <div className="p-8 text-slate-500">Loading…</div>;
    }

    if (state.receipts.length === 0) {
        return (
            <>
                <PageHeader title="Receipts" description="All digital receipts generated from your transactions." />
                <EmptyState
                    title="No receipts yet"
                    description="Create a transaction to generate a legally compliant digital receipt."
                />
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="Receipts"
                description="FIRS-compliant digital receipts, branded with your business details and ready to send to customers."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-600 uppercase">All Receipts ({state.receipts.length})</p>
                    </div>
                    <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                        {state.receipts.map((r) => {
                            const txn = state.transactions.find((t) => t.id === r.transactionId);
                            if (!txn) return null;
                            const isActive = selected?.receipt.id === r.id;
                            return (
                                <li key={r.id}>
                                    <button
                                        onClick={() => setSelectedId(r.id)}
                                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${
                                            isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <ReceiptIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                            <p className="font-semibold text-sm text-slate-800 truncate">{r.receiptNumber}</p>
                                        </div>
                                        <p className="text-xs text-slate-600 truncate">{txn.customerName}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-slate-400">
                                                {new Date(r.createdAt).toLocaleDateString('en-NG')}
                                            </span>
                                            <span className="text-xs font-semibold text-slate-700">
                                                {formatNaira(txn.netAmount)}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    {selected && (
                        <>
                            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 print:border-0 print:shadow-none">
                                <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {state.profile.businessName || state.profile.name}
                                        </h3>
                                        <p className="text-sm text-slate-600">{state.profile.email}</p>
                                        {state.profile.phone && <p className="text-sm text-slate-600">{state.profile.phone}</p>}
                                        {state.profile.address && <p className="text-sm text-slate-600">{state.profile.address}</p>}
                                        <p className="text-xs text-slate-500 mt-1">
                                            TIN: <span className="font-mono">{state.profile.tin || 'Not set'}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold uppercase text-slate-500">Receipt</p>
                                        <p className="font-mono font-bold text-slate-900">{selected.receipt.receiptNumber}</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(selected.receipt.createdAt).toLocaleString('en-NG')}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Billed To</p>
                                        <p className="font-semibold text-slate-800">{selected.txn.customerName}</p>
                                        {selected.txn.customerEmail && <p className="text-slate-600">{selected.txn.customerEmail}</p>}
                                        {selected.txn.customerPhone && <p className="text-slate-600">{selected.txn.customerPhone}</p>}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Category</p>
                                        <p className="font-semibold text-slate-800">{selected.txn.category || 'Sales'}</p>
                                        <p className="text-xs text-slate-500 mt-1 capitalize">
                                            Customer: {selected.txn.customerType}
                                        </p>
                                    </div>
                                </div>

                                <table className="w-full text-sm mb-4">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left py-2 text-slate-500 font-medium">Description</th>
                                            <th className="text-right py-2 text-slate-500 font-medium">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-3 text-slate-800">{selected.txn.description}</td>
                                            <td className="py-3 text-right font-semibold text-slate-900">
                                                {formatNaira(selected.txn.amount)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="border-t border-slate-200 pt-3 space-y-1 text-sm">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>{formatNaira(selected.txn.amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>VAT (7.5%)</span>
                                        <span className="text-orange-700">+ {formatNaira(selected.txn.vatAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Withholding Tax</span>
                                        <span className="text-rose-700">− {formatNaira(selected.txn.whtAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200 mt-2">
                                        <span>Amount Payable</span>
                                        <span>{formatNaira(selected.txn.netAmount)}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-200">
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        This is a legally compliant digital receipt issued under the Nigerian Revenue Service
                                        Act and the Nigeria Tax Act 2025. Keep for your tax records. VAT remitted to FIRS; WHT
                                        deducted and remittable to the relevant tax authority by the payer.
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                    {selected.receipt.sentViaEmail && (
                                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                            <Check className="h-3 w-3" /> Email sent
                                        </span>
                                    )}
                                    {selected.receipt.sentViaSms && (
                                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                            <Check className="h-3 w-3" /> SMS sent
                                        </span>
                                    )}
                                    {selected.receipt.sentViaWhatsApp && (
                                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                            <Check className="h-3 w-3" /> WhatsApp sent
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4 print:hidden">
                                <p className="text-sm font-semibold text-slate-800 mb-3">Deliver Receipt</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleSend('email')}
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                                    >
                                        <Mail className="h-4 w-4" /> Send Email
                                    </button>
                                    <button
                                        onClick={() => handleSend('sms')}
                                        className="inline-flex items-center gap-2 bg-slate-700 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-800"
                                    >
                                        <Phone className="h-4 w-4" /> Send SMS
                                    </button>
                                    <button
                                        onClick={() => handleSend('whatsapp')}
                                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-emerald-700"
                                    >
                                        <MessageCircle className="h-4 w-4" /> Send WhatsApp
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-200"
                                    >
                                        <Printer className="h-4 w-4" /> Print / Save PDF
                                    </button>
                                </div>
                                {sendStatus && (
                                    <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-xs text-blue-900">
                                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                        <span>{sendStatus}</span>
                                        <button onClick={() => setSendStatus(null)} className="ml-auto">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default function ReceiptsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-slate-500">Loading…</div>}>
            <ReceiptsInner />
        </Suspense>
    );
}
