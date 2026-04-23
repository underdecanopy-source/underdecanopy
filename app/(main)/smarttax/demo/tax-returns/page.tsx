'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, FileText, Plus } from 'lucide-react';
import { EmptyState, PageHeader } from '../_components/ui';
import { filterTransactionsByPeriod, summarizeTransactions } from '../_lib/financials';
import { useSmartTaxStore } from '../_lib/store';
import { calculatePersonalIncomeTax, formatNaira } from '../_lib/taxCalculator';

type ReturnType = 'VAT' | 'PIT' | 'WHT' | 'CIT';

export default function TaxReturnsPage() {
    const { state, hydrated, addTaxReturn } = useSmartTaxStore();
    const [returnType, setReturnType] = useState<ReturnType>('VAT');
    const now = new Date();
    const [year, setYear] = useState<string>(String(now.getFullYear()));
    const [month, setMonth] = useState<string>(String(now.getMonth() + 1).padStart(2, '0'));
    const [annualIncome, setAnnualIncome] = useState<string>('');
    const [filedMsg, setFiledMsg] = useState<string | null>(null);

    const summary = useMemo(() => {
        if (returnType === 'VAT' || returnType === 'WHT') {
            const txns = filterTransactionsByPeriod(state.transactions, 'monthly', Number(year), Number(month) - 1).filter(
                (transaction) => (returnType === 'VAT' ? transaction.type === 'revenue' : transaction.type === 'expense')
            );
            const totals = summarizeTransactions(txns, state.settings.profitTaxRatePercent);
            return {
                kind: 'period' as const,
                period: `${year}-${month}`,
                transactionCount: txns.length,
                totalIncome: returnType === 'VAT' ? totals.revenue : totals.expenses,
                totalVat: totals.vatCredits,
                totalWht: totals.whtCredits,
                taxPayable: returnType === 'VAT' ? totals.vatCredits : totals.whtCredits,
                dueDate: new Date(Number(year), Number(month), 21),
            };
        }

        const yearTxns = filterTransactionsByPeriod(state.transactions, 'yearly', Number(year));
        const yearlySummary = summarizeTransactions(yearTxns, state.settings.profitTaxRatePercent);

        if (returnType === 'PIT') {
            const income = annualIncome ? parseFloat(annualIncome) : yearlySummary.revenue;
            const pit = calculatePersonalIncomeTax(income);
            return {
                kind: 'pit' as const,
                period: year,
                annualIncome: income,
                tax: pit.tax,
                effectiveRate: pit.effectiveRate,
                bracketBreakdown: pit.bracketBreakdown,
                dueDate: new Date(Number(year) + 1, 2, 31),
            };
        }

        return {
            kind: 'cit' as const,
            period: year,
            revenue: yearlySummary.revenue,
            expenses: yearlySummary.expenses,
            profitBeforeTax: yearlySummary.profitBeforeTax,
            cit: yearlySummary.taxation,
            dueDate: new Date(Number(year) + 1, 5, 30),
        };
    }, [annualIncome, month, returnType, state.settings.profitTaxRatePercent, state.transactions, year]);

    function handleFile() {
        if (summary.kind === 'period') {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.totalIncome,
                totalVatCredit: summary.totalVat,
                totalWhtCredit: summary.totalWht,
                taxPayable: summary.taxPayable,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        } else if (summary.kind === 'pit') {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.annualIncome,
                totalVatCredit: 0,
                totalWhtCredit: 0,
                taxPayable: summary.tax,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        } else {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.revenue,
                totalVatCredit: 0,
                totalWhtCredit: 0,
                taxPayable: summary.cit,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        }
        setFiledMsg(`${returnType} return prepared using the updated revenue and expense split.`);
        setTimeout(() => setFiledMsg(null), 6000);
    }

    return (
        <>
            <PageHeader
                title="Tax Returns"
                description="Prepare returns from credit-side VAT, debit-side WHT deductions, and configured annual profit-tax calculations."
            />

            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-slate-800 mb-4">Prepare a Return</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Return Type</span>
                        <select
                            value={returnType}
                            onChange={(event) => setReturnType(event.target.value as ReturnType)}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white"
                        >
                            <option value="VAT">VAT (Monthly)</option>
                            <option value="WHT">Withholding Tax (Monthly)</option>
                            <option value="PIT">Personal Income Tax (Annual)</option>
                            <option value="CIT">Company Income Tax (Annual)</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Year</span>
                        <input
                            type="number"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                        />
                    </label>
                    {(returnType === 'VAT' || returnType === 'WHT') && (
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Month</span>
                            <select
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white"
                            >
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index} value={String(index + 1).padStart(2, '0')}>
                                        {new Date(2024, index).toLocaleString('en-NG', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    {returnType === 'PIT' && (
                        <label className="block md:col-span-2">
                            <span className="text-sm font-medium text-slate-700">Annual Income Override</span>
                            <input
                                type="number"
                                step="0.01"
                                value={annualIncome}
                                onChange={(event) => setAnnualIncome(event.target.value)}
                                placeholder="Leave blank to use revenue transactions"
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                    )}
                </div>
            </div>

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading...</div>
            ) : (
                <ReturnSummary
                    returnType={returnType}
                    summary={summary}
                    profitTaxRatePercent={state.settings.profitTaxRatePercent}
                    onFile={handleFile}
                />
            )}

            {filedMsg && (
                <div className="mt-4 flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-md px-4 py-3 text-sm text-emerald-900">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{filedMsg}</span>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Filed Returns</h2>
                {state.taxReturns.length === 0 ? (
                    <EmptyState title="No returns filed yet" description="Prepare and file a return above to see it here." />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                                <tr>
                                    <th className="text-left px-5 py-3">Type</th>
                                    <th className="text-left px-5 py-3">Period</th>
                                    <th className="text-right px-5 py-3">Income</th>
                                    <th className="text-right px-5 py-3">Tax Payable</th>
                                    <th className="text-left px-5 py-3">Status</th>
                                    <th className="text-left px-5 py-3">Filed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.taxReturns.map((taxReturn) => (
                                    <tr key={taxReturn.id} className="border-t border-slate-100">
                                        <td className="px-5 py-3 font-semibold text-slate-800">{taxReturn.returnType}</td>
                                        <td className="px-5 py-3 text-slate-600">{taxReturn.filingPeriod}</td>
                                        <td className="px-5 py-3 text-right text-slate-700">{formatNaira(taxReturn.totalIncome)}</td>
                                        <td className="px-5 py-3 text-right font-semibold text-slate-900">{formatNaira(taxReturn.taxPayable)}</td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                                <CheckCircle2 className="h-3 w-3" /> {taxReturn.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-xs text-slate-500">
                                            {taxReturn.filingDate ? new Date(taxReturn.filingDate).toLocaleDateString('en-NG') : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

function ReturnSummary({
    returnType,
    summary,
    profitTaxRatePercent,
    onFile,
}: {
    returnType: ReturnType;
    summary:
        | {
              kind: 'period';
              period: string;
              transactionCount: number;
              totalIncome: number;
              totalVat: number;
              totalWht: number;
              taxPayable: number;
              dueDate: Date;
          }
        | {
              kind: 'pit';
              period: string;
              annualIncome: number;
              tax: number;
              effectiveRate: number;
              bracketBreakdown: Array<{ label: string; taxedAmount: number; tax: number }>;
              dueDate: Date;
          }
        | {
              kind: 'cit';
              period: string;
              revenue: number;
              expenses: number;
              profitBeforeTax: number;
              cit: number;
              dueDate: Date;
          };
    profitTaxRatePercent: number;
    onFile: () => void;
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-slate-800">{returnType} Return - {summary.period}</h2>
            </div>

            {summary.kind === 'period' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <Stat
                        label={returnType === 'VAT' ? 'Revenue Transactions' : 'Expense Transactions'}
                        value={String(summary.transactionCount)}
                    />
                    <Stat
                        label={returnType === 'VAT' ? 'Total Revenue' : 'Total Gross Expenses'}
                        value={formatNaira(summary.totalIncome)}
                    />
                    <Stat label="VAT Credits" value={formatNaira(summary.totalVat)} tone="orange" />
                    <Stat label="WHT Credits" value={formatNaira(summary.totalWht)} tone="rose" />
                </div>
            )}

            {summary.kind === 'pit' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Stat label="Annual Income" value={formatNaira(summary.annualIncome)} />
                        <Stat label="Tax Payable" value={formatNaira(summary.tax)} tone="orange" />
                        <Stat label="Effective Rate" value={`${summary.effectiveRate.toFixed(2)}%`} />
                    </div>
                    {summary.bracketBreakdown.length > 0 && (
                        <div className="border border-slate-200 rounded-md p-4 bg-slate-50">
                            <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Bracket Breakdown</p>
                            <ul className="space-y-1 text-sm">
                                {summary.bracketBreakdown.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span className="text-slate-700">{item.label} - taxed {formatNaira(item.taxedAmount)}</span>
                                        <span className="font-semibold text-slate-900">{formatNaira(item.tax)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {summary.kind === 'cit' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Stat label="Revenue" value={formatNaira(summary.revenue)} />
                    <Stat label="Expenses" value={formatNaira(summary.expenses)} />
                    <Stat label="Profit Before Tax" value={formatNaira(summary.profitBeforeTax)} />
                    <Stat label={`Estimated CIT (${profitTaxRatePercent}%)`} value={formatNaira(summary.cit)} tone="orange" />
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                    <span className="font-medium">Due: </span>
                    {summary.dueDate.toLocaleDateString('en-NG', { dateStyle: 'medium' })}
                </div>
                <button onClick={onFile} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">
                    <Plus className="h-4 w-4" /> Prepare and File Return
                </button>
            </div>
        </div>
    );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'orange' | 'rose' }) {
    const toneClass = tone === 'orange' ? 'text-orange-700' : tone === 'rose' ? 'text-rose-700' : 'text-slate-900';
    return (
        <div>
            <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
            <p className={`text-lg font-bold ${toneClass}`}>{value}</p>
        </div>
    );
}
