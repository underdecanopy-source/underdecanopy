'use client';

import { useMemo } from 'react';
import { PageHeader, StatCard, EmptyState } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';
import { formatNaira } from '../_lib/taxCalculator';

export default function ReportsPage() {
    const { state, hydrated } = useSmartTaxStore();

    const report = useMemo(() => {
        if (state.transactions.length === 0) return null;
        const year = new Date().getFullYear();
        const yearTxns = state.transactions.filter((t) => new Date(t.date).getFullYear() === year);

        const monthly = Array.from({ length: 12 }, (_, i) => ({
            monthIndex: i,
            label: new Date(year, i).toLocaleString('en-NG', { month: 'short' }),
            sales: 0,
            vat: 0,
            wht: 0,
            count: 0,
        }));

        for (const t of yearTxns) {
            const idx = new Date(t.date).getMonth();
            monthly[idx].sales += t.amount;
            monthly[idx].vat += t.vatAmount;
            monthly[idx].wht += t.whtAmount;
            monthly[idx].count += 1;
        }

        const totalSales = yearTxns.reduce((s, t) => s + t.amount, 0);
        const totalVat = yearTxns.reduce((s, t) => s + t.vatAmount, 0);
        const totalWht = yearTxns.reduce((s, t) => s + t.whtAmount, 0);
        const maxSales = Math.max(1, ...monthly.map((m) => m.sales));

        const byCategory = new Map<string, number>();
        for (const t of yearTxns) {
            const k = t.category || 'Other';
            byCategory.set(k, (byCategory.get(k) || 0) + t.amount);
        }

        return { year, monthly, totalSales, totalVat, totalWht, maxSales, byCategory };
    }, [state.transactions]);

    return (
        <>
            <PageHeader
                title="Reports"
                description="Financial insights across your income, tax obligations, and receipt activity."
            />

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading…</div>
            ) : !report ? (
                <EmptyState
                    title="No data yet"
                    description="Record transactions to see revenue trends and consolidated tax reports here."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <StatCard label={`Revenue ${report.year}`} value={formatNaira(report.totalSales)} tone="blue" />
                        <StatCard label="Total VAT" value={formatNaira(report.totalVat)} tone="orange" />
                        <StatCard label="Total WHT" value={formatNaira(report.totalWht)} tone="green" />
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
                        <h2 className="font-semibold text-slate-800 mb-4">Monthly Revenue — {report.year}</h2>
                        <div className="space-y-3">
                            {report.monthly.map((m) => (
                                <div key={m.monthIndex} className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-500 w-10">{m.label}</span>
                                    <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                                            style={{ width: `${(m.sales / report.maxSales) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-700 w-28 text-right font-semibold">
                                        {formatNaira(m.sales)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h2 className="font-semibold text-slate-800 mb-4">Revenue by Category</h2>
                            {report.byCategory.size === 0 ? (
                                <p className="text-sm text-slate-500">No categorized data yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {Array.from(report.byCategory.entries())
                                        .sort((a, b) => b[1] - a[1])
                                        .map(([cat, total]) => {
                                            const pct = (total / report.totalSales) * 100;
                                            return (
                                                <li key={cat}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-slate-700 font-medium">{cat}</span>
                                                        <span className="text-slate-600">
                                                            {formatNaira(total)} · {pct.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500"
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            )}
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h2 className="font-semibold text-slate-800 mb-4">Monthly Tax Obligations</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs uppercase text-slate-500">
                                            <th className="text-left py-2">Month</th>
                                            <th className="text-right py-2">VAT</th>
                                            <th className="text-right py-2">WHT</th>
                                            <th className="text-right py-2">Due By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.monthly.map((m) => (
                                            <tr key={m.monthIndex} className="border-t border-slate-100">
                                                <td className="py-2 text-slate-700">{m.label}</td>
                                                <td className="py-2 text-right text-orange-700">{formatNaira(m.vat)}</td>
                                                <td className="py-2 text-right text-rose-700">{formatNaira(m.wht)}</td>
                                                <td className="py-2 text-right text-xs text-slate-500">
                                                    {new Date(report.year, m.monthIndex + 1, 21).toLocaleDateString('en-NG')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
