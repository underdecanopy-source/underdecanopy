'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PageHeader, EmptyState } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';
import { calculateTransactionTax, formatNaira } from '../_lib/taxCalculator';
import { Plus, Trash2, Eye, X } from 'lucide-react';

export default function TransactionsPage() {
    const { state, hydrated, addTransaction, deleteTransaction } = useSmartTaxStore();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerType: 'individual' as 'individual' | 'corporate',
        description: '',
        amount: '',
        category: 'Sales',
    });

    const preview = useMemo(() => {
        const amt = parseFloat(form.amount);
        if (!amt || amt <= 0) return null;
        return calculateTransactionTax(amt, form.customerType);
    }, [form.amount, form.customerType]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const amount = parseFloat(form.amount);
        if (!form.customerName || !form.description || !amount || amount <= 0) return;
        const calc = calculateTransactionTax(amount, form.customerType);
        addTransaction({
            customerName: form.customerName.trim(),
            customerEmail: form.customerEmail.trim() || undefined,
            customerPhone: form.customerPhone.trim() || undefined,
            customerType: form.customerType,
            description: form.description.trim(),
            amount,
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
            amount: '',
            category: 'Sales',
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
                <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
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
                                onChange={(e) => setForm({ ...form, customerType: e.target.value as 'individual' | 'corporate' })}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="individual">Individual (5% WHT)</option>
                                <option value="corporate">Corporate (10% WHT)</option>
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
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="100000"
                            />
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
                                <option>Interest</option>
                                <option>Other</option>
                            </select>
                        </label>

                        {preview && (
                            <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm font-semibold text-blue-900 mb-2">Tax Breakdown Preview</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-500">Subtotal</p>
                                        <p className="font-semibold text-slate-900">{formatNaira(parseFloat(form.amount))}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">VAT (7.5%)</p>
                                        <p className="font-semibold text-orange-700">+ {formatNaira(preview.vatAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            WHT ({form.customerType === 'corporate' ? '10%' : '5%'})
                                        </p>
                                        <p className="font-semibold text-rose-700">− {formatNaira(preview.whtAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Net to Receive</p>
                                        <p className="font-bold text-emerald-700">{formatNaira(preview.netAmount)}</p>
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
                    <div className="overflow-x-auto">
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
                                            <td className="px-5 py-3 font-medium text-slate-800">{t.customerName}</td>
                                            <td className="px-5 py-3 text-slate-600 max-w-xs truncate">{t.description}</td>
                                            <td className="px-5 py-3 text-right text-slate-700 whitespace-nowrap">
                                                {formatNaira(t.amount)}
                                            </td>
                                            <td className="px-5 py-3 text-right text-orange-700 whitespace-nowrap">
                                                {formatNaira(t.vatAmount)}
                                            </td>
                                            <td className="px-5 py-3 text-right text-rose-700 whitespace-nowrap">
                                                {formatNaira(t.whtAmount)}
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
                )}
            </div>
        </>
    );
}
