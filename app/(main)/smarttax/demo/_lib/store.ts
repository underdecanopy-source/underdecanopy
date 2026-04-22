'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Profile, Reminder, Receipt, SmartTaxState, TaxReturn, Transaction } from './types';
import { getDebitCreditLabel } from './financials';
import { calculateTransactionTax } from './taxCalculator';

const STORAGE_KEY = 'smarttax-demo-state-v1';

export const defaultProfile: Profile = {
    name: 'Demo User',
    email: 'demo@smarttax.ng',
    phone: '+234 800 000 0000',
    businessName: 'SmartTax Demo Business',
    tin: '',
    address: '',
    state: 'Lagos',
    businessType: 'sole-proprietor',
};

function seedDefaults(): SmartTaxState {
    const now = new Date();
    const mkDate = (offsetDays: number) => {
        const d = new Date(now);
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString();
    };

    const reminders: Reminder[] = [
        {
            id: 'r-vat',
            title: 'Monthly VAT Return',
            description: 'File VAT return for this month with NRS (TaxPro-Max).',
            dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 21).toISOString(),
            isCompleted: false,
            createdAt: mkDate(0),
        },
        {
            id: 'r-wht',
            title: 'Withholding Tax Remittance',
            description: 'Remit WHT deducted on supplier payments.',
            dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 10).toISOString(),
            isCompleted: false,
            createdAt: mkDate(0),
        },
        {
            id: 'r-pit',
            title: 'Annual Personal Income Tax',
            description: 'File annual PIT with your state IRS before 31st March.',
            dueDate: new Date(now.getFullYear() + (now.getMonth() > 2 ? 1 : 0), 2, 31).toISOString(),
            isCompleted: false,
            createdAt: mkDate(0),
        },
    ];

    return {
        profile: defaultProfile,
        transactions: [],
        receipts: [],
        taxReturns: [],
        reminders,
        initialized: true,
    };
}

export function loadState(): SmartTaxState {
    if (typeof window === 'undefined') {
        return { ...seedDefaults(), initialized: false };
    }
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            const fresh = seedDefaults();
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
            return fresh;
        }
        const parsed = JSON.parse(raw) as SmartTaxState;
        const migratedTxns = (parsed.transactions || []).map((transaction) => ({
            ...transaction,
            type: transaction.type ?? 'revenue',
            subCategory:
                transaction.subCategory ??
                (transaction.category === 'Services' || transaction.category === 'Consulting'
                    ? 'Service Income'
                    : 'Sales'),
            debitCreditFlag: transaction.debitCreditFlag ?? getDebitCreditLabel(transaction.type ?? 'revenue'),
            vatable: typeof transaction.vatable === 'boolean' ? transaction.vatable : transaction.vatAmount > 0,
            whtApplicable:
                typeof transaction.whtApplicable === 'boolean' ? transaction.whtApplicable : transaction.whtAmount > 0,
            taxYear: typeof transaction.taxYear === 'number' ? transaction.taxYear : new Date(transaction.date).getFullYear(),
            creditNoteGenerated:
                typeof transaction.creditNoteGenerated === 'boolean'
                    ? transaction.creditNoteGenerated
                    : transaction.whtAmount > 0,
        }));
        const migratedReceipts = (parsed.receipts || []).map((receipt) => ({
            ...receipt,
            sentViaEmail: !!receipt.sentViaEmail,
            sentViaWhatsApp: !!receipt.sentViaWhatsApp,
        }));
        return { ...parsed, transactions: migratedTxns, receipts: migratedReceipts };
    } catch {
        return seedDefaults();
    }
}

export function saveState(state: SmartTaxState): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): SmartTaxState {
    const fresh = seedDefaults();
    saveState(fresh);
    return fresh;
}

export function useSmartTaxStore() {
    const [state, setState] = useState<SmartTaxState>(() => ({ ...seedDefaults(), initialized: false }));
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setState(loadState());
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) saveState(state);
    }, [state, hydrated]);

    const updateProfile = useCallback((profile: Partial<Profile>) => {
        setState((current) => ({ ...current, profile: { ...current.profile, ...profile } }));
    }, []);

    const addTransaction = useCallback((input: Omit<Transaction, 'id' | 'receiptId' | 'date'> & { date?: string }) => {
        const id = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const receiptNumber = `STX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
        const date = input.date ?? new Date().toISOString();
        const transaction: Transaction = { ...input, id, receiptId, date };
        const receipt: Receipt = {
            id: receiptId,
            receiptNumber,
            transactionId: id,
            createdAt: new Date().toISOString(),
            sentViaEmail: false,
            sentViaWhatsApp: false,
        };
        setState((current) => ({
            ...current,
            transactions: [transaction, ...current.transactions],
            receipts: [receipt, ...current.receipts],
        }));
        return { txn: transaction, receipt };
    }, []);

    const deleteTransaction = useCallback((txnId: string) => {
        setState((current) => ({
            ...current,
            transactions: current.transactions.filter((transaction) => transaction.id !== txnId),
            receipts: current.receipts.filter((receipt) => receipt.transactionId !== txnId),
        }));
    }, []);

    const markReceiptSent = useCallback((receiptId: string, channel: 'email' | 'whatsapp') => {
        setState((current) => ({
            ...current,
            receipts: current.receipts.map((receipt) =>
                receipt.id === receiptId
                    ? {
                          ...receipt,
                          sentViaEmail: channel === 'email' ? true : receipt.sentViaEmail,
                          sentViaWhatsApp: channel === 'whatsapp' ? true : receipt.sentViaWhatsApp,
                      }
                    : receipt
            ),
        }));
    }, []);

    const addTaxReturn = useCallback((input: Omit<TaxReturn, 'id' | 'createdAt'>) => {
        const id = `ret_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const taxReturn: TaxReturn = { ...input, id, createdAt: new Date().toISOString() };
        setState((current) => ({ ...current, taxReturns: [taxReturn, ...current.taxReturns] }));
        return taxReturn;
    }, []);

    const addReminder = useCallback((input: Omit<Reminder, 'id' | 'createdAt' | 'isCompleted'>) => {
        const reminder: Reminder = {
            ...input,
            id: `rem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString(),
            isCompleted: false,
        };
        setState((current) => ({ ...current, reminders: [...current.reminders, reminder] }));
        return reminder;
    }, []);

    const toggleReminder = useCallback((id: string) => {
        setState((current) => ({
            ...current,
            reminders: current.reminders.map((reminder) =>
                reminder.id === id ? { ...reminder, isCompleted: !reminder.isCompleted } : reminder
            ),
        }));
    }, []);

    const deleteReminder = useCallback((id: string) => {
        setState((current) => ({ ...current, reminders: current.reminders.filter((reminder) => reminder.id !== id) }));
    }, []);

    const reset = useCallback(() => {
        setState(resetState());
    }, []);

    const loadSampleData = useCallback(() => {
        setState((current) => {
            const now = new Date();
            const mk = (daysBack: number, hour = 10) => {
                const d = new Date(now);
                d.setDate(d.getDate() - daysBack);
                d.setHours(hour, 0, 0, 0);
                return d.toISOString();
            };

            type Sample = {
                type: 'expense' | 'revenue';
                subCategory?: 'Sales' | 'Service Income';
                customerName: string;
                customerEmail?: string;
                customerPhone?: string;
                customerType: 'individual' | 'corporate' | 'non-taxable';
                description: string;
                amount: number;
                vatable: boolean;
                whtApplicable: boolean;
                category: string;
                daysBack: number;
            };

            const samples: Sample[] = [
                {
                    type: 'revenue',
                    subCategory: 'Service Income',
                    customerName: 'Chidinma Okafor',
                    customerEmail: 'chidinma@example.ng',
                    customerPhone: '+234 803 111 2233',
                    customerType: 'individual',
                    description: 'Brand strategy consultancy for April',
                    amount: 750000,
                    vatable: true,
                    whtApplicable: true,
                    category: 'Consulting',
                    daysBack: 2,
                },
                {
                    type: 'revenue',
                    subCategory: 'Service Income',
                    customerName: 'Lagos Tech Hub Ltd',
                    customerEmail: 'accounts@lagostechhub.com',
                    customerPhone: '+234 701 555 8899',
                    customerType: 'corporate',
                    description: 'Quarterly retainer for IT advisory',
                    amount: 1250000,
                    vatable: true,
                    whtApplicable: true,
                    category: 'Services',
                    daysBack: 6,
                },
                {
                    type: 'revenue',
                    subCategory: 'Sales',
                    customerName: 'St. Peter Primary School',
                    customerEmail: 'bursar@stpeter.edu.ng',
                    customerPhone: '+234 806 222 7788',
                    customerType: 'non-taxable',
                    description: 'Educational textbooks for pre-primary set',
                    amount: 185000,
                    vatable: false,
                    whtApplicable: false,
                    category: 'Sales',
                    daysBack: 9,
                },
                {
                    type: 'revenue',
                    subCategory: 'Sales',
                    customerName: 'Adebayo Farms',
                    customerEmail: 'info@adebayofarms.ng',
                    customerType: 'non-taxable',
                    description: 'Basic food items supply',
                    amount: 420000,
                    vatable: false,
                    whtApplicable: false,
                    category: 'Sales',
                    daysBack: 12,
                },
                {
                    type: 'expense',
                    customerName: 'Kano Logistics PLC',
                    customerEmail: 'finance@kanologistics.com',
                    customerPhone: '+234 802 009 1122',
                    customerType: 'corporate',
                    description: 'Warehouse rent for March',
                    amount: 2000000,
                    vatable: false,
                    whtApplicable: false,
                    category: 'Rent',
                    daysBack: 18,
                },
                {
                    type: 'expense',
                    customerName: 'Eko Power Distribution',
                    customerPhone: '+234 815 444 3322',
                    customerType: 'corporate',
                    description: 'Electricity and backup fuel',
                    amount: 320000,
                    vatable: false,
                    whtApplicable: false,
                    category: 'Utilities',
                    daysBack: 24,
                },
                {
                    type: 'revenue',
                    subCategory: 'Service Income',
                    customerName: 'Abuja Fintech Ltd',
                    customerEmail: 'ops@abujafintech.ng',
                    customerType: 'corporate',
                    description: 'Software licence renewal',
                    amount: 980000,
                    vatable: true,
                    whtApplicable: false,
                    category: 'Services',
                    daysBack: 40,
                },
            ];

            const newTransactions: Transaction[] = [];
            const newReceipts: Receipt[] = [];

            samples.forEach((sample, index) => {
                const date = mk(sample.daysBack);
                const calc = calculateTransactionTax({
                    amount: sample.amount,
                    customerType: sample.customerType,
                    vatable: sample.vatable,
                    whtApplicable: sample.whtApplicable,
                    category: sample.category,
                    transactionType: sample.type,
                });
                const id = `sample_txn_${index}_${Date.now()}`;
                const receiptId = `sample_rcpt_${index}_${Date.now()}`;
                newTransactions.push({
                    id,
                    receiptId,
                    date,
                    type: sample.type,
                    subCategory: sample.subCategory,
                    debitCreditFlag: getDebitCreditLabel(sample.type),
                    customerName: sample.customerName,
                    customerEmail: sample.customerEmail,
                    customerPhone: sample.customerPhone,
                    customerType: sample.customerType,
                    description: sample.description,
                    amount: sample.amount,
                    vatable: sample.vatable,
                    whtApplicable: sample.whtApplicable,
                    vatAmount: calc.vatAmount,
                    whtAmount: calc.whtAmount,
                    netAmount: calc.netAmount,
                    category: sample.category,
                    taxYear: new Date(date).getFullYear(),
                    creditNoteGenerated: calc.whtAmount > 0,
                });
                newReceipts.push({
                    id: receiptId,
                    receiptNumber: `STX-${new Date(date).getFullYear()}-${String(10000 + index).padStart(5, '0')}`,
                    transactionId: id,
                    createdAt: date,
                    sentViaEmail: index % 2 === 0,
                    sentViaWhatsApp: false,
                });
            });

            return {
                ...current,
                transactions: [...newTransactions, ...current.transactions],
                receipts: [...newReceipts, ...current.receipts],
            };
        });
    }, []);

    return {
        state,
        hydrated,
        updateProfile,
        addTransaction,
        deleteTransaction,
        markReceiptSent,
        addTaxReturn,
        addReminder,
        toggleReminder,
        deleteReminder,
        reset,
        loadSampleData,
    };
}
