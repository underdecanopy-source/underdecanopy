'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import {
    LayoutDashboard,
    Receipt,
    FileText,
    BarChart3,
    Bell,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ShieldCheck,
    Wallet,
} from 'lucide-react';

const items = [
    { href: '/smarttax/demo', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/smarttax/demo/transactions', label: 'Transactions', icon: Wallet },
    { href: '/smarttax/demo/receipts', label: 'Receipts', icon: Receipt },
    { href: '/smarttax/demo/tax-returns', label: 'Tax Returns', icon: FileText },
    { href: '/smarttax/demo/reports', label: 'Reports', icon: BarChart3 },
    { href: '/smarttax/demo/reminders', label: 'Reminders', icon: Bell },
    { href: '/smarttax/demo/settings', label: 'Settings', icon: Settings },
];

export function DemoShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Mobile top bar */}
            <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/smarttax" className="flex items-center gap-2 text-blue-900 font-bold">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-sm">SmartTax</span>
                    </Link>
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setOpen((v) => !v)}
                        className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 shadow-sm transform transition-transform lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div className="flex flex-col h-full">
                    <Link
                        href="/smarttax"
                        className="flex items-center gap-3 px-5 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-900 to-indigo-900 text-white"
                    >
                        <ShieldCheck className="h-7 w-7 text-orange-400" />
                        <div>
                            <div className="text-base font-bold leading-tight">SmartTax</div>
                            <div className="text-xs text-blue-200 leading-tight">Receipts &amp; Filing</div>
                        </div>
                    </Link>
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {items.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        active
                                            ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-600 pl-2'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-blue-800'
                                    }`}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700 mb-1">Demo Mode</p>
                        <p>
                            Data is stored locally in your browser. Nothing is sent to a server. Clear storage in
                            <span className="font-medium"> Settings</span> to reset.
                        </p>
                    </div>
                </div>
            </aside>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    aria-hidden="true"
                />
            )}

            <main className="lg:pl-64">
                <div className="px-4 md:px-8 py-6 md:py-8 max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
