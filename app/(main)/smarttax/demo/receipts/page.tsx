'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Mail, MessageCircle, Printer, X } from 'lucide-react';
import { EmptyState, PageHeader } from '../_components/ui';
import { ReceiptPreview } from '../_components/ReceiptPreview';
import { buildReceiptShareText, openReceiptDocument } from '../_lib/receiptDocument';
import { useSmartTaxStore } from '../_lib/store';
import { formatNaira } from '../_lib/taxCalculator';

function ReceiptsInner() {
    const { state, hydrated, markReceiptSent } = useSmartTaxStore();
    const params = useSearchParams();
    const focusId = params.get('id');
    const [selectedId, setSelectedId] = useState<string | null>(focusId);
    const [actionStatus, setActionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const selected = useMemo(() => {
        const id = selectedId ?? state.receipts[0]?.id ?? null;
        if (!id) return null;
        const receipt = state.receipts.find((item) => item.id === id);
        if (!receipt) return null;
        const txn = state.transactions.find((item) => item.id === receipt.transactionId);
        if (!txn) return null;
        return { receipt, txn };
    }, [selectedId, state]);

    function getReceiptNode() {
        return document.getElementById('receipt-print-area');
    }

    function showActionStatus(message: string, type: 'success' | 'error') {
        setActionStatus({ message, type });
        window.setTimeout(() => setActionStatus(null), 6000);
    }

    function handleDocumentPopup(receiptNode: HTMLElement, title: string, autoPrint = false) {
        const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1200');
        if (!popup) {
            showActionStatus('Popup blocked. Please allow popups and try again.', 'error');
            return false;
        }

        // Defer heavy DOM serialization and cross-window writes to unblock the main thread
        // and allow the browser to paint the button's clicked state immediately.
        setTimeout(() => {
            openReceiptDocument(receiptNode, title, autoPrint, popup);
        }, 10);
        return true;
    }

    function handlePrint() {
        const receiptNode = getReceiptNode();
        if (!receiptNode || !selected) {
            showActionStatus('Unable to print receipt because the receipt content is unavailable.', 'error');
            return;
        }
        const opened = handleDocumentPopup(receiptNode, `${selected.receipt.receiptNumber} Receipt`, true);
        if (opened) {
            showActionStatus('Receipt window opened successfully. Use the browser print dialog to save or print.', 'success');
        }
    }

    function handleOpenReceiptOnly() {
        const receiptNode = getReceiptNode();
        if (!receiptNode || !selected) {
            showActionStatus('Unable to open receipt because the receipt content is unavailable.', 'error');
            return;
        }
        const opened = handleDocumentPopup(receiptNode, `${selected.receipt.receiptNumber} Receipt`);
        if (opened) {
            showActionStatus('Receipt opened successfully in a new tab.', 'success');
        }
    }

    function handleSend(channel: 'email' | 'whatsapp') {
        if (!selected) return;
        const shareText = buildReceiptShareText(state.profile, selected.txn, selected.receipt);

        if (channel === 'email') {
            const subject = encodeURIComponent(`Receipt ${selected.receipt.receiptNumber}`);
            const body = encodeURIComponent(shareText);
            window.location.href = `mailto:${selected.txn.customerEmail || ''}?subject=${subject}&body=${body}`;
            markReceiptSent(selected.receipt.id, channel);
            showActionStatus(`Prepared email share for ${selected.txn.customerName}.`, 'success');
            return;
        }

        const text = encodeURIComponent(shareText);
        const popup = window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
        if (!popup) {
            console.warn('WhatsApp share popup was blocked by the browser.');
            showActionStatus('WhatsApp share popup was blocked. Please allow popups and try again.', 'error');
            return;
        }

        markReceiptSent(selected.receipt.id, channel);
        showActionStatus(`Prepared WhatsApp share for ${selected.txn.customerName}.`, 'success');
    }

    if (!hydrated) {
        return <div className="p-8 text-slate-500">Loading...</div>;
    }

    if (state.receipts.length === 0) {
        return (
            <>
                <PageHeader title="Receipts" description="All digital receipts generated from your transactions." />
                <EmptyState
                    title="No receipts yet"
                    description="Create a transaction to generate a branded receipt with tax breakdown and debit or credit labeling."
                />
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="Receipts"
                description="Receipt-only output controls for print, PDF saving, email, and WhatsApp sharing."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-600 uppercase">All Receipts ({state.receipts.length})</p>
                    </div>
                    <ul className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                        {state.receipts.map((receipt) => {
                            const txn = state.transactions.find((item) => item.id === receipt.transactionId);
                            if (!txn) return null;
                            const isActive = selected?.receipt.id === receipt.id;
                            return (
                                <li key={receipt.id}>
                                    <button
                                        onClick={() => setSelectedId(receipt.id)}
                                        className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition ${isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                                    >
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <p className="font-semibold text-sm text-slate-800 truncate">{receipt.receiptNumber}</p>
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${txn.type === 'revenue' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {txn.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 truncate">{txn.customerName}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-slate-400">{new Date(receipt.createdAt).toLocaleDateString('en-NG')}</span>
                                            <span className="text-xs font-semibold text-slate-700">{formatNaira(txn.netAmount)}</span>
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
                                id="receipt-print-area"
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
                                    whtPercentage: selected.txn.whtPercentage,
                                    netAmount: selected.txn.netAmount,
                                    receiptNumber: selected.receipt.receiptNumber,
                                    createdAt: selected.receipt.createdAt,
                                    transactionType: selected.txn.type,
                                    subCategory: selected.txn.subCategory,
                                    debitCreditFlag: selected.txn.debitCreditFlag,
                                    creditNoteGenerated: selected.txn.creditNoteGenerated,
                                }}
                            />

                            <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                {selected.receipt.sentViaEmail && (
                                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                        <Check className="h-3 w-3" /> Email prepared
                                    </span>
                                )}
                                {selected.receipt.sentViaWhatsApp && (
                                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                        <Check className="h-3 w-3" /> WhatsApp prepared
                                    </span>
                                )}
                            </div>

                            <div className="mt-4 bg-white border border-slate-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-slate-800 mb-3">Receipt Output Controls</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleSend('email')}
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                                    >
                                        <Mail className="h-4 w-4" /> Share by Email
                                    </button>
                                    <button
                                        onClick={() => handleSend('whatsapp')}
                                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-emerald-700"
                                    >
                                        <MessageCircle className="h-4 w-4" /> Share on WhatsApp
                                    </button>
                                    <button
                                        onClick={handleOpenReceiptOnly}
                                        className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-200"
                                    >
                                        <Printer className="h-4 w-4" /> Open Receipt Only
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-800"
                                    >
                                        <Printer className="h-4 w-4" /> Print / Save PDF
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-3">
                                    Print and PDF actions are restricted to the receipt element only. SMS has been removed from this demo.
                                </p>
                                {actionStatus && (
                                    <div
                                        className={`mt-3 flex items-start gap-2 rounded-md px-3 py-2 text-xs ${
                                            actionStatus.type === 'success'
                                                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                                                : 'bg-rose-50 border border-rose-200 text-rose-800'
                                        }`}
                                    >
                                        <span className="flex-1">{actionStatus.message}</span>
                                        <button onClick={() => setActionStatus(null)} className="ml-auto">
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
        <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
            <ReceiptsInner />
        </Suspense>
    );
}
