"use client";

import React, { useState } from "react";
import { Printer, Download, Mail, Share2, Plus, X } from "lucide-react";

type Transaction = {
  id: string;
  type: "revenue" | "expense";
  amount: number;
  date: string;
  description: string;
  reference: string;
};

const initialTransactions: Transaction[] = [
  { id: "1", type: "revenue", amount: 1500000, date: "2024-01-15", description: "Consulting Services", reference: "INV-001" },
  { id: "2", type: "expense", amount: 300000, date: "2024-02-10", description: "Office Supplies", reference: "EXP-001" },
  { id: "3", type: "revenue", amount: 2500000, date: "2024-03-05", description: "Software Development", reference: "INV-002" },
  { id: "4", type: "expense", amount: 800000, date: "2024-04-20", description: "Rent & Utilities", reference: "EXP-002" },
];

export function SmartTaxDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [taxRate, setTaxRate] = useState<number>(30); // 30% default
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);

  // Calculations
  const annualRevenue = transactions
    .filter((t) => t.type === "revenue")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const profitBeforeTax = annualRevenue - totalExpenses;
  const taxation = profitBeforeTax > 0 ? (profitBeforeTax * taxRate) / 100 : 0;
  const profitAfterTax = profitBeforeTax - taxation;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = (receipt: Transaction) => {
    const text = `Receipt Reference: ${receipt.reference}%0AAmount: ${formatCurrency(receipt.amount)}%0ADate: ${receipt.date}%0ADescription: ${receipt.description}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleEmail = (receipt: Transaction) => {
    const subject = `Receipt - ${receipt.reference}`;
    const body = `Receipt Reference: ${receipt.reference}%0AAmount: ${formatCurrency(receipt.amount)}%0ADate: ${receipt.date}%0ADescription: ${receipt.description}`;
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* Dashboard Area - Hidden when printing */}
      <div className="print:hidden space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Financial Dashboard</h2>
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
            <label className="text-sm font-medium text-gray-500">Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-16 p-1 border rounded text-right"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard title="Annual Revenue" amount={annualRevenue} isPositive={true} formatCurrency={formatCurrency} />
          <MetricCard title="Expenses" amount={totalExpenses} isPositive={false} formatCurrency={formatCurrency} />
          <MetricCard title="Profit/Loss Before Tax" amount={profitBeforeTax} isPositive={profitBeforeTax >= 0} formatCurrency={formatCurrency} />
          <MetricCard title="Taxation" amount={taxation} isPositive={false} formatCurrency={formatCurrency} />
          <MetricCard title="Profit/(Loss) After Tax" amount={profitAfterTax} isPositive={profitAfterTax >= 0} formatCurrency={formatCurrency} />
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            {/* Add transaction button could go here */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Reference</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                  <th className="px-6 py-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{tx.reference}</td>
                    <td className="px-6 py-4">{tx.date}</td>
                    <td className="px-6 py-4">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tx.type === "revenue" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${tx.type === "revenue" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "revenue" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedReceipt(tx)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Receipt Modal & Print Area */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 print:bg-transparent print:p-0 print:block">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden print:shadow-none print:w-full print:max-w-none">
            
            {/* Modal Header - Hidden on Print */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 print:hidden">
              <h3 className="font-semibold text-lg">Receipt Actions</h3>
              <button onClick={() => setSelectedReceipt(null)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Actions Toolbar - Hidden on Print */}
            <div className="flex gap-2 p-4 bg-gray-50 print:hidden border-b justify-center">
              <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 bg-white border shadow-sm rounded-lg hover:bg-gray-50 text-sm font-medium">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-2 bg-white border shadow-sm rounded-lg hover:bg-gray-50 text-sm font-medium">
                <Download className="w-4 h-4" /> PDF
              </button>
              <button onClick={() => handleWhatsApp(selectedReceipt)} className="flex items-center gap-2 px-3 py-2 bg-[#25D366] text-white shadow-sm rounded-lg hover:bg-[#128C7E] text-sm font-medium">
                <Share2 className="w-4 h-4" /> WhatsApp
              </button>
              <button onClick={() => handleEmail(selectedReceipt)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white shadow-sm rounded-lg hover:bg-blue-700 text-sm font-medium">
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>

            {/* Actual Receipt - Visible on Print */}
            <div className="p-8 print:p-0 bg-white" id="receipt-print-area">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">SmartTax</h1>
                <p className="text-gray-500 text-sm mt-1">Official Transaction Receipt</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Reference No.</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.reference}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Date</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Transaction Type</span>
                  <span className="font-medium text-gray-900 capitalize">{selectedReceipt.type}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 text-sm">Description</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.description}</span>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg flex justify-between items-center print:bg-transparent print:border print:border-gray-200">
                  <span className="font-semibold text-gray-700">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(selectedReceipt.amount)}</span>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t text-center print:mt-16">
                <p className="text-sm text-gray-500">Thank you for your business.</p>
                <p className="text-xs text-gray-400 mt-1">Generated by SmartTax Application</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, amount, isPositive, formatCurrency }: { title: string; amount: number; isPositive: boolean, formatCurrency: (v: number) => string }) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-2 ${isPositive ? "text-gray-900" : "text-gray-900"}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  );
}
