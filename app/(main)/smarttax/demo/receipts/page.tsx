'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader, EmptyState } from '../_components/ui';
import { ReceiptPreview } from '../_components/ReceiptPreview';
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
                                            {txn.customerType === 'non-taxable' && (
                                                <span className="text-[9px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                                                    Exempt
                                                </span>
                                            )}
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
                            <ReceiptPreview
                                profile={state.profile}
                                variant="final"
                                data={{
                                    customerName: selected.txn.customerName,
                                    customerEmail: selected.txn.customerEmail,
                                    customerPhone: selected.txn.customerPhone,
                                    customerType: selected.txn.customerType,
                                    description: selected.txn.description,
                                    category: selected.txn.category,
                                    amount: selected.txn.amount,
                                    vatable: selected.txn.vatable,
                                    whtApplicable: selected.txn.whtApplicable,
                                    vatAmount: selected.txn.vatAmount,
                                    whtAmount: selected.txn.whtAmount,
                                    netAmount: selected.txn.netAmount,
                                    receiptNumber: selected.receipt.receiptNumber,
                                    createdAt: selected.receipt.createdAt,
                                }}
                            />

                            <div className="mt-4 flex flex-wrap gap-2 text-xs print:hidden">
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
