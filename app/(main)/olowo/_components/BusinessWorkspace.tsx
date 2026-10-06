'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

type BusinessMembership = {
    role: string;
    business: {
        id: string;
        name: string;
        businessType: string | null;
        currency: string;
    };
};

type BusinessResponse = BusinessMembership['business'] & {
    id: string;
};

type ApiError = {
    error?: string;
};

export function BusinessWorkspace() {
    const [businesses, setBusinesses] = useState<BusinessMembership[]>([]);
    const [name, setName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [needsSignIn, setNeedsSignIn] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function loadBusinesses() {
            setLoading(true);
            setError('');
            try {
                const response = await fetch('/api/businesses', {
                    cache: 'no-store',
                    signal: controller.signal,
                });
                const payload = (await response.json()) as BusinessMembership[] | ApiError;
                if (response.status === 401) {
                    setNeedsSignIn(true);
                    return;
                }
                if (!response.ok || !Array.isArray(payload)) {
                    throw new Error((payload as ApiError).error || 'Unable to load businesses.');
                }
                setNeedsSignIn(false);
                setBusinesses(payload);
            } catch (loadError) {
                if (loadError instanceof Error && loadError.name === 'AbortError') return;
                setError(loadError instanceof Error ? loadError.message : 'Unable to load businesses.');
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        void loadBusinesses();
        return () => controller.abort();
    }, []);

    async function createBusiness(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setNotice('');
        setCreating(true);

        try {
            const response = await fetch('/api/businesses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    businessType: businessType.trim() || undefined,
                }),
            });
            const payload = (await response.json()) as BusinessResponse | ApiError;
            if (response.status === 401) {
                setNeedsSignIn(true);
                return;
            }
            if (!response.ok || !('id' in payload)) {
                throw new Error((payload as ApiError).error || 'Unable to create business.');
            }

            setBusinesses((current) => [
                ...current,
                {
                    role: 'OWNER',
                    business: payload,
                },
            ]);
            setName('');
            setBusinessType('');
            setNotice('Business created. Olowo saved your owner membership and audit record.');
        } catch (createError) {
            setError(createError instanceof Error ? createError.message : 'Unable to create business.');
        } finally {
            setCreating(false);
        }
    }

    return (
        <>
            <Navigation />
            <main id="main-content" className="min-h-screen bg-slate-50 py-12">
                <div className="page-container max-w-5xl">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Olowo Business OS</p>
                        <h1 className="mt-2 text-3xl font-bold text-slate-900">Your businesses</h1>
                        <p className="mt-2 max-w-2xl text-slate-600">
                            Set up a business workspace. Business access is derived from your signed-in account, not from a user ID supplied by the browser.
                        </p>
                    </div>

                    {needsSignIn ? (
                        <section className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Sign in to continue</h2>
                            <p className="mt-2 text-slate-600">Sign in or create an account before setting up a business.</p>
                            <Link href="/login" className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">
                                Go to sign in
                            </Link>
                        </section>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Business workspaces</h2>
                                {loading ? (
                                    <p className="mt-4 text-sm text-slate-600" role="status">Loading your businesses…</p>
                                ) : businesses.length === 0 ? (
                                    <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                                        No business workspaces yet. Create one to get started.
                                    </p>
                                ) : (
                                    <ul className="mt-4 divide-y divide-slate-100">
                                        {businesses.map(({ business, role }) => (
                                            <li key={business.id} className="py-4 first:pt-0 last:pb-0">
                                                <h3 className="font-semibold text-slate-900">{business.name}</h3>
                                                <p className="mt-1 text-sm text-slate-600">
                                                    {business.businessType || 'Business type not set'} · {role} · {business.currency}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Add a business</h2>
                                <form className="mt-4 space-y-4" onSubmit={createBusiness}>
                                    <div>
                                        <label htmlFor="business-name" className="mb-1 block text-sm font-medium text-slate-700">
                                            Business name
                                        </label>
                                        <input
                                            id="business-name"
                                            name="name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            maxLength={120}
                                            required
                                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="business-type" className="mb-1 block text-sm font-medium text-slate-700">
                                            Business type <span className="font-normal text-slate-500">(optional)</span>
                                        </label>
                                        <input
                                            id="business-type"
                                            name="businessType"
                                            value={businessType}
                                            onChange={(event) => setBusinessType(event.target.value)}
                                            maxLength={80}
                                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={creating || loading || !name.trim()}
                                        className="w-full rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {creating ? 'Creating…' : 'Create business'}
                                    </button>
                                </form>
                            </section>
                        </div>
                    )}

                    {error && (
                        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                            {error}
                        </p>
                    )}
                    {notice && (
                        <p className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
                            {notice}
                        </p>
                    )}

                    <p className="mt-8 text-sm text-slate-500">
                        This is the Olowo workspace foundation. Connected sales, product, inventory, and finance workflows are not yet available here.
                    </p>
                </div>
            </main>
        </>
    );
}
