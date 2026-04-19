'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PageHeader, EmptyState } from '../_components/ui';
import { ReceiptPreview } from '../_components/ReceiptPreview';
import { useSmartTaxStore } from '../_lib/store';
import {
    calculateTransactionTax,
    formatAmountInput,
    formatNaira,
    parseAmountInput,
} from '../_lib/taxCalculator';
import { Plus, Trash2, Eye, X } from 'lucide-react';
import type { CustomerType } from '../_lib/types';

function CustomerTypeBadge({ type }: { type: CustomerType }) {
    if (type === 'non-taxable') {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                NO VAT & WHT
            </span>
        );
    }
    if (type === 'corporate') {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                Corporate
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-800 uppercase tracking-wide">
            Individual
        </span>
    );
}

export default function TransactionsPage() {
    const { state, hydrated, addTransaction, deleteTransaction } = useSmartTaxStore();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerType: 'individual' as CustomerType,
        description: '',
        amountFormatted: '',
        category: 'Sales',
        vatable: true,
        whtApplicable: true,
    });

    const hasVatNumber = !!state.profile.vatNumber;
    const isNonTaxable = form.customerType === 'non-taxable';
    const effectiveVatable = (!hasVatNumber || isNonTaxable) ? false : form.vatable;
    const effectiveWht = isNonTaxable ? false : form.whtApplicable;

    const amountNumber = parseAmountInput(form.amountFormatted);

    const preview = useMemo(() => {
        if (!amountNumber || amountNumber <= 0) {
            return { vatAmount: 0, whtAmount: 0, netAmount: 0, totalTax: 0 };
        }
        return calculateTransactionTax({
            amount: amountNumber,
            customerType: form.customerType,
            vatable: effectiveVatable,
            whtApplicable: effectiveWht,
            category: form.category,
        });
    }, [amountNumber, form.customerType, effectiveVatable, effectiveWht, form.category]);

    function handleCustomerTypeChange(next: CustomerType) {
        setForm((f) => ({
            ...f,
            customerType: next,
            vatable: next === 'non-taxable' ? false : true,
            whtApplicable: next === 'non-taxable' ? false : true,
        }));
    }

    function handleAmountChange(raw: string) {
        setForm((f) => ({ ...f, amountFormatted: formatAmountInput(raw) }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.customerName || !form.description || !amountNumber || amountNumber <= 0) return;
        const calc = calculateTransactionTax({
            amount: amountNumber,
            customerType: form.customerType,
            vatable: effectiveVatable,
            whtApplicable: effectiveWht,
            category: form.category,
        });
        addTransaction({
            customerName: form.customerName.trim(),
            customerEmail: form.customerEmail.trim() || undefined,
            customerPhone: form.customerPhone.trim() || undefined,
            customerType: form.customerType,
            description: form.description.trim(),
            amount: amountNumber,
            vatable: effectiveVatable,
            whtApplicable: effectiveWht,
            vatAmount: calc.vatAmount,
            whtAmount: calc.whtAmount,
            netAmount: calc.netAmount,
            category: form.category,
        });
        setForm({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerType: 'individual',
            description: '',
            amountFormatted: '',
            category: 'Sales',
            vatable: true,
            whtApplicable: true,
        });
        setShowForm(false);
    }

    return (
        <>
            <PageHeader
                title="Transactions"
                description="Record sales and service income. Each transaction auto-generates a digital receipt and tax breakdown."
                actions={
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {showForm ? 'Close Form' : 'New Transaction'}
                    </button>
                }
            />

            {showForm && (
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-6">
                    <div className="xl:col-span-3 bg-white rounded-lg border border-slate-200 p-6">
                        <h2 className="font-semibold text-slate-800 mb-4">New Transaction</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Customer Name *</span>
                                <input
                                    required
                                    type="text"
                                    value={form.customerName}
                                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Chidinma Okafor"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Customer Type *</span>
                                <select
                                    value={form.customerType}
                                    onChange={(e) => handleCustomerTypeChange(e.target.value as CustomerType)}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="non-taxable">NO VAT &amp; WHT</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Email</span>
                                <input
                                    type="email"
                                    value={form.customerEmail}
                                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="customer@example.com"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Phone</span>
                                <input
                                    type="tel"
                                    value={form.customerPhone}
                                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+234 800 000 0000"
                                />
                            </label>
                            <label className="block md:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Description *</span>
                                <input
                                    required
                                    type="text"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Consultancy for April 2026"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Amount (₦) *</span>
                                <div className="mt-1 relative">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none text-sm">
                                        ₦
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        inputMode="decimal"
                                        value={form.amountFormatted}
                                        onChange={(e) => handleAmountChange(e.target.value)}
                                        className="w-full border border-slate-300 rounded-md pl-7 pr-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1,000,000"
                                        aria-describedby="amount-hint"
                                    />
                                </div>
                                <span id="amount-hint" className="text-xs text-slate-500 mt-1 block">
                                    Commas added automatically as you type.
                                </span>
                            </label>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Category</span>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option>Sales</option>
                                    <option>Services</option>
                                    <option>Consulting</option>
                                    <option>Rent</option>
                                    <option>Royalties</option>
                                    <option>Construction</option>
                                    <option>Dividends</option>
                                    <option>Directors Fees</option>
                                    <option>Other</option>
                                </select>
                            </label>

                            <fieldset
                                className={`md:col-span-2 border rounded-lg p-4 ${
                                    isNonTaxable ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'
                                }`}
                            >
                                <legend className="px-2 text-sm font-semibold text-slate-700">
                                    Tax Applicability
                                </legend>
                                {isNonTaxable && (
                                    <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2 mb-3">
                                        This customer is marked <strong>NO VAT &amp; WHT</strong>. VAT and WHT are
                                        automatically excluded — typical for basic food items, educational materials,
                                        medical supplies, and other exempt supplies.
                                    </p>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label
                                        className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer transition ${
                                            effectiveVatable
                                                ? 'border-orange-300 bg-orange-50'
                                                : 'border-slate-200 bg-slate-50'
                                        } ${isNonTaxable || !hasVatNumber ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={effectiveVatable}
                                            disabled={isNonTaxable || !hasVatNumber}
                                            onChange={(e) => setForm({ ...form, vatable: e.target.checked })}
                                            className="mt-0.5 h-4 w-4 accent-orange-600"
                                        />
                                        <span className="text-sm">
                                            <span className="font-semibold text-slate-800 block">
                                                VATABLE — Apply 7.5% VAT
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {!hasVatNumber 
                                                    ? 'No VAT Registration Number found. Please update your profile to allow VAT deduction.'
                                                    : 'Uncheck for VAT-exempt items (e.g. basic foods, books, medical items).'}
                                            </span>
                                        </span>
                                    </label>
                                    <label
                                        className={`flex items-start gap-3 border rounded-md p-3 cursor-pointer transition ${
                                            effectiveWht
                                                ? 'border-rose-300 bg-rose-50'
                                                : 'border-slate-200 bg-slate-50'
                                        } ${isNonTaxable ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={effectiveWht}
                                            disabled={isNonTaxable}
                                            onChange={(e) => setForm({ ...form, whtApplicable: e.target.checked })}
                                            className="mt-0.5 h-4 w-4 accent-rose-600"
                                        />
                                        <span className="text-sm">
                                            <span className="font-semibold text-slate-800 block">
                                                Deduct WHT ({form.customerType === 'corporate' ? '10%' : '5%'})
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                Uncheck when WHT does not apply to this supply.
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </fieldset>

                            {amountNumber > 0 && (
                                <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-blue-900 mb-2">Tax Breakdown</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs text-slate-500">Subtotal</p>
                                            <p className="font-semibold text-slate-900">
                                                {formatNaira(amountNumber)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">VAT (7.5%)</p>
                                            <p
                                                className={`font-semibold ${
                                                    effectiveVatable ? 'text-orange-700' : 'text-slate-400'
                                                }`}
                                            >
                                                {effectiveVatable
                                                    ? `+ ${formatNaira(preview.vatAmount)}`
                                                    : 'Not applied'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                WHT ({form.customerType === 'corporate' ? '10%' : '5%'})
                                            </p>
                                            <p
                                                className={`font-semibold ${
                                                    effectiveWht ? 'text-rose-700' : 'text-slate-400'
                                                }`}
                                            >
                                                {effectiveWht
                                                    ? `− ${formatNaira(preview.whtAmount)}`
                                                    : 'Not deducted'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Net to Receive</p>
                                            <p className="font-bold text-emerald-700">
                                                {formatNaira(preview.netAmount)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="md:col-span-2 flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
                                >
                                    Save &amp; Generate Receipt
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="xl:col-span-2">
                        <div className="sticky top-4">
                            <ReceiptPreview
                                profile={state.profile}
                                data={{
                                    customerName: form.customerName || 'Customer name',
                                    customerEmail: form.customerEmail || undefined,
                                    customerPhone: form.customerPhone || undefined,
                                    customerType: form.customerType,
                                    description: form.description || 'Description of goods or services',
                                    category: form.category,
                                    amount: amountNumber,
                                    vatable: effectiveVatable,
                                    whtApplicable: effectiveWht,
                                    vatAmount: preview.vatAmount,
                                    whtAmount: preview.whtAmount,
                                    netAmount: preview.netAmount,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                {!hydrated ? (
                    <div className="p-8 text-slate-500">Loading…</div>
                ) : state.transactions.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            title="No transactions yet"
                            description="Record a sale to generate your first digital receipt with automatic VAT and WHT calculation."
                            action={
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                                >
                                    <Plus className="h-4 w-4" /> New Transaction
                                </button>
                            }
                        />
                    </div>
                ) : (
                    <>
                        {/* Desktop / tablet table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-5 py-3">Date</th>
                                        <th className="text-left px-5 py-3">Customer</th>
                                        <th className="text-left px-5 py-3">Description</th>
                                        <th className="text-right px-5 py-3">Amount</th>
                                        <th className="text-right px-5 py-3">VAT</th>
                                        <th className="text-right px-5 py-3">WHT</th>
                                        <th className="text-right px-5 py-3">Net</th>
                                        <th className="text-right px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.transactions.map((t) => {
                                        const receipt = state.receipts.find((r) => r.transactionId === t.id);
                                        return (
                                            <tr key={t.id} className="border-t border-slate-100">
                                                <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                                                    {new Date(t.date).toLocaleDateString('en-NG')}
                                                </td>
                                                <td className="px-5 py-3 font-medium text-slate-800">
                                                    <div className="flex items-center gap-2">
                                                        <span>{t.customerName}</span>
                                                        <CustomerTypeBadge type={t.customerType} />
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-slate-600 max-w-xs truncate">{t.description}</td>
                                                <td className="px-5 py-3 text-right text-slate-700 whitespace-nowrap">
                                                    {formatNaira(t.amount)}
                                                </td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    {t.vatable ? (
                                                        <span className="text-orange-700">{formatNaira(t.vatAmount)}</span>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">Exempt</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    {t.whtApplicable ? (
                                                        <span className="text-rose-700">{formatNaira(t.whtAmount)}</span>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">—</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">
                                                    {formatNaira(t.netAmount)}
                                                </td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    {receipt && (
                                                        <Link
                                                            href={`/smarttax/demo/receipts?id=${receipt.id}`}
                                                            className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-semibold mr-3"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" /> Receipt
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => deleteTransaction(t.id)}
                                                        className="inline-flex items-center gap-1 text-rose-600 hover:underline text-xs font-semibold"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile stacked cards */}
                        <ul className="md:hidden divide-y divide-slate-100">
                            {state.transactions.map((t) => {
                                const receipt = state.receipts.find((r) => r.transactionId === t.id);
                                return (
                                    <li key={t.id} className="p-4">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-800 truncate">
                                                    {t.customerName}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {new Date(t.date).toLocaleDateString('en-NG')}
                                                </p>
                                            </div>
                                            <CustomerTypeBadge type={t.customerType} />
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3">{t.description}</p>
                                        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                                            <dt className="text-slate-500">Amount</dt>
                                            <dd className="text-right text-slate-800 font-medium">
                                                {formatNaira(t.amount)}
                                            </dd>
                                            <dt className="text-slate-500">VAT</dt>
                                            <dd className="text-right">
                                                {t.vatable ? (
                                                    <span className="text-orange-700 font-medium">
                                                        {formatNaira(t.vatAmount)}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">Exempt</span>
                                                )}
                                            </dd>
                                            <dt className="text-slate-500">WHT</dt>
                                            <dd className="text-right">
                                                {t.whtApplicable ? (
                                                    <span className="text-rose-700 font-medium">
                                                        {formatNaira(t.whtAmount)}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">—</span>
                                                )}
                                            </dd>
                                            <dt className="text-slate-500 font-semibold">Net</dt>
                                            <dd className="text-right text-slate-900 font-bold">
                                                {formatNaira(t.netAmount)}
                                            </dd>
                                        </dl>
                                        <div className="flex gap-3 pt-3 mt-3 border-t border-slate-100">
                                            {receipt && (
                                                <Link
                                                    href={`/smarttax/demo/receipts?id=${receipt.id}`}
                                                    className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold"
                                                >
                                                    <Eye className="h-3.5 w-3.5" /> View receipt
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="inline-flex items-center gap-1 text-rose-600 text-xs font-semibold ml-auto"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" /> Delete
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}
