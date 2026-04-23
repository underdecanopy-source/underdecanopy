'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Eye, Plus, Trash2, X } from 'lucide-react';
import { PageHeader, EmptyState } from '../_components/ui';
import { ReceiptPreview } from '../_components/ReceiptPreview';
import { getDebitCreditLabel, getTransactionLabel } from '../_lib/financials';
import { useSmartTaxStore } from '../_lib/store';
import { calculateTransactionTax, formatAmountInput, formatNaira, parseAmountInput } from '../_lib/taxCalculator';
import type { CustomerType, Transaction } from '../_lib/types';

const REVENUE_CATEGORIES = ['Sales', 'Service Income'];
const EXPENSE_CATEGORIES = ['Rent', 'Utilities', 'Purchases', 'Supplies', 'Transport', 'Other'];

function TransactionTypeBadge({ transaction }: { transaction: Transaction }) {
    const label = `${transaction.type === 'revenue' ? 'Revenue' : 'Expense'} / ${
        transaction.debitCreditFlag === 'credit' ? 'Credit' : 'Debit'
    }`;
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                transaction.type === 'revenue' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}
        >
            {label}
        </span>
    );
}

export default function TransactionsPage() {
    const { state, hydrated, addTransaction, deleteTransaction } = useSmartTaxStore();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        type: 'revenue' as Transaction['type'],
        subCategory: 'Sales' as string,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerType: 'individual' as CustomerType,
        description: '',
        amountFormatted: '',
        whtAmountFormatted: '',
        category: 'Sales',
        vatable: true,
        whtApplicable: false,
    });

    const hasVatNumber = !!state.profile.vatNumber;
    const isRevenue = form.type === 'revenue';
    const isNonTaxable = form.customerType === 'non-taxable';
    const effectiveVatable = isRevenue && hasVatNumber && !isNonTaxable ? form.vatable : false;
    const effectiveWht = !isRevenue && !isNonTaxable ? form.whtApplicable : false;
    const amountNumber = parseAmountInput(form.amountFormatted);
    const whtAmountNumber = parseAmountInput(form.whtAmountFormatted);
    const hasInvalidWht = effectiveWht && whtAmountNumber > amountNumber;
    const categories = isRevenue ? REVENUE_CATEGORIES : EXPENSE_CATEGORIES;

    const preview = useMemo(() => {
        if (!amountNumber || amountNumber <= 0) {
            return { vatAmount: 0, whtAmount: 0, netAmount: 0, totalTax: 0 };
        }
        return calculateTransactionTax({
            amount: amountNumber,
            customerType: form.customerType,
            vatable: effectiveVatable,
            whtApplicable: effectiveWht,
            whtAmount: whtAmountNumber,
            category: form.category,
            transactionType: form.type,
        });
    }, [amountNumber, form.category, form.customerType, form.type, effectiveVatable, effectiveWht, whtAmountNumber]);

    function handleAmountChange(raw: string) {
        setForm((current) => ({ ...current, amountFormatted: formatAmountInput(raw) }));
    }

    function handleTransactionTypeChange(type: Transaction['type']) {
        setForm((current) => ({
            ...current,
            type,
            subCategory: type === 'revenue' ? 'Sales' : '',
            category: type === 'revenue' ? 'Sales' : 'Rent',
            vatable: type === 'revenue',
            whtApplicable: false,
            whtAmountFormatted: '',
        }));
    }

    function handleCustomerTypeChange(next: CustomerType) {
        setForm((current) => ({
            ...current,
            customerType: next,
            vatable: current.type === 'revenue' && next !== 'non-taxable' ? current.vatable : false,
            whtApplicable: current.type === 'expense' && next !== 'non-taxable' ? current.whtApplicable : false,
            whtAmountFormatted: next === 'non-taxable' ? '' : current.whtAmountFormatted,
        }));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!form.customerName || !form.description || amountNumber <= 0 || hasInvalidWht) return;

        const calc = calculateTransactionTax({
            amount: amountNumber,
            customerType: form.customerType,
            vatable: effectiveVatable,
            whtApplicable: effectiveWht,
            whtAmount: whtAmountNumber,
            category: form.category,
            transactionType: form.type,
        });

        addTransaction({
            type: form.type,
            subCategory: form.type === 'revenue' ? form.subCategory : undefined,
            debitCreditFlag: getDebitCreditLabel(form.type),
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
            taxYear: new Date().getFullYear(),
            creditNoteGenerated: form.type === 'expense' && calc.whtAmount > 0,
        });

        setForm({
            type: 'revenue',
            subCategory: 'Sales',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            customerType: 'individual',
            description: '',
            amountFormatted: '',
            whtAmountFormatted: '',
            category: 'Sales',
            vatable: true,
            whtApplicable: false,
        });
        setShowForm(false);
    }

    return (
        <>
            <PageHeader
                title="Transactions"
                description="Record revenue and expenses with explicit debit or credit classification, manual debit-side WHT deduction, and consistent tax treatment."
                actions={
                    <button
                        onClick={() => setShowForm((current) => !current)}
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
                            <label className="block md:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Transaction Type *</span>
                                <div className="flex gap-4 mt-1">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="revenue"
                                            checked={form.type === 'revenue'}
                                            onChange={() => handleTransactionTypeChange('revenue')}
                                            className="mr-2"
                                        />
                                        Revenue (Credit)
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="expense"
                                            checked={form.type === 'expense'}
                                            onChange={() => handleTransactionTypeChange('expense')}
                                            className="mr-2"
                                        />
                                        Expense (Debit)
                                    </label>
                                </div>
                            </label>

                            {isRevenue && (
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Revenue Subcategory *</span>
                                    <select
                                        value={form.subCategory}
                                        onChange={(event) => setForm((current) => ({ ...current, subCategory: event.target.value }))}
                                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="Sales">Sales</option>
                                        <option value="Service Income">Service Income</option>
                                    </select>
                                </label>
                            )}

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">
                                    {isRevenue ? 'Customer / Payer *' : 'Vendor / Payee *'}
                                </span>
                                <input
                                    required
                                    type="text"
                                    value={form.customerName}
                                    onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={isRevenue ? 'e.g. Chidinma Okafor' : 'e.g. Kano Logistics PLC'}
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Counterparty Type *</span>
                                <select
                                    value={form.customerType}
                                    onChange={(event) => handleCustomerTypeChange(event.target.value as CustomerType)}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="non-taxable">NO VAT and WHT</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Email</span>
                                <input
                                    type="email"
                                    value={form.customerEmail}
                                    onChange={(event) => setForm((current) => ({ ...current, customerEmail: event.target.value }))}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="customer@example.com"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Phone</span>
                                <input
                                    type="tel"
                                    value={form.customerPhone}
                                    onChange={(event) => setForm((current) => ({ ...current, customerPhone: event.target.value }))}
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
                                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={isRevenue ? 'e.g. Consultancy for April 2026' : 'e.g. Office rent for April 2026'}
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">
                                    {isRevenue ? 'Gross Amount (NGN) *' : 'Gross Amount (NGN) *'}
                                </span>
                                <input
                                    required
                                    type="text"
                                    inputMode="decimal"
                                    value={form.amountFormatted}
                                    onChange={(event) => handleAmountChange(event.target.value)}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="1,000,000"
                                />
                            </label>

                            {!isRevenue && (
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">WHT Deducted (NGN)</span>
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={form.whtAmountFormatted}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                whtAmountFormatted: formatAmountInput(event.target.value),
                                                whtApplicable: parseAmountInput(event.target.value) > 0,
                                            }))
                                        }
                                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        Enter the amount withheld by the payer. Net cash outflow is calculated automatically.
                                    </p>
                                    {hasInvalidWht && (
                                        <p className="mt-1 text-xs font-medium text-rose-700">
                                            WHT deducted cannot be greater than the gross amount.
                                        </p>
                                    )}
                                </label>
                            )}

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">Category</span>
                                <select
                                    value={form.category}
                                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                                    className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <fieldset className="md:col-span-2 border border-slate-200 rounded-lg p-4">
                                <legend className="px-2 text-sm font-semibold text-slate-700">Tax Applicability</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label
                                        className={`flex items-start gap-3 border rounded-md p-3 transition ${
                                            effectiveVatable ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-slate-50'
                                        } ${!isRevenue || isNonTaxable || !hasVatNumber ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={effectiveVatable}
                                            disabled={!isRevenue || isNonTaxable || !hasVatNumber}
                                            onChange={(event) => setForm((current) => ({ ...current, vatable: event.target.checked }))}
                                            className="mt-0.5 h-4 w-4 accent-orange-600"
                                        />
                                        <span className="text-sm">
                                            <span className="font-semibold text-slate-800 block">Apply VAT (7.5%)</span>
                                            <span className="text-xs text-slate-500">
                                                {!isRevenue
                                                    ? 'VAT is only available on credit-side transactions in this demo.'
                                                    : !hasVatNumber
                                                    ? 'No VAT registration number found in profile settings.'
                                                    : 'Recorded as a VAT tax credit for the transaction.'}
                                            </span>
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-start gap-3 border rounded-md p-3 transition ${
                                            effectiveWht ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-slate-50'
                                        } ${isRevenue || isNonTaxable ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={effectiveWht}
                                            disabled={isRevenue || isNonTaxable}
                                            onChange={(event) =>
                                                setForm((current) => ({
                                                    ...current,
                                                    whtApplicable: event.target.checked,
                                                    whtAmountFormatted: event.target.checked ? current.whtAmountFormatted : '',
                                                }))
                                            }
                                            className="mt-0.5 h-4 w-4 accent-rose-600"
                                        />
                                        <span className="text-sm">
                                            <span className="font-semibold text-slate-800 block">Apply Debit-Side WHT</span>
                                            <span className="text-xs text-slate-500">
                                                {isRevenue
                                                    ? 'Only the payer can remove WHT on debit transactions and issue a credit note.'
                                                    : 'Use only when money is leaving your account and you are withholding at source.'}
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
                                            <p className="font-semibold text-slate-900">{formatNaira(amountNumber)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">VAT (7.5%)</p>
                                            <p className={effectiveVatable ? 'font-semibold text-orange-700' : 'font-semibold text-slate-400'}>
                                                {effectiveVatable ? `+ ${formatNaira(preview.vatAmount)}` : 'Not applied'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">WHT</p>
                                            <p className={effectiveWht ? 'font-semibold text-rose-700' : 'font-semibold text-slate-400'}>
                                                {effectiveWht ? `- ${formatNaira(preview.whtAmount)}` : 'Not deducted'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">{isRevenue ? 'Net to Credit' : 'Net Amount Going Out'}</p>
                                            <p className="font-bold text-emerald-700">{formatNaira(preview.netAmount)}</p>
                                        </div>
                                    </div>
                                    {!isRevenue && effectiveWht && (
                                        <p className="mt-3 text-xs text-slate-600">
                                            WHT is posted as a tax credit asset. Only the payer can remove it and issue the credit note.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="md:col-span-2 flex gap-3 pt-2">
                                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700">
                                    Save and Generate Receipt
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
                                    customerName: form.customerName || 'Counterparty name',
                                    customerEmail: form.customerEmail || undefined,
                                    customerPhone: form.customerPhone || undefined,
                                    customerType: form.customerType,
                                    description: form.description || 'Description of the financial event',
                                    category: form.category,
                                    amount: amountNumber,
                                    vatable: effectiveVatable,
                                    whtApplicable: effectiveWht,
                                    vatAmount: preview.vatAmount,
                                    whtAmount: preview.whtAmount,
                                    netAmount: preview.netAmount,
                                    transactionType: form.type,
                                    subCategory: form.subCategory,
                                    debitCreditFlag: getDebitCreditLabel(form.type),
                                    creditNoteGenerated: !isRevenue && preview.whtAmount > 0,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                {!hydrated ? (
                    <div className="p-8 text-slate-500">Loading...</div>
                ) : state.transactions.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            title="No transactions yet"
                            description="Record a revenue or expense transaction to populate receipts, reports, and compliance metrics."
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
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-5 py-3">Date</th>
                                        <th className="text-left px-5 py-3">Type</th>
                                        <th className="text-left px-5 py-3">Counterparty</th>
                                        <th className="text-left px-5 py-3">Description</th>
                                        <th className="text-right px-5 py-3">Amount</th>
                                        <th className="text-right px-5 py-3">VAT</th>
                                        <th className="text-right px-5 py-3">WHT</th>
                                        <th className="text-right px-5 py-3">Net</th>
                                        <th className="text-right px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.transactions.map((transaction) => {
                                        const receipt = state.receipts.find((item) => item.transactionId === transaction.id);
                                        return (
                                            <tr key={transaction.id} className="border-t border-slate-100">
                                                <td className="px-5 py-3 text-slate-600 whitespace-nowrap">
                                                    {new Date(transaction.date).toLocaleDateString('en-NG')}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="space-y-1">
                                                        <TransactionTypeBadge transaction={transaction} />
                                                        <p className="text-xs text-slate-500">{getTransactionLabel(transaction)}</p>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 font-medium text-slate-800">{transaction.customerName}</td>
                                                <td className="px-5 py-3 text-slate-600 max-w-xs truncate">{transaction.description}</td>
                                                <td className="px-5 py-3 text-right text-slate-700 whitespace-nowrap">{formatNaira(transaction.amount)}</td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    {transaction.vatable ? (
                                                        <span className="text-orange-700">{formatNaira(transaction.vatAmount)}</span>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">Exempt</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    {transaction.whtApplicable ? (
                                                        <span className="text-rose-700">{formatNaira(transaction.whtAmount)}</span>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">{formatNaira(transaction.netAmount)}</td>
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
                                                        onClick={() => deleteTransaction(transaction.id)}
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

                        <ul className="md:hidden divide-y divide-slate-100">
                            {state.transactions.map((transaction) => {
                                const receipt = state.receipts.find((item) => item.transactionId === transaction.id);
                                return (
                                    <li key={transaction.id} className="p-4">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-800 truncate">{transaction.customerName}</p>
                                                <p className="text-xs text-slate-500">{new Date(transaction.date).toLocaleDateString('en-NG')}</p>
                                            </div>
                                            <TransactionTypeBadge transaction={transaction} />
                                        </div>
                                        <p className="text-xs text-slate-500 mb-2">{getTransactionLabel(transaction)}</p>
                                        <p className="text-sm text-slate-600 mb-3">{transaction.description}</p>
                                        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                                            <dt className="text-slate-500">Amount</dt>
                                            <dd className="text-right text-slate-800 font-medium">{formatNaira(transaction.amount)}</dd>
                                            <dt className="text-slate-500">VAT</dt>
                                            <dd className="text-right">{transaction.vatable ? <span className="text-orange-700 font-medium">{formatNaira(transaction.vatAmount)}</span> : <span className="text-slate-400">Exempt</span>}</dd>
                                            <dt className="text-slate-500">WHT</dt>
                                            <dd className="text-right">{transaction.whtApplicable ? <span className="text-rose-700 font-medium">{formatNaira(transaction.whtAmount)}</span> : <span className="text-slate-400">-</span>}</dd>
                                            <dt className="text-slate-500 font-semibold">Net</dt>
                                            <dd className="text-right text-slate-900 font-bold">{formatNaira(transaction.netAmount)}</dd>
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
                                                onClick={() => deleteTransaction(transaction.id)}
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
