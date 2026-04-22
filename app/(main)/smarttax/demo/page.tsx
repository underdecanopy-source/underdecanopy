'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, FileText, Plus, Receipt, Sparkles } from 'lucide-react';
import { EmptyState, PageHeader, StatCard } from './_components/ui';
import { filterTransactionsByPeriod, summarizeTransactions, type ReportPeriod } from './_lib/financials';
import { useSmartTaxStore } from './_lib/store';
import { formatNaira } from './_lib/taxCalculator';

export default function DashboardPage() {
    const { state, hydrated, loadSampleData } = useSmartTaxStore();
    const [period, setPeriod] = useState<ReportPeriod>('yearly');
    const now = new Date();

    const stats = useMemo(() => {
        const scopedTransactions = filterTransactionsByPeriod(
            state.transactions,
            period,
            now.getFullYear(),
            now.getMonth()
        );
        return summarizeTransactions(scopedTransactions);
    }, [now, period, state.transactions]);

    const recent = state.transactions.slice(0, 5);
    const isEmpty = hydrated && state.transactions.length === 0;

    return (
        <>
            <PageHeader
                title={`Welcome, ${state.profile.businessName || state.profile.name}`}
                description="CAC-oriented financial metrics derived from the same transaction logic used by receipts, reports, and tax returns."
                actions={
                    <>
                        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
                            <button
                                onClick={() => setPeriod('monthly')}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-md ${period === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setPeriod('yearly')}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-md ${period === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                            >
                                Yearly
                            </button>
                        </div>
                        {isEmpty && (
                            <button
                                onClick={loadSampleData}
                                className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-600 transition"
                            >
                                <Sparkles className="h-4 w-4" /> Load Sample Data
                            </button>
                        )}
                        <Link
                            href="/smarttax/demo/transactions"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            <Plus className="h-4 w-4" /> New Transaction
                        </Link>
                    </>
                }
            />

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading...</div>
            ) : (
                <>
                    {isEmpty && (
                        <div className="mb-6 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1">
                                <p className="font-semibold text-amber-900 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" /> Populate the accounting demo
                                </p>
                                <p className="text-sm text-amber-800 mt-1">
                                    Load sample revenue and expense transactions to see profit, tax, and receipt flows update instantly.
                                </p>
                            </div>
                            <button
                                onClick={loadSampleData}
                                className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-600 transition flex-shrink-0"
                            >
                                <Sparkles className="h-4 w-4" /> Populate Mock Data
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <StatCard label={`${period === 'yearly' ? 'Annual' : 'Monthly'} Revenue`} value={formatNaira(stats.revenue)} helper={`${stats.revenueCount} revenue transaction(s)`} tone="blue" />
                        <StatCard label={`${period === 'yearly' ? 'Annual' : 'Monthly'} Expenses`} value={formatNaira(stats.expenses)} helper={`${stats.expenseCount} expense transaction(s)`} tone="orange" />
                        <StatCard label="Profit / Loss Before Tax" value={formatNaira(stats.profitBeforeTax)} helper="Revenue minus expenses" tone={stats.profitBeforeTax >= 0 ? 'green' : 'red'} />
                        <StatCard label="Taxation" value={formatNaira(stats.taxation)} helper="Demo tax rule: 30% of positive PBT" tone="red" />
                        <StatCard label="Profit / Loss After Tax" value={formatNaira(stats.profitAfterTax)} helper="PBT minus taxation" tone={stats.profitAfterTax >= 0 ? 'green' : 'red'} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        <Link
                            href="/smarttax/demo/transactions"
                            className="bg-white rounded-lg border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center justify-between">
                                <Receipt className="h-8 w-8 text-blue-600" />
                                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 mt-3">Capture Financial Event</h3>
                            <p className="text-sm text-slate-500 mt-1">Create revenue or expense entries with debit or credit classification.</p>
                        </Link>
                        <Link
                            href="/smarttax/demo/tax-returns"
                            className="bg-white rounded-lg border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center justify-between">
                                <FileText className="h-8 w-8 text-emerald-600" />
                                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 mt-3">Prepare Tax Returns</h3>
                            <p className="text-sm text-slate-500 mt-1">Use revenue-only VAT/WHT and profit-based CIT calculations from the same store.</p>
                        </Link>
                        <Link
                            href="/smarttax/demo/reports"
                            className="bg-white rounded-lg border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center justify-between">
                                <FileText className="h-8 w-8 text-orange-600" />
                                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 mt-3">View Reports</h3>
                            <p className="text-sm text-slate-500 mt-1">See filtered revenue, expenses, profit, VAT, and WHT metrics in one place.</p>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
                            <Link href="/smarttax/demo/transactions" className="text-sm text-blue-600 hover:underline font-medium">
                                View all
                            </Link>
                        </div>
                        {recent.length === 0 ? (
                            <div className="p-8">
                                <EmptyState
                                    title="No transactions yet"
                                    description="Record your first revenue or expense entry to start generating receipts and financial statements."
                                    action={
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <button
                                                onClick={loadSampleData}
                                                className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-600"
                                            >
                                                <Sparkles className="h-4 w-4" /> Load Sample Data
                                            </button>
                                            <Link
                                                href="/smarttax/demo/transactions"
                                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                                            >
                                                <Plus className="h-4 w-4" /> Create Transaction
                                            </Link>
                                        </div>
                                    }
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                                        <tr>
                                            <th className="text-left px-5 py-3">Date</th>
                                            <th className="text-left px-5 py-3">Type</th>
                                            <th className="text-left px-5 py-3">Counterparty</th>
                                            <th className="text-left px-5 py-3">Description</th>
                                            <th className="text-right px-5 py-3">Amount</th>
                                            <th className="text-right px-5 py-3">Net</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recent.map((transaction) => (
                                            <tr key={transaction.id} className="border-t border-slate-100">
                                                <td className="px-5 py-3 text-slate-600">{new Date(transaction.date).toLocaleDateString('en-NG')}</td>
                                                <td className="px-5 py-3">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${transaction.type === 'revenue' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {transaction.type === 'revenue' ? 'Revenue / Credit' : 'Expense / Debit'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 font-medium text-slate-800">{transaction.customerName}</td>
                                                <td className="px-5 py-3 text-slate-600">{transaction.description}</td>
                                                <td className="px-5 py-3 text-right text-slate-700">{formatNaira(transaction.amount)}</td>
                                                <td className="px-5 py-3 text-right font-semibold text-slate-900">{formatNaira(transaction.netAmount)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
