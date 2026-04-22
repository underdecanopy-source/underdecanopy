import type { Transaction } from './types';

export type ReportPeriod = 'monthly' | 'yearly';

export interface FinancialSummary {
    revenue: number;
    expenses: number;
    profitBeforeTax: number;
    taxation: number;
    profitAfterTax: number;
    vatCollected: number;
    whtCredits: number;
    revenueCount: number;
    expenseCount: number;
}

export function getDebitCreditLabel(type: Transaction['type']): Transaction['debitCreditFlag'] {
    return type === 'expense' ? 'debit' : 'credit';
}

export function getTransactionLabel(transaction: Pick<Transaction, 'type' | 'subCategory' | 'category'>): string {
    if (transaction.type === 'revenue') {
        return transaction.subCategory || 'Revenue';
    }
    return transaction.category || 'Expense';
}

export function filterTransactionsByPeriod(
    transactions: Transaction[],
    period: ReportPeriod,
    year: number,
    month?: number
): Transaction[] {
    return transactions.filter((transaction) => {
        const date = new Date(transaction.date);
        if (date.getFullYear() !== year) {
            return false;
        }
        return period === 'yearly' || date.getMonth() === (month ?? 0);
    });
}

export function summarizeTransactions(transactions: Transaction[], taxRate = 0.3): FinancialSummary {
    const revenueTransactions = transactions.filter((transaction) => transaction.type === 'revenue');
    const expenseTransactions = transactions.filter((transaction) => transaction.type === 'expense');

    const revenue = revenueTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const expenses = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const profitBeforeTax = revenue - expenses;
    const taxation = profitBeforeTax > 0 ? profitBeforeTax * taxRate : 0;

    return {
        revenue,
        expenses,
        profitBeforeTax,
        taxation,
        profitAfterTax: profitBeforeTax - taxation,
        vatCollected: revenueTransactions.reduce((sum, transaction) => sum + transaction.vatAmount, 0),
        whtCredits: revenueTransactions.reduce((sum, transaction) => sum + transaction.whtAmount, 0),
        revenueCount: revenueTransactions.length,
        expenseCount: expenseTransactions.length,
    };
}
