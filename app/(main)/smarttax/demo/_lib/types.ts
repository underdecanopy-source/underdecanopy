export interface Profile {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    tin: string;
    vatNumber?: string;
    address: string;
    state: string;
    businessType: 'individual' | 'sole-proprietor' | 'corporate';
}

export interface TaxSettings {
    profitTaxRatePercent: number;
}

export type CustomerType = 'individual' | 'company' | 'government' | 'ngo' | 'partnership' | 'foreign-entity';


export interface Transaction {
    id: string;
    date: string;
    type: 'expense' | 'revenue'; // Explicit classification
    subCategory?: 'Sales' | 'Service Income' | string; // Subtype for revenue/expense
    debitCreditFlag: 'debit' | 'credit';
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerType: CustomerType;
    description: string;
    amount: number;
    vatable: boolean;
    whtApplicable: boolean;
    vatAmount: number;
    whtPercentage: number;
    netAmount: number;
    receiptId: string;
    category?: string;
    taxYear: number;
    creditNoteGenerated: boolean;
}

export interface Receipt {
    id: string;
    receiptNumber: string;
    transactionId: string;
    createdAt: string;
    sentViaEmail: boolean;
    sentViaWhatsApp: boolean;
}

export interface TaxReturn {
    id: string;
    returnType: 'VAT' | 'PIT' | 'WHT' | 'CIT';
    filingPeriod: string;
    totalIncome: number;
    totalVatCredit: number;
    totalWhtCredit: number;
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
    settings: TaxSettings;
    transactions: Transaction[];
    receipts: Receipt[];
    taxReturns: TaxReturn[];
    reminders: Reminder[];
    initialized: boolean;
}
