'use client';

import { useMemo, useState } from 'react';
import { EmptyState, PageHeader, StatCard } from '../_components/ui';
import { filterTransactionsByPeriod, getTransactionLabel, summarizeTransactions, type ReportPeriod } from '../_lib/financials';
import { openPrintableDocument } from '../_lib/openDocument';
import { useSmartTaxStore } from '../_lib/store';
import { formatNaira } from '../_lib/taxCalculator';

export default function ReportsPage() {
    const { state, hydrated } = useSmartTaxStore();
    const now = new Date();
    const [period, setPeriod] = useState<ReportPeriod>('yearly');
    const [year, setYear] = useState(String(now.getFullYear()));
    const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, '0'));
    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    const [validationStatus, setValidationStatus] = useState<'pass' | 'warning' | 'fail' | null>(null);

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

    function validateReport(reportData: NonNullable<typeof report>) {
        const errors: string[] = [];
        const expectedProfitBeforeTax = reportData.summary.revenue - reportData.summary.expenses;
        if (Math.abs(reportData.summary.profitBeforeTax - expectedProfitBeforeTax) > 0.01) {
            errors.push('Profit before tax should equal revenue minus expenses.');
        }

        const expectedTaxation = (reportData.summary.profitBeforeTax * state.settings.profitTaxRatePercent) / 100;
        if (Math.abs(reportData.summary.taxation - expectedTaxation) > 0.01) {
            errors.push('Taxation appears inconsistent with the configured profit-tax rate.');
        }

        const reportingEnd = period === 'monthly'
            ? new Date(Number(year), Number(month) - 1, new Date(Number(year), Number(month), 0).getDate())
            : new Date(Number(year), 11, 31);
        const invalidTransactions = reportData.scopedTransactions.filter((transaction) => new Date(transaction.date) > reportingEnd);
        if (invalidTransactions.length > 0) {
            errors.push(`${invalidTransactions.length} transaction(s) are dated after the selected reporting period end.`);
        }

        if (errors.length > 0) {
            return { status: 'fail' as const, message: `Report review found issues: ${errors.join(' ')}` };
        }

        return { status: 'pass' as const, message: 'Report metrics are consistent with the selected period, transaction totals, and tax settings.' };
    }

    function buildReportDocumentHtml(reportData: NonNullable<typeof report>) {
        const title = `${period === 'monthly' ? 'Monthly' : 'Yearly'} Tax Report ${year}${period === 'monthly' ? `-${month}` : ''}`;
        const header = `<div class="document-header"><h1>${title}</h1><p class="small-text">Generated on ${new Date().toLocaleDateString('en-NG', { dateStyle: 'long' })}</p></div>`;
        const metrics = `<div class="card"><div class="field-row"><span><strong>Revenue</strong><span>${formatNaira(reportData.summary.revenue)}</span></span><span><strong>Expenses</strong><span>${formatNaira(reportData.summary.expenses)}</span></span></div><div class="field-row"><span><strong>Profit Before Tax</strong><span>${formatNaira(reportData.summary.profitBeforeTax)}</span></span><span><strong>Taxation</strong><span>${formatNaira(reportData.summary.taxation)}</span></span></div><div class="field-row"><span><strong>Profit After Tax</strong><span>${formatNaira(reportData.summary.profitAfterTax)}</span></span><span><strong>Profit Tax Rate</strong><span>${state.settings.profitTaxRatePercent}%</span></span></div></div>`;
        const breakdown = Array.from(reportData.byCategory.entries())
            .sort((a, b) => b[1].total - a[1].total)
            .map(
                ([label, bucket]) => `<div class="field-row"><span>${label}</span><span>${formatNaira(bucket.total)}</span></div>`
            )
            .join('');
        return `${header}${metrics}<div class="card"><strong>Transaction Category Breakdown</strong>${breakdown}</div>`;
    }

    function handlePrintReport(reportData: NonNullable<typeof report>) {
        const documentHtml = buildReportDocumentHtml(reportData);
        openPrintableDocument(
            documentHtml,
            `${period === 'monthly' ? 'Monthly' : 'Yearly'}-Tax-Report-${year}${period === 'monthly' ? `-${month}` : ''}`,
            true
        );
    }

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
                        <button
                            onClick={() => {
                                if (report) {
                                    const result = validateReport(report);
                                    setValidationMessage(result.message);
                                    setValidationStatus(result.status);
                                }
                            }}
                            className="px-3 py-1.5 text-sm font-semibold rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                            Validate
                        </button>
                        <button
                            onClick={() => report && handlePrintReport(report)}
                            className="px-3 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Print / Save PDF
                        </button>
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
                    {validationMessage && (
                        <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${validationStatus === 'pass' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : validationStatus === 'fail' ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                            {validationMessage}
                        </div>
                    )}
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
