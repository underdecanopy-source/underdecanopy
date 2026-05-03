'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Download, FileText, Mail, MessageCircle, Plus } from 'lucide-react';
import { EmptyState, PageHeader } from '../_components/ui';
import { filterTransactionsByPeriod, summarizeTransactions } from '../_lib/financials';
import { requireTaxIdentity } from '../_lib/identity';
import { openPrintableDocument } from '../_lib/openDocument';
import { useSmartTaxStore } from '../_lib/store';
import { buildTaxReturnDocumentData, buildTaxReturnDocumentHtml, buildTaxReturnShareMessage } from '../_lib/taxReturnDocument';
import { blobToBase64, generateTaxReturnPdfBlob } from '../_lib/taxReturnPdf';
import { calculateCIT, calculatePIT, formatNaira } from '../_lib/taxCalculator';
import type { TaxReturn, TaxReturnComputation } from '../_lib/types';

type ReturnType = 'VAT' | 'PIT' | 'WHT' | 'CIT';
type StatusMessage = { text: string; tone: 'success' | 'error' } | null;

function parseNumericInput(value: string): number {
    const parsed = Number.parseFloat(value.replace(/,/g, '').trim());
    return Number.isFinite(parsed) ? parsed : 0;
}

function getDueDateLabel(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('en-NG', { dateStyle: 'medium' });
}

export default function TaxReturnsPage() {
    const { state, hydrated, addTaxReturn, addAuditEntry, markTaxReturnShared } = useSmartTaxStore();
    const [returnType, setReturnType] = useState<ReturnType>('VAT');
    const [selectedAuditReturnId, setSelectedAuditReturnId] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);
    const [busyReturnId, setBusyReturnId] = useState<string | null>(null);
    const now = useMemo(() => new Date(), []);
    const [year, setYear] = useState<string>(String(now.getFullYear()));
    const [month, setMonth] = useState<string>(String(now.getMonth() + 1).padStart(2, '0'));
    const [pitForm, setPitForm] = useState({
        annualIncome: '',
        pension: '',
        nhf: '',
        nhis: '',
        useRelief: true,
    });
    const [citForm, setCitForm] = useState({
        turnover: '',
        accountingProfit: '',
        disallowableExpenses: '',
        capitalAllowances: '',
        whtCredits: '',
    });

    const summary = useMemo<TaxReturnComputation>(() => {
        const selectedYear = Number(year) || now.getFullYear();
        const selectedMonthIndex = Math.max(0, Math.min(11, (Number(month) || now.getMonth() + 1) - 1));

        if (returnType === 'VAT' || returnType === 'WHT') {
            const transactions = filterTransactionsByPeriod(state.transactions, 'monthly', selectedYear, selectedMonthIndex).filter(
                (transaction) => (returnType === 'VAT' ? transaction.type === 'revenue' : transaction.type === 'expense')
            );
            const totals = summarizeTransactions(transactions, state.settings.profitTaxRatePercent);

            return {
                kind: 'period',
                returnType,
                transactionCount: transactions.length,
                totalIncome: returnType === 'VAT' ? totals.revenue : totals.expenses,
                totalVatCredit: totals.vatCredits,
                totalWhtCredit: totals.whtCredits,
                taxPayable: returnType === 'VAT' ? totals.vatCredits : totals.whtCredits,
                dueDate: new Date(selectedYear, selectedMonthIndex + 1, 21).toISOString(),
            };
        }

        const yearlyTransactions = filterTransactionsByPeriod(state.transactions, 'yearly', selectedYear);
        const yearlySummary = summarizeTransactions(yearlyTransactions, state.settings.profitTaxRatePercent);

        if (returnType === 'PIT') {
            const income = pitForm.annualIncome ? parseNumericInput(pitForm.annualIncome) : yearlySummary.revenue;
            const pit = calculatePIT({
                grossAnnualIncome: income,
                pension: parseNumericInput(pitForm.pension),
                nhf: parseNumericInput(pitForm.nhf),
                nhis: parseNumericInput(pitForm.nhis),
                useRelief: pitForm.useRelief,
            });

            return {
                kind: 'pit',
                grossAnnualIncome: pit.grossAnnualIncome,
                pension: pit.pension,
                nhf: pit.nhf,
                nhis: pit.nhis,
                totalDeductions: pit.totalDeductions,
                useRelief: pit.useRelief,
                cra: pit.cra,
                taxableIncome: pit.taxableIncome,
                totalTax: pit.totalTax,
                effectiveRate: pit.effectiveRate,
                breakdown: pit.breakdown,
                dueDate: new Date(selectedYear + 1, 2, 31).toISOString(),
            };
        }

        const turnover = citForm.turnover ? parseNumericInput(citForm.turnover) : yearlySummary.revenue;
        const accountingProfit = citForm.accountingProfit
            ? parseNumericInput(citForm.accountingProfit)
            : Math.max(0, yearlySummary.profitBeforeTax);
        const cit = calculateCIT({
            turnover,
            accountingProfit,
            disallowableExpenses: parseNumericInput(citForm.disallowableExpenses),
            capitalAllowances: parseNumericInput(citForm.capitalAllowances),
            whtCredits: parseNumericInput(citForm.whtCredits),
        });

        return {
            kind: 'cit',
            turnover: cit.turnover,
            accountingProfit: cit.accountingProfit,
            disallowableExpenses: cit.disallowableExpenses,
            capitalAllowances: cit.capitalAllowances,
            whtCredits: cit.whtCredits,
            taxableProfit: cit.taxableProfit,
            tax: cit.tax,
            finalTax: cit.finalTax,
            effectiveRate: cit.effectiveRate,
            companyCategory: cit.companyCategory,
            dueDate: new Date(selectedYear + 1, 5, 30).toISOString(),
        };
    }, [
        citForm.accountingProfit,
        citForm.capitalAllowances,
        citForm.disallowableExpenses,
        citForm.turnover,
        citForm.whtCredits,
        month,
        now,
        pitForm.annualIncome,
        pitForm.nhf,
        pitForm.nhis,
        pitForm.pension,
        pitForm.useRelief,
        returnType,
        state.settings.profitTaxRatePercent,
        state.transactions,
        year,
    ]);

    async function createDocumentHash(content: string): Promise<string> {
        const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
        return Array.from(new Uint8Array(hashBuffer))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    function showStatus(text: string, tone: 'success' | 'error') {
        setStatusMessage({ text, tone });
        window.setTimeout(() => setStatusMessage(null), 6000);
    }

    function getFilingPeriod(): string {
        return returnType === 'VAT' || returnType === 'WHT' ? `${year}-${month}` : year;
    }

    function buildDocumentForComputation(computation: TaxReturnComputation, generatedAt: string, verificationHash: string) {
        const period = getFilingPeriod();
        const totalIncome =
            computation.kind === 'period'
                ? computation.totalIncome
                : computation.kind === 'pit'
                  ? computation.grossAnnualIncome
                  : computation.turnover;
        const taxPayable =
            computation.kind === 'period'
                ? computation.taxPayable
                : computation.kind === 'pit'
                  ? computation.totalTax
                  : computation.finalTax;
        const totalVatCredit = computation.kind === 'period' ? computation.totalVatCredit : 0;
        const totalWhtCredit = computation.kind === 'period' ? computation.totalWhtCredit : computation.kind === 'cit' ? computation.whtCredits : 0;

        return buildTaxReturnDocumentData({
            profile: state.profile,
            title: `${returnType} Return ${period}`,
            taxType: returnType,
            filingPeriod: period,
            filingYear: year,
            generatedAt,
            verificationHash,
            totalIncome,
            totalVatCredit,
            totalWhtCredit,
            taxPayable,
            computation,
        });
    }

    function buildDocumentForFiledReturn(taxReturn: TaxReturn) {
        if (!taxReturn.computation) {
            return null;
        }

        const profileSnapshot = {
            ...state.profile,
            businessName: taxReturn.taxpayerName || state.profile.businessName,
            name: taxReturn.taxpayerName || state.profile.name,
            taxId: taxReturn.taxId || state.profile.taxId,
            tin: taxReturn.tin || state.profile.tin,
        };

        return buildTaxReturnDocumentData({
            profile: profileSnapshot,
            title: taxReturn.documentTitle || `${taxReturn.returnType} Return ${taxReturn.filingPeriod}`,
            taxType: taxReturn.returnType,
            filingPeriod: taxReturn.filingPeriod,
            filingYear: taxReturn.filingPeriod.slice(0, 4),
            generatedAt: taxReturn.documentGeneratedAt || taxReturn.filingDate || taxReturn.createdAt,
            verificationHash: taxReturn.verificationHash || taxReturn.pdfHash || 'n/a',
            totalIncome: taxReturn.totalIncome,
            totalVatCredit: taxReturn.totalVatCredit,
            totalWhtCredit: taxReturn.totalWhtCredit,
            taxPayable: taxReturn.taxPayable,
            computation: taxReturn.computation,
        });
    }

    async function handleFile() {
        try {
            const identity = requireTaxIdentity(state.profile);
            const filingDate = new Date().toISOString();
            const verificationHash = await createDocumentHash(
                JSON.stringify({
                    returnType,
                    period: getFilingPeriod(),
                    computation: summary,
                    taxId: identity.primaryValue,
                    filingDate,
                })
            );
            const document = buildDocumentForComputation(summary, filingDate, verificationHash);
            const pdfBlob = await generateTaxReturnPdfBlob(document);
            const pdfBase64 = await blobToBase64(pdfBlob);
            const downloadFileName = `${document.title.replace(/\s+/g, '-')}.pdf`;

            const response = await fetch('/api/smarttax/filed-returns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: downloadFileName,
                    mimeType: 'application/pdf',
                    pdfBase64,
                    metadata: {
                        taxType: returnType,
                        taxId: identity.primaryValue,
                        tin: state.profile.tin,
                        taxpayerName: document.taxpayerName,
                        filingPeriod: document.filingPeriod,
                        createdAt: filingDate,
                        verificationHash,
                        email: state.profile.email,
                        phone: state.profile.phone,
                    },
                }),
            });

            if (!response.ok) {
                const error = (await response.json().catch(() => null)) as { error?: string } | null;
                throw new Error(error?.error || 'Unable to save the filed return PDF.');
            }

            const payload = (await response.json()) as {
                secureLink: string;
                downloadRef: string;
            };

            const taxReturn = addTaxReturn({
                returnType,
                filingPeriod: document.filingPeriod,
                totalIncome: document.totalIncome,
                totalVatCredit: document.totalVatCredit,
                totalWhtCredit: document.totalWhtCredit,
                taxPayable: document.taxPayable,
                status: 'filed',
                filingDate,
                documentTitle: document.title,
                documentGeneratedAt: filingDate,
                pdfHash: verificationHash,
                verificationHash,
                taxId: identity.primaryValue,
                tin: state.profile.tin,
                taxpayerName: document.taxpayerName,
                downloadRef: payload.downloadRef,
                downloadFileName,
                secureLink: payload.secureLink,
                sentViaEmail: false,
                sentViaWhatsApp: false,
                computation: summary,
            });

            addAuditEntry({
                userId: state.profile.email || 'demo@smarttax.ng',
                resourceType: 'taxReturn',
                resourceId: taxReturn.id,
                action: 'filed',
                note: `Filed ${returnType} return for ${document.filingPeriod} with Tax ID ${identity.primaryValue}`,
                newValue: taxReturn,
                recordHash: verificationHash,
            });

            openPrintableDocument(buildTaxReturnDocumentHtml(document), document.title);
            showStatus(`${returnType} return prepared, stored, and linked to Tax ID ${identity.primaryValue}.`, 'success');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to prepare the return.';
            showStatus(message, 'error');
        }
    }

    function handlePreviewReturnDocument(taxReturn: TaxReturn) {
        const document = buildDocumentForFiledReturn(taxReturn);
        if (!document) {
            showStatus('Unable to rebuild this return document because its computation snapshot is missing.', 'error');
            return;
        }

        openPrintableDocument(buildTaxReturnDocumentHtml(document), document.title, true);
    }

    async function handleShareEmail(taxReturn: TaxReturn) {
        const document = buildDocumentForFiledReturn(taxReturn);
        if (!document || !taxReturn.secureLink) {
            showStatus('This return does not yet have a secure file link.', 'error');
            return;
        }

        const recipient = state.profile.email?.trim();
        const subject = `Your ${taxReturn.returnType} Return (Tax ID: ${document.identity.primaryValue})`;
        const body = buildTaxReturnShareMessage(document, taxReturn.secureLink);

        if (!recipient) {
            window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            markTaxReturnShared(taxReturn.id, 'email');
            showStatus('Prepared an email draft because no SmartTax email address is configured.', 'success');
            return;
        }

        if (!taxReturn.downloadRef) {
            window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            markTaxReturnShared(taxReturn.id, 'email');
            showStatus('Prepared an email draft because this return has no stored PDF reference.', 'success');
            return;
        }

        setBusyReturnId(taxReturn.id);
        try {
            const response = await fetch('/api/smarttax/share/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ref: taxReturn.downloadRef,
                    to: recipient,
                    taxId: document.identity.primaryValue,
                    secureLink: taxReturn.secureLink,
                    subject,
                }),
            });

            if (!response.ok) {
                const error = (await response.json().catch(() => null)) as { error?: string } | null;
                throw new Error(error?.error || 'Unable to send email from the server.');
            }

            markTaxReturnShared(taxReturn.id, 'email');
            showStatus(`Sent the ${taxReturn.returnType} return to ${recipient}.`, 'success');
        } catch {
            window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            markTaxReturnShared(taxReturn.id, 'email');
            showStatus('Mail service is unavailable, so an email draft has been prepared locally.', 'success');
        } finally {
            setBusyReturnId(null);
        }
    }

    function handleShareWhatsApp(taxReturn: TaxReturn) {
        const document = buildDocumentForFiledReturn(taxReturn);
        if (!document || !taxReturn.secureLink) {
            showStatus('This return does not yet have a secure file link.', 'error');
            return;
        }

        const phone = state.profile.phone.replace(/\D/g, '');
        const message = encodeURIComponent(buildTaxReturnShareMessage(document, taxReturn.secureLink));
        const target = phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`;
        const popup = window.open(target, '_blank', 'noopener,noreferrer');

        if (!popup) {
            showStatus('WhatsApp share popup was blocked. Please allow popups and try again.', 'error');
            return;
        }

        markTaxReturnShared(taxReturn.id, 'whatsapp');
        showStatus(`Prepared WhatsApp share for ${taxReturn.returnType} return.`, 'success');
    }

    function handleDownloadReturn(taxReturn: TaxReturn) {
        if (!taxReturn.secureLink) {
            showStatus('This return does not yet have a secure file link.', 'error');
            return;
        }

        const anchor = document.createElement('a');
        anchor.href = taxReturn.secureLink;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    }

    function renderAuditTrail() {
        if (!selectedAuditReturnId) return null;
        const entries = state.auditTrail.filter((entry) => entry.resourceId === selectedAuditReturnId);
        if (entries.length === 0) {
            return (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-600">
                    No audit entries found for this return.
                </div>
            );
        }

        return (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Audit Trail</h3>
                <div className="space-y-3">
                    {entries.map((entry) => (
                        <div key={entry.id} className="rounded-lg border border-slate-200 bg-white p-3">
                            <p className="text-sm font-semibold text-slate-800">
                                {entry.action.toUpperCase()} | {new Date(entry.timestamp).toLocaleString('en-NG')}
                            </p>
                            <p className="text-sm text-slate-600">{entry.note}</p>
                            <p className="text-xs text-slate-500 mt-2">Record Hash: {entry.recordHash}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title="Tax Returns"
                description="Prepare VAT, WHT, PIT, and CIT returns with Tax ID resolution, stored PDF output, and secure share links."
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
                                value={pitForm.annualIncome}
                                onChange={(event) => setPitForm((current) => ({ ...current, annualIncome: event.target.value }))}
                                placeholder="Leave blank to use revenue transactions"
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                    )}
                </div>

                {returnType === 'PIT' && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-slate-200 pt-4">
                        <label className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 md:col-span-4 bg-slate-50">
                            <input
                                type="checkbox"
                                checked={pitForm.useRelief}
                                onChange={(event) => setPitForm((current) => ({ ...current, useRelief: event.target.checked }))}
                                className="h-4 w-4 accent-blue-600"
                            />
                            <span className="text-sm text-slate-700">
                                Apply CRA relief and statutory deductions. Disable this for the demo shortcut that taxes gross income directly.
                            </span>
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Pension</span>
                            <input
                                type="number"
                                step="0.01"
                                value={pitForm.pension}
                                onChange={(event) => setPitForm((current) => ({ ...current, pension: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">NHF</span>
                            <input
                                type="number"
                                step="0.01"
                                value={pitForm.nhf}
                                onChange={(event) => setPitForm((current) => ({ ...current, nhf: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">NHIS</span>
                            <input
                                type="number"
                                step="0.01"
                                value={pitForm.nhis}
                                onChange={(event) => setPitForm((current) => ({ ...current, nhis: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                    </div>
                )}

                {returnType === 'CIT' && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4 border-t border-slate-200 pt-4">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Turnover</span>
                            <input
                                type="number"
                                step="0.01"
                                value={citForm.turnover}
                                onChange={(event) => setCitForm((current) => ({ ...current, turnover: event.target.value }))}
                                placeholder="Defaults to annual revenue"
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Accounting Profit</span>
                            <input
                                type="number"
                                step="0.01"
                                value={citForm.accountingProfit}
                                onChange={(event) => setCitForm((current) => ({ ...current, accountingProfit: event.target.value }))}
                                placeholder="Defaults to annual PBT"
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Disallowable Expenses</span>
                            <input
                                type="number"
                                step="0.01"
                                value={citForm.disallowableExpenses}
                                onChange={(event) => setCitForm((current) => ({ ...current, disallowableExpenses: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">Capital Allowances</span>
                            <input
                                type="number"
                                step="0.01"
                                value={citForm.capitalAllowances}
                                onChange={(event) => setCitForm((current) => ({ ...current, capitalAllowances: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">WHT Credits</span>
                            <input
                                type="number"
                                step="0.01"
                                value={citForm.whtCredits}
                                onChange={(event) => setCitForm((current) => ({ ...current, whtCredits: event.target.value }))}
                                className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2"
                            />
                        </label>
                    </div>
                )}
            </div>

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading...</div>
            ) : (
                <ReturnSummary returnType={returnType} summary={summary} onFile={handleFile} />
            )}

            {statusMessage && (
                <div
                    className={`mt-4 flex items-start gap-2 rounded-md px-4 py-3 text-sm ${
                        statusMessage.tone === 'success'
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                            : 'bg-rose-50 border border-rose-200 text-rose-900'
                    }`}
                >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>{statusMessage.text}</span>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Filed Returns</h2>
                {state.taxReturns.length === 0 ? (
                    <EmptyState title="No returns filed yet" description="Prepare and file a return above to see it here." />
                ) : (
                    <>
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-5 py-3">Type</th>
                                        <th className="text-left px-5 py-3">Period</th>
                                        <th className="text-left px-5 py-3">Tax ID</th>
                                        <th className="text-right px-5 py-3">Income</th>
                                        <th className="text-right px-5 py-3">Tax Payable</th>
                                        <th className="text-left px-5 py-3">Delivery</th>
                                        <th className="text-left px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.taxReturns.map((taxReturn) => (
                                        <tr key={taxReturn.id} className="border-t border-slate-100 align-top">
                                            <td className="px-5 py-3 font-semibold text-slate-800">{taxReturn.returnType}</td>
                                            <td className="px-5 py-3 text-slate-600">{taxReturn.filingPeriod}</td>
                                            <td className="px-5 py-3 text-slate-700 font-mono">{taxReturn.taxId || '-'}</td>
                                            <td className="px-5 py-3 text-right text-slate-700">{formatNaira(taxReturn.totalIncome)}</td>
                                            <td className="px-5 py-3 text-right font-semibold text-slate-900">{formatNaira(taxReturn.taxPayable)}</td>
                                            <td className="px-5 py-3 text-xs text-slate-600 space-y-1">
                                                <div>{taxReturn.sentViaEmail ? 'Email sent/prepared' : 'Email pending'}</div>
                                                <div>{taxReturn.sentViaWhatsApp ? 'WhatsApp prepared' : 'WhatsApp pending'}</div>
                                                <div>Hash: {(taxReturn.verificationHash || taxReturn.pdfHash || 'n/a').slice(0, 12)}</div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleShareEmail(taxReturn)}
                                                        disabled={busyReturnId === taxReturn.id}
                                                        className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                                                    >
                                                        <Mail className="h-3.5 w-3.5" /> Email
                                                    </button>
                                                    <button
                                                        onClick={() => handleShareWhatsApp(taxReturn)}
                                                        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                                                    >
                                                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownloadReturn(taxReturn)}
                                                        className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                                                    >
                                                        <Download className="h-3.5 w-3.5" /> Download PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handlePreviewReturnDocument(taxReturn)}
                                                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                                                    >
                                                        <FileText className="h-3.5 w-3.5" /> Print / Save PDF
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedAuditReturnId((current) => (current === taxReturn.id ? null : taxReturn.id))}
                                                        className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50"
                                                    >
                                                        {selectedAuditReturnId === taxReturn.id ? 'Hide Audit Trail' : 'View Audit Trail'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {renderAuditTrail()}
                    </>
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
    summary: TaxReturnComputation;
    onFile: () => void;
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold text-slate-800">
                    {returnType} Return - {summary.kind === 'period' ? 'Monthly' : 'Annual'} Preview
                </h2>
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
                    <Stat label="VAT Credit" value={formatNaira(summary.totalVatCredit)} tone="orange" />
                    <Stat label="WHT Credit" value={formatNaira(summary.totalWhtCredit)} tone="rose" />
                    <Stat label="Tax Payable" value={formatNaira(summary.taxPayable)} tone="orange" />
                    <Stat label="Due Date" value={getDueDateLabel(summary.dueDate)} />
                </div>
            )}

            {summary.kind === 'pit' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Stat label="Gross Annual Income" value={formatNaira(summary.grossAnnualIncome)} />
                        <Stat label="Statutory Deductions" value={formatNaira(summary.totalDeductions)} />
                        <Stat label="CRA" value={summary.useRelief ? formatNaira(summary.cra) : 'Not applied'} />
                        <Stat label="Taxable Income" value={formatNaira(summary.taxableIncome)} />
                        <Stat label="Tax Payable" value={formatNaira(summary.totalTax)} tone="orange" />
                        <Stat label="Effective Rate" value={`${summary.effectiveRate.toFixed(2)}%`} />
                    </div>
                    {summary.breakdown.length > 0 && (
                        <div className="border border-slate-200 rounded-md p-4 bg-slate-50">
                            <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Progressive PIT Breakdown</p>
                            <ul className="space-y-1 text-sm">
                                {summary.breakdown.map((item, index) => (
                                    <li key={index} className="flex justify-between gap-3">
                                        <span className="text-slate-700">{item.label}</span>
                                        <span className="font-semibold text-slate-900">
                                            {formatNaira(item.tax)} on {formatNaira(item.taxableAmount)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {summary.kind === 'cit' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Stat label="Turnover" value={formatNaira(summary.turnover)} />
                    <Stat label="Accounting Profit" value={formatNaira(summary.accountingProfit)} />
                    <Stat label="Taxable Profit" value={formatNaira(summary.taxableProfit)} />
                    <Stat label="Base CIT" value={formatNaira(summary.tax)} tone="orange" />
                    <Stat label="WHT Credits" value={formatNaira(summary.whtCredits)} />
                    <Stat label="Final Tax" value={formatNaira(summary.finalTax)} tone="orange" />
                    <Stat
                        label="Company Category"
                        value={summary.companyCategory === 'small' ? 'Small Company' : 'Medium / Large'}
                    />
                    <Stat label="Due Date" value={getDueDateLabel(summary.dueDate)} />
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                    <span className="font-medium">Tax ID Requirement: </span>
                    Tax ID is inserted into the return PDF, secure download link, and share payloads.
                </div>
                <button
                    onClick={onFile}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                >
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
