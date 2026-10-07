'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type FormEvent } from 'react';

type Warehouse = { id: string; name: string; address: string | null };
type Product = {
    id: string;
    name: string;
    sku: string | null;
    unit: string;
    category: { id: string; name: string } | null;
    costPrice: string | number;
    sellingPrice: string | number;
    stockByWarehouse: { warehouseId: string; quantity: string }[];
};
type InventoryResponse = { products: Product[]; warehouses: Warehouse[] };
type RecentMovement = {
    id: string;
    type: string;
    quantity: string;
    reason: string | null;
    createdAt: string;
    product: { name: string; unit: string };
    warehouse: { name: string };
};
type InventoryPayload = InventoryResponse & {
    business: { id: string; name: string };
    recentMovements: RecentMovement[];
};
type ApiError = { error?: string };

export function InventoryWorkspace({ businessId }: { businessId: string }) {
    const [inventory, setInventory] = useState<InventoryPayload>({
        business: { id: businessId, name: '' },
        products: [],
        warehouses: [],
        recentMovements: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [unit, setUnit] = useState('each');
    const [costPrice, setCostPrice] = useState('0');
    const [sellingPrice, setSellingPrice] = useState('0');
    const [warehouseName, setWarehouseName] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [direction, setDirection] = useState<'IN' | 'OUT'>('IN');
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState('');
    const [adjustmentKey, setAdjustmentKey] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const loadInventory = useCallback(async (signal?: AbortSignal) => {
        const response = await fetch(`/api/businesses/${encodeURIComponent(businessId)}/inventory`, {
            cache: 'no-store',
            signal,
        });
        const payload = (await response.json()) as InventoryPayload | ApiError;
        if (response.status === 401) {
            throw new Error('Sign in to view this business inventory.');
        }
        if (!response.ok || !('business' in payload) || !('products' in payload) || !('warehouses' in payload) || !('recentMovements' in payload)) {
            throw new Error((payload as ApiError).error || 'Unable to load inventory.');
        }
        setInventory(payload);
        setSelectedProduct((current) => current || payload.products[0]?.id || '');
        setSelectedWarehouse((current) => current || payload.warehouses[0]?.id || '');
    }, [businessId]);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError('');
        void loadInventory(controller.signal)
            .catch((loadError: unknown) => {
                if (loadError instanceof Error && loadError.name === 'AbortError') return;
                setError(loadError instanceof Error ? loadError.message : 'Unable to load inventory.');
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [businessId, loadInventory]);

    async function postJson(path: string, data: Record<string, unknown>) {
        const response = await fetch(`/api/businesses/${encodeURIComponent(businessId)}/inventory/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const payload = (await response.json()) as ApiError;
        if (!response.ok) throw new Error(payload.error || 'Unable to save inventory changes.');
        return payload;
    }

    async function createProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setNotice('');
        setSaving(true);
        try {
            await postJson('products', {
                name: productName,
                sku: sku || undefined,
                category: category || undefined,
                unit,
                costPrice: Number(costPrice),
                sellingPrice: Number(sellingPrice),
                trackInventory: true,
            });
            await loadInventory();
            setProductName('');
            setSku('');
            setCategory('');
            setNotice('Product saved.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to create product.');
        } finally {
            setSaving(false);
        }
    }

    async function createWarehouse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setNotice('');
        setSaving(true);
        try {
            await postJson('warehouses', { name: warehouseName });
            await loadInventory();
            setWarehouseName('');
            setNotice('Warehouse saved.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to create warehouse.');
        } finally {
            setSaving(false);
        }
    }

    function changeAdjustmentValue(setter: (value: string) => void, value: string) {
        setter(value);
        setAdjustmentKey(null);
    }

    async function recordAdjustment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setNotice('');
        setSaving(true);
        const key = adjustmentKey || crypto.randomUUID();
        setAdjustmentKey(key);
        try {
            await postJson('', {
                productId: selectedProduct,
                warehouseId: selectedWarehouse,
                direction,
                quantity: Number(quantity),
                reason,
                idempotencyKey: key,
            });
            await loadInventory();
            setQuantity('');
            setReason('');
            setAdjustmentKey(null);
            setNotice('Stock movement recorded.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to record stock movement.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Link href="/olowo/businesses" className="text-sm font-semibold text-blue-700 hover:underline">
                    ← Your businesses
                </Link>
                <header className="mt-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Olowo inventory preview</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">Products and stock</h1>
                    <p className="mt-2 max-w-3xl text-slate-600">
                        Manage this business’s product catalogue, warehouses and traceable stock adjustments. Stock on hand is calculated from the movement history.
                    </p>
                    {inventory.business.name && <p className="mt-2 text-sm font-medium text-slate-700">Business: {inventory.business.name}</p>}
                </header>

                <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    This is the first inventory slice, not a complete Business OS workflow. Sales, purchases, supplier/customer balances and accounting journals are not connected yet; stock adjustments do not post financial entries.
                </p>

                {error && <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
                {notice && <p className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">{notice}</p>}

                {loading ? (
                    <p className="mt-8 rounded-lg bg-white p-6 text-slate-600" role="status">Loading inventory…</p>
                ) : (
                    <>
                        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-slate-900">Products</h2>
                            {inventory.products.length === 0 ? (
                                <p className="mt-3 text-sm text-slate-600">No products yet. Add a product to begin tracking stock.</p>
                            ) : (
                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full min-w-[40rem] text-left text-sm">
                                        <thead className="border-b border-slate-200 text-slate-500">
                                            <tr>
                                                <th className="py-3 pr-4 font-medium">Product</th>
                                                <th className="py-3 pr-4 font-medium">SKU</th>
                                                <th className="py-3 pr-4 font-medium">Category</th>
                                                <th className="py-3 pr-4 text-right font-medium">Cost</th>
                                                <th className="py-3 pr-4 text-right font-medium">Price</th>
                                                <th className="py-3 text-right font-medium">Total on hand</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {inventory.products.map((product) => {
                                                const total = product.stockByWarehouse.reduce((sum, stock) => sum + Number(stock.quantity), 0);
                                                return (
                                                    <tr key={product.id}>
                                                        <td className="py-3 pr-4 font-medium text-slate-900">{product.name}<span className="ml-1 text-slate-500">({product.unit})</span></td>
                                                        <td className="py-3 pr-4 text-slate-600">{product.sku || '—'}</td>
                                                        <td className="py-3 pr-4 text-slate-600">{product.category?.name || '—'}</td>
                                                        <td className="py-3 pr-4 text-right text-slate-600">₦{Number(product.costPrice).toFixed(2)}</td>
                                                        <td className="py-3 pr-4 text-right text-slate-600">₦{Number(product.sellingPrice).toFixed(2)}</td>
                                                        <td className="py-3 text-right font-semibold text-slate-900">{Number(total.toFixed(3)).toLocaleString()} {product.unit}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        <div className="mt-6 grid gap-6 lg:grid-cols-3">
                            <form onSubmit={createProduct} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Add product</h2>
                                <label className="block text-sm font-medium text-slate-700">Name
                                    <input required maxLength={120} value={productName} onChange={(event) => setProductName(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <label className="block text-sm font-medium text-slate-700">SKU <span className="font-normal text-slate-500">(optional)</span>
                                    <input maxLength={64} value={sku} onChange={(event) => setSku(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Category <span className="font-normal text-slate-500">(optional)</span>
                                    <input maxLength={80} value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Unit
                                    <input required maxLength={24} value={unit} onChange={(event) => setUnit(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="block text-sm font-medium text-slate-700">Cost (NGN)
                                        <input required type="number" min="0" step="0.01" value={costPrice} onChange={(event) => setCostPrice(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                    </label>
                                    <label className="block text-sm font-medium text-slate-700">Price (NGN)
                                        <input required type="number" min="0" step="0.01" value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                    </label>
                                </div>
                                <button disabled={saving} className="w-full rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
                                    {saving ? 'Saving…' : 'Save product'}
                                </button>
                            </form>

                            <form onSubmit={createWarehouse} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Add warehouse</h2>
                                <p className="text-sm text-slate-600">Create a location to assign stock movements to.</p>
                                <label className="block text-sm font-medium text-slate-700">Warehouse name
                                    <input required maxLength={100} value={warehouseName} onChange={(event) => setWarehouseName(event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <button disabled={saving} className="w-full rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
                                    {saving ? 'Saving…' : 'Save warehouse'}
                                </button>
                                <div className="border-t border-slate-100 pt-3">
                                    <h3 className="text-sm font-semibold text-slate-800">Locations</h3>
                                    {inventory.warehouses.length ? (
                                        <ul className="mt-2 space-y-1 text-sm text-slate-600">
                                            {inventory.warehouses.map((warehouse) => <li key={warehouse.id}>{warehouse.name}</li>)}
                                        </ul>
                                    ) : <p className="mt-2 text-sm text-slate-500">No warehouses yet.</p>}
                                </div>
                            </form>

                            <form onSubmit={recordAdjustment} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Adjust stock</h2>
                                <label className="block text-sm font-medium text-slate-700">Product
                                    <select required value={selectedProduct} onChange={(event) => { setSelectedProduct(event.target.value); setAdjustmentKey(null); }} disabled={!inventory.products.length} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                                        <option value="">Select product</option>
                                        {inventory.products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                                    </select>
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Warehouse
                                    <select required value={selectedWarehouse} onChange={(event) => { setSelectedWarehouse(event.target.value); setAdjustmentKey(null); }} disabled={!inventory.warehouses.length} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                                        <option value="">Select warehouse</option>
                                        {inventory.warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
                                    </select>
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Movement
                                    <select value={direction} onChange={(event) => { setDirection(event.target.value === 'OUT' ? 'OUT' : 'IN'); setAdjustmentKey(null); }} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                                        <option value="IN">Stock received</option>
                                        <option value="OUT">Stock removed</option>
                                    </select>
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Quantity
                                    <input required type="number" min="0.001" step="0.001" value={quantity} onChange={(event) => changeAdjustmentValue(setQuantity, event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <label className="block text-sm font-medium text-slate-700">Reason
                                    <input required maxLength={200} value={reason} onChange={(event) => changeAdjustmentValue(setReason, event.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
                                </label>
                                <button disabled={saving || !inventory.products.length || !inventory.warehouses.length} className="w-full rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
                                    {saving ? 'Saving…' : 'Record movement'}
                                </button>
                            </form>
                        </div>
                        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Recent stock movements</h2>
                            {inventory.recentMovements.length ? (
                                <div className="mt-3 overflow-x-auto">
                                    <table className="w-full min-w-[36rem] text-left text-sm">
                                        <thead className="border-b border-slate-200 text-slate-500">
                                            <tr>
                                                <th className="py-2 pr-4 font-medium">Date</th>
                                                <th className="py-2 pr-4 font-medium">Product</th>
                                                <th className="py-2 pr-4 font-medium">Warehouse</th>
                                                <th className="py-2 pr-4 text-right font-medium">Quantity</th>
                                                <th className="py-2 font-medium">Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {inventory.recentMovements.map((movement) => (
                                                <tr key={movement.id}>
                                                    <td className="py-2 pr-4 text-slate-600">{new Date(movement.createdAt).toLocaleString()}</td>
                                                    <td className="py-2 pr-4 text-slate-900">{movement.product.name}</td>
                                                    <td className="py-2 pr-4 text-slate-600">{movement.warehouse.name}</td>
                                                    <td className="py-2 pr-4 text-right font-medium text-slate-900">{Number(movement.quantity).toLocaleString()} {movement.product.unit}</td>
                                                    <td className="py-2 text-slate-600">{movement.reason || movement.type}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : <p className="mt-2 text-sm text-slate-600">No stock movements recorded.</p>}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}
