'use client';

import { useMemo, useState } from 'react';
import { EmptyState, PageHeader, StatCard } from '../_components/ui';
import { filterTransactionsByPeriod, getTransactionLabel, summarizeTransactions, type ReportPeriod } from '../_lib/financials';
import { useSmartTaxStore } from '../_lib/store';
import { formatNaira } from '../_lib/taxCalculator';

export default function ReportsPage() {
    const { state, hydrated } = useSmartTaxStore();
    const now = new Date();
    const [period, setPeriod] = useState<ReportPeriod>('yearly');
    const [year, setYear] = useState(String(now.getFullYear()));
    const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, '0'));

    const report = useMemo(() => {
        if (state.transactions.length === 0) return null;
        const scopedTransactions = filterTransactionsByPeriod(
            state.transactions,
            period,
            Number(year),
            Number(month) - 1
        );
        const summary = summarizeTransactions(scopedTransactions, state.settings.profitTaxRatePercent);

        const monthly = Array.from({ length: 12 }, (_, index) => ({
            monthIndex: index,
            label: new Date(Number(year), index).toLocaleString('en-NG', { month: 'short' }),
            revenue: 0,
            expenses: 0,
            vat: 0,
            wht: 0,
        }));

        state.transactions
            .filter((transaction) => new Date(transaction.date).getFullYear() === Number(year))
            .forEach((transaction) => {
                const bucket = monthly[new Date(transaction.date).getMonth()];
                if (transaction.type === 'revenue') {
                    bucket.revenue += transaction.amount;
                    bucket.vat += transaction.vatAmount;
                } else {
                    bucket.expenses += transaction.amount;
                    bucket.wht += transaction.whtAmount;
                }
            });

        const byCategory = new Map<string, { total: number; type: 'expense' | 'revenue' }>();
        scopedTransactions.forEach((transaction) => {
            const key = getTransactionLabel(transaction);
            const current = byCategory.get(key);
            byCategory.set(key, {
                total: (current?.total || 0) + transaction.amount,
                type: transaction.type,
            });
        });

        return { summary, monthly, byCategory, scopedTransactions };
    }, [month, period, state.settings.profitTaxRatePercent, state.transactions, year]);

    return (
        <>
            <PageHeader
                title="Reports"
                description="Revenue, expenses, configured profit-tax calculations, and tax-credit metrics driven by one transaction model."
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
                        <input
                            type="number"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                            className="w-28 border border-slate-300 rounded-md px-3 py-2 text-sm"
                        />
                        {period === 'monthly' && (
                            <select
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
                                className="border border-slate-300 rounded-md px-3 py-2 text-sm bg-white"
                            >
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index} value={String(index + 1).padStart(2, '0')}>
                                        {new Date(2024, index).toLocaleString('en-NG', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        )}
                    </>
                }
            />

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading...</div>
            ) : !report ? (
                <EmptyState
                    title="No data yet"
                    description="Record transactions to see revenue, expenses, and CAC-ready profit metrics."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <StatCard label="Revenue" value={formatNaira(report.summary.revenue)} tone="blue" />
                        <StatCard label="Expenses" value={formatNaira(report.summary.expenses)} tone="orange" />
                        <StatCard label="Profit / Loss Before Tax" value={formatNaira(report.summary.profitBeforeTax)} tone={report.summary.profitBeforeTax >= 0 ? 'green' : 'red'} />
                        <StatCard
                            label="Taxation"
                            value={formatNaira(report.summary.taxation)}
                            tone="red"
                        />
                        <StatCard label="Profit / Loss After Tax" value={formatNaira(report.summary.profitAfterTax)} tone={report.summary.profitAfterTax >= 0 ? 'green' : 'red'} />
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
                        <h2 className="font-semibold text-slate-800 mb-4">Monthly Revenue vs Expenses - {year}</h2>
                        <div className="space-y-3">
                            {report.monthly.map((item) => {
                                const max = Math.max(1, item.revenue, item.expenses);
                                return (
                                    <div key={item.monthIndex} className="grid grid-cols-[48px,1fr,96px,96px] items-center gap-3">
                                        <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                                        <div className="space-y-1">
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${(item.revenue / max) * 100}%` }} />
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500" style={{ width: `${(item.expenses / max) * 100}%` }} />
                                            </div>
                                        </div>
                                        <span className="text-xs text-right text-emerald-700 font-semibold">{formatNaira(item.revenue)}</span>
                                        <span className="text-xs text-right text-amber-700 font-semibold">{formatNaira(item.expenses)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h2 className="font-semibold text-slate-800 mb-4">Transaction Mix</h2>
                            {report.byCategory.size === 0 ? (
                                <p className="text-sm text-slate-500">No categorized data yet.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {Array.from(report.byCategory.entries())
                                        .sort((a, b) => b[1].total - a[1].total)
                                        .map(([label, bucket]) => (
                                            <li key={label} className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700">{label}</p>
                                                    <p className="text-xs text-slate-500 uppercase">{bucket.type}</p>
                                                </div>
                                                <p className="text-sm font-semibold text-slate-900">{formatNaira(bucket.total)}</p>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h2 className="font-semibold text-slate-800 mb-4">Tax Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">VAT Tax Credits</span>
                                    <span className="font-semibold text-orange-700">{formatNaira(report.summary.vatCredits)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">WHT Tax Credits</span>
                                    <span className="font-semibold text-rose-700">{formatNaira(report.summary.whtCredits)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Profit Tax Rule</span>
                                    <span className="font-semibold text-slate-900">{state.settings.profitTaxRatePercent}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Revenue Transactions</span>
                                    <span className="font-semibold text-slate-900">{report.summary.revenueCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Expense Transactions</span>
                                    <span className="font-semibold text-slate-900">{report.summary.expenseCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
