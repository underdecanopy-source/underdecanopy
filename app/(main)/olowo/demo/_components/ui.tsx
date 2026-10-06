import { ReactNode } from 'react';

export function PageHeader({
    title,
    description,
    actions,
}: {
    title: string;
    description?: string;
    actions?: ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
                {description && <p className="text-slate-600 mt-1 max-w-2xl">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
    );
}

export function StatCard({
    label,
    value,
    helper,
    tone = 'default',
}: {
    label: string;
    value: string;
    helper?: string;
    tone?: 'default' | 'blue' | 'green' | 'orange' | 'red';
}) {
    const tones = {
        default: 'bg-white border-slate-200',
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-emerald-50 border-emerald-200',
        orange: 'bg-orange-50 border-orange-200',
        red: 'bg-rose-50 border-rose-200',
    };
    return (
        <div className={`rounded-lg border p-5 ${tones[tone]}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            {helper && <p className="text-xs text-slate-500 mt-2">{helper}</p>}
        </div>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="bg-white border border-dashed border-slate-300 rounded-lg p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
