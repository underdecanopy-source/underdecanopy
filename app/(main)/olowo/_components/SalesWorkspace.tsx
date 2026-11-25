'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type FormEvent } from 'react';

type Warehouse = { id: string; name: string };
type Product = {
    id: string;
    name: string;
    sellingPrice: string | number;
    stockByWarehouse: { warehouseId: string; quantity: string }[];
};
type Customer = { id: string; name: string };
type SaleLine = { id: string; description: string; quantity: string | number; unitPrice: string | number; lineTotal: string | number };
type Payment = { id: string; amount: string | number; method: string; receivedAt: string };
type Sale = {
    id: string;
    reference: string;
    status: string;
    paymentStatus: string;
    subtotal: string | number;
    discountAmount: string | number;
    taxAmount: string | number;
    totalAmount: string | number;
    occurredAt: string;
    customer: { id: string; name: string } | null;
    warehouse: { id: string; name: string };
    items: SaleLine[];
    payments: Payment[];
};
type SalePayload = { sale: Sale };
type ApiError = { error?: string };

type LineInput = { productId: string; quantity: string };

export function SalesWorkspace({ businessId }: { businessId: string }) {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);
    const [businessName, setBusinessName] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [lines, setLines] = useState<LineInput[]>([{ productId: '', quantity: '1' }]);
    const [discountAmount, setDiscountAmount] = useState('0');
    const [paymentAmount, setPaymentAmount] = useState('0');
    const [paymentMethod, setPaymentMethod] = useState('CASH');
    const [collectingSaleId, setCollectingSaleId] = useState('');
    const [collectionAmount, setCollectionAmount] = useState('');
    const [collectionMethod, setCollectionMethod] = useState('CASH');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    const loadWorkspace = useCallback(async (signal?: AbortSignal) => {
        const [inventoryResponse, customersResponse, salesResponse] = await Promise.all([
            fetch(`/api/businesses/${encodeURIComponent(businessId)}/inventory`, { cache: 'no-store', signal }),
            fetch(`/api/businesses/${encodeURIComponent(businessId)}/customers`, { cache: 'no-store', signal }),
            fetch(`/api/businesses/${encodeURIComponent(businessId)}/sales`, { cache: 'no-store', signal }),
        ]);
        const [inventoryPayload, customersPayload, salesPayload] = await Promise.all([
            inventoryResponse.json(),
            customersResponse.json(),
            salesResponse.json(),
        ]);
        if (inventoryResponse.status === 401 || customersResponse.status === 401 || salesResponse.status === 401) {
            throw new Error('Sign in to manage this business sales.');
        }
        if (!inventoryResponse.ok) throw new Error((inventoryPayload as ApiError).error || 'Unable to load inventory.');
        if (!customersResponse.ok) throw new Error((customersPayload as ApiError).error || 'Unable to load customers.');
        if (!salesResponse.ok) throw new Error((salesPayload as ApiError).error || 'Unable to load sales.');

        const inventory = inventoryPayload as { business: { name: string }; warehouses: Warehouse[]; products: Product[] };
        setBusinessName(inventory.business.name);
        setWarehouses(inventory.warehouses);
        setProducts(inventory.products);
        setCustomers(customersPayload as Customer[]);
        setSales(salesPayload as Sale[]);
        setWarehouseId((current) => current || inventory.warehouses[0]?.id || '');
    }, [businessId]);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError('');
        void loadWorkspace(controller.signal)
            .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.name === 'AbortError' ? '' : loadError.message : 'Unable to load sales workspace'))
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [loadWorkspace]);

    function updateLine(index: number, field: keyof LineInput, value: string) {
        setLines((current) => current.map((line, lineIndex) => lineIndex === index ? { ...line, [field]: value } : line));
    }

    function addLine() {
        setLines((current) => [...current, { productId: '', quantity: '1' }]);
    }

    function removeLine(index: number) {
        setLines((current) => current.length === 1 ? current : current.filter((_, lineIndex) => lineIndex !== index));
    }

    async function recordFollowOnPayment(sale: Sale) {
        const amount = Number(collectionAmount);
        if (!Number.isFinite(amount) || amount <= 0) {
            setError('Enter a valid payment amount.');
            return;
        }
        setSaving(true);
        setError('');
        setNotice('');
        try {
            const response = await fetch(
                `/api/businesses/${encodeURIComponent(businessId)}/sales/${encodeURIComponent(sale.id)}/payments`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount,
                        method: collectionMethod,
                        idempotencyKey: crypto.randomUUID(),
                    }),
                },
            );
            const payload = await response.json() as {
                paymentStatus?: string;
                replayed?: boolean;
                error?: string;
            };
            if (!response.ok) throw new Error(payload.error || 'Unable to record payment.');
            await loadWorkspace();
            setCollectingSaleId('');
            setCollectionAmount('');
            setNotice(`Payment recorded successfully. Payment status: ${payload.paymentStatus}.`);
        } catch (paymentError) {
            setError(paymentError instanceof Error ? paymentError.message : 'Unable to record payment.');
        } finally {
            setSaving(false);
        }
    }

    async function recordSale(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setNotice('');
        const discount = Number(discountAmount);
        const payment = Number(paymentAmount);
        if (payment < estimatedSubtotal - discount && !customerId) {
            setError('Select a customer for an unpaid or partially paid sale.');
            return;
        }

        setSaving(true);
        try {
            const idempotencyKey = crypto.randomUUID();
            const response = await fetch(`/api/businesses/${encodeURIComponent(businessId)}/sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    warehouseId,
                    customerId: customerId || undefined,
                    items: lines
                        .filter((line) => line.productId)
                        .map((line) => ({ productId: line.productId, quantity: Number(line.quantity) })),
                    discountAmount: Number(discountAmount),
                    paymentAmount: Number(paymentAmount),
                    paymentMethod,
                    idempotencyKey,
                }),
            });
            const payload = await response.json() as SalePayload | ApiError;
            if (!response.ok || !('sale' in payload)) {
                throw new Error((payload as ApiError).error || 'Unable to record sale.');
            }
            await loadWorkspace();
            setLines([{ productId: '', quantity: '1' }]);
            setCustomerId('');
            setDiscountAmount('0');
            setPaymentAmount('0');
            setNotice(`Sale ${payload.sale.reference} recorded successfully.`);
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to record sale.');
        } finally {
            setSaving(false);
        }
    }

    const estimatedSubtotal = lines.reduce((total, line) => {
        const product = products.find((item) => item.id === line.productId);
        return total + (product ? Number(product.sellingPrice) * Number(line.quantity || 0) : 0);
    }, 0);

    return (
        <main className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/olowo/businesses" className="text-sm font-semibold text-blue-700 hover:underline">
                    ← Your businesses
                </Link>
                <header className="mt-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Olowo sales workspace</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Sales and receipts</h1>
                    {businessName && <p className="mt-2 text-sm font-medium text-slate-700">Business: {businessName}</p>}
                </header>

                {loading ? (
                    <p className="mt-8 text-sm text-slate-600" role="status">Loading sales workspace…</p>
                ) : (
                    <div className="mt-8 grid gap-8 xl:grid-cols-[22rem_minmax(0,1fr)]">
                        <section className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Record a sale</h2>
                            <form className="mt-4 space-y-4" onSubmit={recordSale}>
                                <div>
                                    <label htmlFor="warehouse" className="mb-1 block text-sm font-medium text-slate-700">Warehouse</label>
                                    <select
                                        id="warehouse"
                                        value={warehouseId}
                                        onChange={(event) => setWarehouseId(event.target.value)}
                                        required
                                        className="w-full rounded-md border border-slate-300 px-3 py-2"
                                    >
                                        {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="customer" className="mb-1 block text-sm font-medium text-slate-700">Customer</label>
                                    <select
                                        id="customer"
                                        value={customerId}
                                        onChange={(event) => setCustomerId(event.target.value)}
                                        className="w-full rounded-md border border-slate-300 px-3 py-2"
                                    >
                                        <option value="">Walk-in / no customer</option>
                                        {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                                    </select>
                                </div>
                                <fieldset className="space-y-3">
                                    <legend className="text-sm font-medium text-slate-700">Sale items</legend>
                                    {lines.map((line, index) => (
                                        <div key={index} className="grid grid-cols-[minmax(0,1fr)_5.5rem_2rem] gap-2">
                                            <select
                                                aria-label={`Product ${index + 1}`}
                                                value={line.productId}
                                                onChange={(event) => updateLine(index, 'productId', event.target.value)}
                                                required
                                                className="min-w-0 rounded-md border border-slate-300 px-2 py-2"
                                            >
                                                <option value="">Choose product</option>
                                                {products.map((product) => {
                                                    const stock = product.stockByWarehouse.find((item) => item.warehouseId === warehouseId)?.quantity || '0';
                                                    return (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name} — ₦{Number(product.sellingPrice).toLocaleString()} ({stock} in stock)
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <input
                                                aria-label={`Quantity ${index + 1}`}
                                                type="number"
                                                min="0.001"
                                                step="0.001"
                                                value={line.quantity}
                                                onChange={(event) => updateLine(index, 'quantity', event.target.value)}
                                                required
                                                className="w-full rounded-md border border-slate-300 px-2 py-2"
                                            />
                                            <button type="button" onClick={() => removeLine(index)} aria-label={`Remove item ${index + 1}`} className="rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100">
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addLine} className="text-sm font-semibold text-blue-700 hover:underline">
                                        + Add item
                                    </button>
                                </fieldset>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="discount" className="mb-1 block text-sm font-medium text-slate-700">Discount (₦)</label>
                                        <input id="discount" type="number" min="0" step="0.01" value={discountAmount} onChange={(event) => setDiscountAmount(event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="payment" className="mb-1 block text-sm font-medium text-slate-700">Payment (₦)</label>
                                        <input id="payment" type="number" min="0" step="0.01" value={paymentAmount} onChange={(event) => setPaymentAmount(event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="payment-method" className="mb-1 block text-sm font-medium text-slate-700">Payment method</label>
                                    <select id="payment-method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
                                        <option value="CASH">Cash</option>
                                        <option value="BANK_TRANSFER">Bank transfer</option>
                                        <option value="POS">POS</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                                    Subtotal: <strong>₦{estimatedSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                                </p>
                                <button type="submit" disabled={saving || !warehouseId || lines.every((line) => !line.productId)} className="w-full rounded-md bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
                                    {saving ? 'Recording…' : 'Record sale'}
                                </button>
                            </form>
                        </section>

                        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Recent sales</h2>
                            {sales.length === 0 ? (
                                <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">No sales have been recorded for this business.</p>
                            ) : (
                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-slate-600">
                                                <th className="py-3 pr-4">Reference</th>
                                                <th className="py-3 pr-4">Customer</th>
                                                <th className="py-3 pr-4">Total</th>
                                                <th className="py-3 pr-4">Payment</th>
                                                <th className="py-3">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sales.map((sale) => (
                                                <tr key={sale.id} className="border-b border-slate-100 last:border-0">
                                                    <td className="py-3 pr-4 font-semibold text-slate-900">{sale.reference}</td>
                                                    <td className="py-3 pr-4 text-slate-700">{sale.customer?.name || 'Walk-in'}</td>
                                                    <td className="py-3 pr-4 text-slate-700">₦{Number(sale.totalAmount).toLocaleString()}</td>
                                                    <td className="py-3 pr-4">
                                                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{sale.paymentStatus}</span>
                                                        {sale.status === 'COMPLETED' && sale.paymentStatus !== 'PAID' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setCollectingSaleId((current) => current === sale.id ? '' : sale.id);
                                                                    setCollectionAmount('');
                                                                }}
                                                                className="ml-2 rounded-md border border-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                                                            >
                                                                Record payment
                                                            </button>
                                                        )}
                                                        {collectingSaleId === sale.id && (
                                                            <span className="mt-2 flex items-center gap-2">
                                                                <input
                                                                    aria-label={`Payment amount for ${sale.reference}`}
                                                                    type="number"
                                                                    min="0.01"
                                                                    step="0.01"
                                                                    value={collectionAmount}
                                                                    onChange={(event) => setCollectionAmount(event.target.value)}
                                                                    className="w-28 rounded-md border border-slate-300 px-2 py-1"
                                                                />
                                                                <select
                                                                    aria-label={`Payment method for ${sale.reference}`}
                                                                    value={collectionMethod}
                                                                    onChange={(event) => setCollectionMethod(event.target.value)}
                                                                    className="rounded-md border border-slate-300 px-2 py-1"
                                                                >
                                                                    <option value="CASH">Cash</option>
                                                                    <option value="BANK_TRANSFER">Bank transfer</option>
                                                                    <option value="POS">POS</option>
                                                                    <option value="OTHER">Other</option>
                                                                </select>
                                                                <button
                                                                    type="button"
                                                                    disabled={saving}
                                                                    onClick={() => void recordFollowOnPayment(sale)}
                                                                    className="rounded-md bg-emerald-700 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
                                                                >
                                                                    Save
                                                                </button>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 text-slate-600">{new Date(sale.occurredAt).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>
                )}

                {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
                {notice && <p className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">{notice}</p>}
            </div>
        </main>
    );
}
