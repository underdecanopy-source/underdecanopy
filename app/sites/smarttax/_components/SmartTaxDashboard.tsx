"use client";

import { useState } from "react";
import { Download, Mail, Printer, Share2, X } from "lucide-react";
import { exportReceiptAsPDF } from "./exportReceiptAsPDF";
import { useSmartTaxStore } from "../../../(main)/smarttax/demo/_lib/store";

type Transaction = {
  id: string;
  type: "revenue" | "expense";
  amount: number;
  date: string;
  description: string;
  reference: string;
  subCategory?: string;
  vatAmount?: number;
  whtAmount?: number;
  netAmount?: number;
};

const initialTransactions: Transaction[] = [
  {
    id: "1",
    type: "revenue",
    amount: 1500000,
    date: "2024-01-15",
    description: "Consulting Services",
    reference: "INV-001",
    subCategory: "Service Income",
    vatAmount: 112500,
    whtAmount: 0,
    netAmount: 1612500,
  },
  {
    id: "2",
    type: "expense",
    amount: 300000,
    date: "2024-02-10",
    description: "Office Supplies",
    reference: "EXP-001",
    vatAmount: 0,
    whtAmount: 15000,
    netAmount: 285000,
  },
  {
    id: "3",
    type: "revenue",
    amount: 2500000,
    date: "2024-03-05",
    description: "Software Development",
    reference: "INV-002",
    subCategory: "Service Income",
    vatAmount: 187500,
    whtAmount: 0,
    netAmount: 2687500,
  },
  {
    id: "4",
    type: "expense",
    amount: 800000,
    date: "2024-04-20",
    description: "Rent & Utilities",
    reference: "EXP-002",
    vatAmount: 0,
    whtAmount: 80000,
    netAmount: 720000,
  },
];

export function SmartTaxDashboard() {
  const { state, updateSettings } = useSmartTaxStore();
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);

  const taxRate = state.settings.profitTaxRatePercent;

  const annualRevenue = transactions
    .filter((transaction) => transaction.type === "revenue")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const profitBeforeTax = annualRevenue - totalExpenses;
  const taxation = profitBeforeTax > 0 ? (profitBeforeTax * taxRate) / 100 : 0;
  const profitAfterTax = profitBeforeTax - taxation;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);

  const buildReceiptShareText = (receipt: Transaction) => {
    const lines = [
      "SmartTax Receipt",
      `Reference: ${receipt.reference}`,
      `Date: ${receipt.date}`,
      `Transaction Type: ${receipt.type === "revenue" ? "Revenue" : "Expense"}`,
      receipt.subCategory ? `Category: ${receipt.subCategory}` : null,
      `Description: ${receipt.description}`,
      `Subtotal: ${formatCurrency(receipt.amount)}`,
      receipt.vatAmount ? `VAT Credit: ${formatCurrency(receipt.vatAmount)}` : null,
      receipt.whtAmount ? `WHT Credit: ${formatCurrency(receipt.whtAmount)}` : null,
      `${receipt.type === "revenue" ? "Net Amount to Credit" : "Net Amount Going Out"}: ${formatCurrency(
        receipt.netAmount ?? receipt.amount
      )}`,
    ];

    return lines.filter(Boolean).join("\n");
  };

  const handlePrint = () => {
    const node = document.getElementById("receipt-print-area");
    if (!node || !selectedReceipt) return;
    exportReceiptAsPDF(node, `receipt-${selectedReceipt.reference}.pdf`);
  };

  const handleWhatsApp = () => {
    if (!selectedReceipt) return;
    const text = encodeURIComponent(buildReceiptShareText(selectedReceipt));
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    if (!selectedReceipt) return;
    const subject = encodeURIComponent(`Receipt - ${selectedReceipt.reference}`);
    const body = encodeURIComponent(buildReceiptShareText(selectedReceipt));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const handlePDF = () => {
    const node = document.getElementById("receipt-print-area");
    if (!node) return;
    exportReceiptAsPDF(node);
  };

  return (
    <div className="w-full">
      <div className="print:hidden space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Financial Dashboard</h2>
          <div className="flex items-center space-x-2 rounded-lg border bg-white p-2 shadow-sm">
            <label className="text-sm font-medium text-gray-500">Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(event) =>
                updateSettings({
                  profitTaxRatePercent: Number.isFinite(event.target.valueAsNumber)
                    ? Math.max(0, event.target.valueAsNumber)
                    : 0,
                })
              }
              className="w-16 rounded border p-1 text-right"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <MetricCard title="Annual Revenue" amount={annualRevenue} formatCurrency={formatCurrency} />
          <MetricCard title="Expenses" amount={totalExpenses} formatCurrency={formatCurrency} />
          <MetricCard title="Profit/Loss Before Tax" amount={profitBeforeTax} formatCurrency={formatCurrency} />
          <MetricCard title="Taxation" amount={taxation} formatCurrency={formatCurrency} />
          <MetricCard title="Profit/(Loss) After Tax" amount={profitAfterTax} formatCurrency={formatCurrency} />
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Reference</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Description</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 text-right font-medium">Amount</th>
                  <th className="px-6 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{transaction.reference}</td>
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.type === "revenue"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-semibold ${
                        transaction.type === "revenue" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "revenue" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedReceipt(transaction)}
                        className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
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

      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:block print:bg-transparent print:p-0">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl print:w-full print:max-w-none print:shadow-none">
            <div className="flex items-center justify-between border-b bg-gray-50 p-4 print:hidden">
              <h3 className="text-lg font-semibold">Receipt Actions</h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="rounded-full p-1 transition-colors hover:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex justify-center gap-2 border-b bg-gray-50 p-4 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                <Printer className="h-4 w-4" /> Print
              </button>
              <button
                onClick={handlePDF}
                className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
              >
                <Download className="h-4 w-4" /> PDF
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#128C7E]"
              >
                <Share2 className="h-4 w-4" /> WhatsApp
              </button>
              <button
                onClick={handleEmail}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                <Mail className="h-4 w-4" /> Email
              </button>
            </div>

            <div className="bg-white p-8 print:p-0" id="receipt-print-area">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">SmartTax</h1>
                <p className="mt-1 text-sm text-gray-500">Official Transaction Receipt</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-gray-500">Reference No.</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.reference}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-gray-500">Transaction Type</span>
                  <span className="font-medium capitalize text-gray-900">
                    {selectedReceipt.type === "revenue" ? "Revenue" : "Expense"}
                    {selectedReceipt.type === "revenue" && selectedReceipt.subCategory ? (
                      <span className="ml-2 text-xs text-blue-600">({selectedReceipt.subCategory})</span>
                    ) : null}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-gray-500">Description</span>
                  <span className="font-medium text-gray-900">{selectedReceipt.description}</span>
                </div>

                <div className="mt-8 flex flex-col gap-2 rounded-lg bg-gray-50 p-4 print:border print:border-gray-200 print:bg-transparent">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Subtotal</span>
                    <span className="font-mono">{formatCurrency(selectedReceipt.amount)}</span>
                  </div>
                  {selectedReceipt.vatAmount ? (
                    <div className="flex justify-between">
                      <span className="text-gray-700">VAT Credit (7.5%)</span>
                      <span className="font-mono">{formatCurrency(selectedReceipt.vatAmount)}</span>
                    </div>
                  ) : null}
                  {selectedReceipt.whtAmount ? (
                    <div className="flex justify-between">
                      <span className="text-gray-700">WHT Credit</span>
                      <span className="font-mono text-red-600">
                        -{formatCurrency(selectedReceipt.whtAmount)}
                      </span>
                    </div>
                  ) : null}
                  <div className="mt-2 flex justify-between border-t pt-2">
                    <span className="font-semibold text-gray-900">
                      {selectedReceipt.type === "revenue" ? "Net Amount to Credit" : "Net Amount Going Out"}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedReceipt.netAmount ?? selectedReceipt.amount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t pt-6 text-center print:mt-16">
                <p className="text-sm text-gray-500">Thank you for your business.</p>
                <p className="mt-1 text-xs text-gray-400">Generated by SmartTax Application</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  title,
  amount,
  formatCurrency,
}: {
  title: string;
  amount: number;
  formatCurrency: (value: number) => string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
    </div>
  );
}
