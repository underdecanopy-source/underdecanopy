'use client';

import { useState, type FormEvent } from 'react';
import { Bell, Check, Plus, Trash2, X } from 'lucide-react';
import { EmptyState, PageHeader } from '../_components/ui';
import { useSmartTaxStore } from '../_lib/store';

export default function RemindersPage() {
    const { state, hydrated, addReminder, toggleReminder, deleteReminder } = useSmartTaxStore();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.title || !form.dueDate) return;
        addReminder({
            title: form.title.trim(),
            description: form.description.trim(),
            dueDate: new Date(form.dueDate).toISOString(),
        });
        setForm({ title: '', description: '', dueDate: '' });
        setShowForm(false);
    }

    const now = Date.now();
    const sorted = [...state.reminders].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    return (
        <>
            <PageHeader
                title="Reminders"
                description="Never miss a VAT, WHT, or annual filing deadline. Reminders are synced with the Nigerian Revenue Service calendar."
                actions={
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {showForm ? 'Close' : 'Add Reminder'}
                    </button>
                }
            />

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-slate-200 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    <label className="block md:col-span-1">
                        <span className="text-sm font-medium text-slate-700">Title *</span>
                        <input
                            required
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block md:col-span-1">
                        <span className="text-sm font-medium text-slate-700">Due Date *</span>
                        <input
                            required
                            type="date"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block md:col-span-1">
                        <span className="text-sm font-medium text-slate-700">Description</span>
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <div className="md:col-span-3 flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
                        >
                            Save Reminder
                        </button>
                    </div>
                </form>
            )}

            {!hydrated ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-slate-500">Loading...</div>
            ) : sorted.length === 0 ? (
                <EmptyState title="No reminders" description="Add a reminder to track your upcoming tax obligations." />
            ) : (
                <ul className="space-y-3">
                    {sorted.map((r) => {
                        const due = new Date(r.dueDate).getTime();
                        const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
                        const overdue = !r.isCompleted && daysLeft < 0;
                        const urgent = !r.isCompleted && daysLeft >= 0 && daysLeft <= 7;
                        const borderColor = r.isCompleted
                            ? 'border-slate-200 opacity-60'
                            : overdue
                              ? 'border-rose-300 bg-rose-50'
                              : urgent
                                ? 'border-orange-300 bg-orange-50'
                                : 'border-slate-200';
                        return (
                            <li
                                key={r.id}
                                className={`bg-white rounded-lg border ${borderColor} p-4 flex items-start gap-4`}
                            >
                                <button
                                    onClick={() => toggleReminder(r.id)}
                                    aria-label={r.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                                        r.isCompleted
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-slate-300 hover:border-emerald-500'
                                    }`}
                                >
                                    {r.isCompleted && <Check className="h-4 w-4" />}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Bell className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                        <h3
                                            className={`font-semibold text-slate-800 ${
                                                r.isCompleted ? 'line-through text-slate-400' : ''
                                            }`}
                                        >
                                            {r.title}
                                        </h3>
                                        {overdue && (
                                            <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                                OVERDUE
                                            </span>
                                        )}
                                        {urgent && (
                                            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                                DUE IN {daysLeft}d
                                            </span>
                                        )}
                                    </div>
                                    {r.description && <p className="text-sm text-slate-600 mt-1">{r.description}</p>}
                                    <p className="text-xs text-slate-500 mt-1">
                                        Due:{' '}
                                        {new Date(r.dueDate).toLocaleDateString('en-NG', {
                                            dateStyle: 'full',
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteReminder(r.id)}
                                    className="text-slate-400 hover:text-rose-600 p-1"
                                    aria-label="Delete reminder"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
