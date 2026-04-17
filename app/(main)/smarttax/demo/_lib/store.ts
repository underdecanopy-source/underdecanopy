'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Profile, Reminder, Receipt, SmartTaxState, TaxReturn, Transaction } from './types';

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
            description: 'File VAT return for this month with FIRS (TaxPro-Max).',
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
        return JSON.parse(raw) as SmartTaxState;
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
        setState((s) => ({ ...s, profile: { ...s.profile, ...profile } }));
    }, []);

    const addTransaction = useCallback((input: Omit<Transaction, 'id' | 'receiptId' | 'date'> & { date?: string }) => {
        const id = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const receiptNumber = `STX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
        const date = input.date ?? new Date().toISOString();
        const txn: Transaction = { ...input, id, receiptId, date };
        const receipt: Receipt = {
            id: receiptId,
            receiptNumber,
            transactionId: id,
            createdAt: new Date().toISOString(),
            sentViaEmail: false,
            sentViaSms: false,
            sentViaWhatsApp: false,
        };
        setState((s) => ({ ...s, transactions: [txn, ...s.transactions], receipts: [receipt, ...s.receipts] }));
        return { txn, receipt };
    }, []);

    const deleteTransaction = useCallback((txnId: string) => {
        setState((s) => ({
            ...s,
            transactions: s.transactions.filter((t) => t.id !== txnId),
            receipts: s.receipts.filter((r) => r.transactionId !== txnId),
        }));
    }, []);

    const markReceiptSent = useCallback((receiptId: string, channel: 'email' | 'sms' | 'whatsapp') => {
        setState((s) => ({
            ...s,
            receipts: s.receipts.map((r) =>
                r.id === receiptId
                    ? {
                        ...r,
                        sentViaEmail: channel === 'email' ? true : r.sentViaEmail,
                        sentViaSms: channel === 'sms' ? true : r.sentViaSms,
                        sentViaWhatsApp: channel === 'whatsapp' ? true : r.sentViaWhatsApp,
                    }
                    : r
            ),
        }));
    }, []);

    const addTaxReturn = useCallback((input: Omit<TaxReturn, 'id' | 'createdAt'>) => {
        const id = `ret_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const taxReturn: TaxReturn = { ...input, id, createdAt: new Date().toISOString() };
        setState((s) => ({ ...s, taxReturns: [taxReturn, ...s.taxReturns] }));
        return taxReturn;
    }, []);

    const addReminder = useCallback((input: Omit<Reminder, 'id' | 'createdAt' | 'isCompleted'>) => {
        const reminder: Reminder = {
            ...input,
            id: `rem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString(),
            isCompleted: false,
        };
        setState((s) => ({ ...s, reminders: [...s.reminders, reminder] }));
        return reminder;
    }, []);

    const toggleReminder = useCallback((id: string) => {
        setState((s) => ({
            ...s,
            reminders: s.reminders.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r)),
        }));
    }, []);

    const deleteReminder = useCallback((id: string) => {
        setState((s) => ({ ...s, reminders: s.reminders.filter((r) => r.id !== id) }));
    }, []);

    const reset = useCallback(() => {
        setState(resetState());
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
    };
}
