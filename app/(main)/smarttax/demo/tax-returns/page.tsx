'use client';

import { useMemo, useState } from 'react';
import { PageHeader, EmptyState } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';
import { calculatePersonalIncomeTax, formatNaira } from '../_lib/taxCalculator';
import { CheckCircle2, FileText, Plus } from 'lucide-react';

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
            const start = new Date(Number(year), Number(month) - 1, 1);
            const end = new Date(Number(year), Number(month), 0, 23, 59, 59);
            const txns = state.transactions.filter((t) => {
                const d = new Date(t.date);
                return d >= start && d <= end;
            });
            const totalSales = txns.reduce((s, t) => s + t.amount, 0);
            const totalVat = txns.reduce((s, t) => s + t.vatAmount, 0);
            const totalWht = txns.reduce((s, t) => s + t.whtAmount, 0);
            return {
                kind: 'period' as const,
                period: `${year}-${month}`,
                transactionCount: txns.length,
                totalSales,
                totalVat,
                totalWht,
                taxPayable: returnType === 'VAT' ? totalVat : totalWht,
                dueDate: new Date(Number(year), Number(month), 21),
            };
        }
        if (returnType === 'PIT') {
            const yearTxns = state.transactions.filter((t) => new Date(t.date).getFullYear() === Number(year));
            const derivedIncome = yearTxns.reduce((s, t) => s + t.amount, 0);
            const income = annualIncome ? parseFloat(annualIncome) : derivedIncome;
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
        const yearTxns = state.transactions.filter((t) => new Date(t.date).getFullYear() === Number(year));
        const turnover = yearTxns.reduce((s, t) => s + t.amount, 0);
        const cit = turnover * 0.3;
        return {
            kind: 'cit' as const,
            period: year,
            turnover,
            cit,
            dueDate: new Date(Number(year) + 1, 5, 30),
        };
    }, [returnType, year, month, state.transactions, annualIncome]);

    function handleFile() {
        if (summary.kind === 'period') {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.totalSales,
                totalVatCollected: summary.totalVat,
                totalWhtDeducted: summary.totalWht,
                taxPayable: summary.taxPayable,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        } else if (summary.kind === 'pit') {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.annualIncome,
                totalVatCollected: 0,
                totalWhtDeducted: 0,
                taxPayable: summary.tax,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        } else {
            addTaxReturn({
                returnType,
                filingPeriod: summary.period,
                totalIncome: summary.turnover,
                totalVatCollected: 0,
                totalWhtDeducted: 0,
                taxPayable: summary.cit,
                status: 'filed',
                filingDate: new Date().toISOString(),
            });
        }
        setFiledMsg(`${returnType} return prepared and marked as filed. In production, SmartTax would submit this directly to NRS TaxPro-Max.`);
        setTimeout(() => setFiledMsg(null), 6000);
    }

    return (
        <>
            <PageHeader
                title="Tax Returns"
                description="Prepare VAT, Withholding Tax, Personal Income Tax, and Company Income Tax returns using the Nigerian Revenue Service 2025 reforms."
            />

            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-slate-800 mb-4">Prepare a Return</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">Return Type</span>
                        <select
                            value={returnType}
                            onChange={(e) => setReturnType(e.target.value as ReturnType)}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onChange={(e) => setYear(e.target.value)}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    {(returnType === 'VAT' || returnType === 'WHT') && (
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Month</span>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                    <option key={m} value={String(m).padStart(2, '0')}>
                                        {new Date(2024, m - 1).toLocaleString('en-NG', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    {returnType === 'PIT' && (
                        <label className="block md:col-span-2">
                            <span className="text-sm font-medium text-slate-700">Annual Income (optional override)</span>
                            <input
                                type="number"
                                step="0.01"
                                value={annualIncome}
                                onChange={(e) => setAnnualIncome(e.target.value)}
                                placeholder="Leave blank to use transactions"
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </label>
                    )}
                </div>
            </div>

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading…</div>
            ) : (
                <ReturnSummary returnType={returnType} summary={summary} onFile={handleFile} />
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
                    <EmptyState
                        title="No returns filed yet"
                        description="Prepare and file a return above to see it here."
                    />
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
                                {state.taxReturns.map((r) => (
                                    <tr key={r.id} className="border-t border-slate-100">
                                        <td className="px-5 py-3 font-semibold text-slate-800">{r.returnType}</td>
                                        <td className="px-5 py-3 text-slate-600">{r.filingPeriod}</td>
                                        <td className="px-5 py-3 text-right text-slate-700">{formatNaira(r.totalIncome)}</td>
                                        <td className="px-5 py-3 text-right font-semibold text-slate-900">
                                            {formatNaira(r.taxPayable)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                                                <CheckCircle2 className="h-3 w-3" /> {r.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-xs text-slate-500">
                                            {r.filingDate ? new Date(r.filingDate).toLocaleDateString('en-NG') : '—'}
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
    onFile,
}: {
    returnType: ReturnType;
    summary:
        | {
              kind: 'period';
              period: string;
              transactionCount: number;
              totalSales: number;
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
              turnover: number;
              cit: number;
              dueDate: Date;
          };
    onFile: () => void;
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-slate-800">{returnType} Return — {summary.period}</h2>
            </div>

            {summary.kind === 'period' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <Stat label="Transactions" value={String(summary.transactionCount)} />
                    <Stat label="Total Sales" value={formatNaira(summary.totalSales)} />
                    <Stat label="VAT Collected" value={formatNaira(summary.totalVat)} tone="orange" />
                    <Stat label="WHT Deducted" value={formatNaira(summary.totalWht)} tone="rose" />
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
                            <p className="text-xs font-semibold uppercase text-slate-500 mb-2">
                                Bracket Breakdown (2025 PIT reform)
                            </p>
                            <ul className="space-y-1 text-sm">
                                {summary.bracketBreakdown.map((b, i) => (
                                    <li key={i} className="flex justify-between">
                                        <span className="text-slate-700">
                                            {b.label} — taxed {formatNaira(b.taxedAmount)}
                                        </span>
                                        <span className="font-semibold text-slate-900">{formatNaira(b.tax)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {summary.kind === 'cit' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Stat label="Annual Turnover" value={formatNaira(summary.turnover)} />
                    <Stat label="Estimated CIT (30%)" value={formatNaira(summary.cit)} tone="orange" />
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                    <span className="font-medium">Due: </span>
                    {summary.dueDate.toLocaleDateString('en-NG', { dateStyle: 'medium' })}
                </div>
                <button
                    onClick={onFile}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" /> Prepare &amp; File Return
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
