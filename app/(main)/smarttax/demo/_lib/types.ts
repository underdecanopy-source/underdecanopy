export interface Profile {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    tin: string;
    address: string;
    state: string;
    businessType: 'individual' | 'sole-proprietor' | 'corporate';
}

export type CustomerType = 'individual' | 'corporate' | 'non-taxable';

export interface Transaction {
    id: string;
    date: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerType: CustomerType;
    description: string;
    amount: number;
    vatable: boolean;
    whtApplicable: boolean;
    vatAmount: number;
    whtAmount: number;
    netAmount: number;
    receiptId: string;
    category?: string;
}

export interface Receipt {
    id: string;
    receiptNumber: string;
    transactionId: string;
    createdAt: string;
    sentViaEmail: boolean;
    sentViaSms: boolean;
    sentViaWhatsApp: boolean;
}

export interface TaxReturn {
    id: string;
    returnType: 'VAT' | 'PIT' | 'WHT' | 'CIT';
    filingPeriod: string;
    totalIncome: number;
    totalVatCollected: number;
    totalWhtDeducted: number;
    taxPayable: number;
    status: 'draft' | 'filed' | 'approved';
    filingDate?: string;
    createdAt: string;
}

export interface Reminder {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    createdAt: string;
}

export interface SmartTaxState {
    profile: Profile;
    transactions: Transaction[];
    receipts: Receipt[];
    taxReturns: TaxReturn[];
    reminders: Reminder[];
    initialized: boolean;
}
