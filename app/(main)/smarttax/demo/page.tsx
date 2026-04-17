'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { PageHeader, StatCard, EmptyState } from './_components/ui';
import { useSmartTaxStore } from './_lib/store';
import { formatNaira, VAT_THRESHOLD } from './_lib/taxCalculator';
import { Plus, Receipt, FileText, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
    const { state, hydrated } = useSmartTaxStore();

    const stats = useMemo(() => {
        const now = new Date();
        const thisMonth = state.transactions.filter((t) => {
            const d = new Date(t.date);
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        });
        const totalRevenueMonth = thisMonth.reduce((sum, t) => sum + t.amount, 0);
        const vatCollectedMonth = thisMonth.reduce((sum, t) => sum + t.vatAmount, 0);
        const whtDeductedMonth = thisMonth.reduce((sum, t) => sum + t.whtAmount, 0);
        const annualRevenue = state.transactions
            .filter((t) => new Date(t.date).getFullYear() === now.getFullYear())
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            totalRevenueMonth,
            vatCollectedMonth,
            whtDeductedMonth,
            annualRevenue,
            receiptsIssued: state.receipts.length,
            upcomingReminders: state.reminders.filter((r) => !r.isCompleted).length,
        };
    }, [state]);

    const recent = state.transactions.slice(0, 5);

    return (
        <>
            <PageHeader
                title={`Welcome, ${state.profile.businessName || state.profile.name}`}
                description="Here is a snapshot of your receipts, tax position, and upcoming obligations under the Nigerian Revenue Service framework."
                actions={
                    <Link
                        href="/smarttax/demo/transactions"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        <Plus className="h-4 w-4" /> New Transaction
                    </Link>
                }
            />

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading…</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            label="Revenue (This Month)"
                            value={formatNaira(stats.totalRevenueMonth)}
                            helper={`${stats.receiptsIssued} receipts issued in total`}
                            tone="blue"
                        />
                        <StatCard
                            label="VAT Collected (Month)"
                            value={formatNaira(stats.vatCollectedMonth)}
                            helper="Due by 21st of next month"
                            tone="orange"
                        />
                        <StatCard
                            label="WHT Deducted (Month)"
                            value={formatNaira(stats.whtDeductedMonth)}
                            helper="Remit to FIRS monthly"
                            tone="green"
                        />
                        <StatCard
                            label="Annual Turnover"
                            value={formatNaira(stats.annualRevenue)}
                            helper={
                                stats.annualRevenue >= VAT_THRESHOLD
                                    ? 'Above ₦25M VAT threshold — registration required'
                                    : 'Below ₦25M VAT threshold'
                            }
                            tone={stats.annualRevenue >= VAT_THRESHOLD ? 'red' : 'default'}
                        />
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
                            <h3 className="font-semibold text-slate-800 mt-3">Issue a Receipt</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Record a sale and auto-generate a FIRS-compliant digital receipt.
                            </p>
                        </Link>
                        <Link
                            href="/smarttax/demo/tax-returns"
                            className="bg-white rounded-lg border border-slate-200 p-5 hover:border-blue-500 hover:shadow-md transition group"
                        >
                            <div className="flex items-center justify-between">
                                <FileText className="h-8 w-8 text-emerald-600" />
                                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 mt-3">Prepare a Tax Return</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Generate VAT, PIT, or WHT returns from your recorded transactions.
                            </p>
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
                            <p className="text-sm text-slate-500 mt-1">
                                See revenue trends and consolidated tax obligations at a glance.
                            </p>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
                            <Link
                                href="/smarttax/demo/transactions"
                                className="text-sm text-blue-600 hover:underline font-medium"
                            >
                                View all
                            </Link>
                        </div>
                        {recent.length === 0 ? (
                            <div className="p-8">
                                <EmptyState
                                    title="No transactions yet"
                                    description="Record your first sale to issue a digital receipt and start tracking tax."
                                    action={
                                        <Link
                                            href="/smarttax/demo/transactions"
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                                        >
                                            <Plus className="h-4 w-4" /> Create Transaction
                                        </Link>
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
                                            <th className="text-right px-5 py-3">Net</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recent.map((t) => (
                                            <tr key={t.id} className="border-t border-slate-100">
                                                <td className="px-5 py-3 text-slate-600">
                                                    {new Date(t.date).toLocaleDateString('en-NG')}
                                                </td>
                                                <td className="px-5 py-3 font-medium text-slate-800">
                                                    {t.customerName}
                                                </td>
                                                <td className="px-5 py-3 text-slate-600">{t.description}</td>
                                                <td className="px-5 py-3 text-right text-slate-700">
                                                    {formatNaira(t.amount)}
                                                </td>
                                                <td className="px-5 py-3 text-right font-semibold text-slate-900">
                                                    {formatNaira(t.netAmount)}
                                                </td>
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
