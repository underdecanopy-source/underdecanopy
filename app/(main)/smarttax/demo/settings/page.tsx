'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { PageHeader } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';
import type { Profile, TaxSettings } from '../_lib/types';
import { AlertTriangle, Save, Trash2 } from 'lucide-react';

const NG_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

export default function SettingsPage() {
    const { state, hydrated, updateProfile, updateSettings, reset } = useSmartTaxStore();
    const [form, setForm] = useState<Profile>(state.profile);
    const [taxForm, setTaxForm] = useState<TaxSettings>(state.settings);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!hydrated) return;
        setForm(state.profile);
        setTaxForm(state.settings);
    }, [hydrated, state.profile, state.settings]);

    function handleSave(e: FormEvent) {
        e.preventDefault();
        updateProfile(form);
        updateSettings({
            profitTaxRatePercent: Number.isFinite(taxForm.profitTaxRatePercent)
                ? Math.max(0, taxForm.profitTaxRatePercent)
                : 0,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    function handleReset() {
        if (typeof window === 'undefined') return;
        if (window.confirm('Reset all demo data? This clears transactions, receipts, returns, and reminders.')) {
            reset();
        }
    }

    return (
        <>
            <PageHeader
                title="Settings"
                description="Configure your business profile and the tax rule used for profit-before-tax reporting."
            />

            <form
                onSubmit={handleSave}
                className="bg-white border border-slate-200 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
                <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Business / Trading Name</span>
                    <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Full Name</span>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Phone</span>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Tax Identification Number (TIN)</span>
                    <input
                        type="text"
                        value={form.tin}
                        onChange={(e) => setForm({ ...form, tin: e.target.value })}
                        placeholder="e.g. 12345678-0001"
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">VAT Registration Number</span>
                    <input
                        type="text"
                        value={form.vatNumber || ''}
                        onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
                        placeholder="VAT Reg No from TaxPro Max"
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Business Address</span>
                    <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">State (IRS jurisdiction)</span>
                    <select
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {NG_STATES.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </label>
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Business Type</span>
                    <select
                        value={form.businessType}
                        onChange={(e) =>
                            setForm({ ...form, businessType: e.target.value as Profile['businessType'] })
                        }
                        className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="individual">Individual / Freelancer</option>
                        <option value="sole-proprietor">Sole Proprietor</option>
                        <option value="corporate">Corporate / Limited Liability</option>
                    </select>
                </label>

                <div className="md:col-span-2 border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <h2 className="font-semibold text-slate-800">Profit Tax Rule</h2>
                    <p className="text-sm text-slate-600 mt-1">
                        Set the percentage applied to positive profit before tax. Enter <strong>0%</strong> if the
                        current rule results in no tax.
                    </p>
                    <label className="block mt-4 max-w-sm">
                        <span className="text-sm font-medium text-slate-700">Tax Rule Percentage (%)</span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={taxForm.profitTaxRatePercent}
                            onChange={(e) =>
                                setTaxForm({
                                    profitTaxRatePercent: Number.isFinite(e.target.valueAsNumber)
                                        ? Math.max(0, e.target.valueAsNumber)
                                        : 0,
                                })
                            }
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>

                <div className="md:col-span-2 flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
                    >
                        <Save className="h-4 w-4" /> Save Settings
                    </button>
                    {saved && <span className="text-sm text-emerald-700 font-medium">Settings saved.</span>}
                </div>
            </form>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h2 className="font-semibold text-slate-800">Reset Demo Data</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Clears all locally stored transactions, receipts, tax returns, and reminders from this
                            browser. Useful if you want to start the demo fresh.
                        </p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-rose-700"
                    >
                        <Trash2 className="h-4 w-4" /> Reset
                    </button>
                </div>
            </div>
        </>
    );
}
