'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type FormEvent } from 'react';

type ApiError = { error?: string };
type Supplier = { id: string; name: string; email: string | null; phone: string | null };
type Category = { id: string; name: string };
type Warehouse = { id: string; name: string };
type Product = { id: string; name: string; costPrice: string | number };
type Purchase = { id: string; reference: string; status: string; totalAmount: string | number; occurredAt: string };
type Expense = { id: string; description: string; status: string; amount: string | number; occurredAt: string };

export function OperationsWorkspace({ businessId }: { businessId: string }) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [unitCost, setUnitCost] = useState('0');
    const [expenseCategoryId, setExpenseCategoryId] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseMethod, setExpenseMethod] = useState('CASH');

    const load = useCallback(async (signal?: AbortSignal) => {
        const base = `/api/businesses/${encodeURIComponent(businessId)}`;
        const responses = await Promise.all([
            fetch(`${base}/suppliers`, { cache: 'no-store', signal }),
            fetch(`${base}/purchases`, { cache: 'no-store', signal }),
            fetch(`${base}/expenses/categories`, { cache: 'no-store', signal }),
            fetch(`${base}/expenses`, { cache: 'no-store', signal }),
            fetch(`${base}/inventory`, { cache: 'no-store', signal }),
        ]);
        const payloads = await Promise.all(responses.map((response) => response.json()));
        if (responses.some((response) => response.status === 401)) throw new Error('Sign in to manage purchases and expenses.');
        if (responses.some((response) => !response.ok)) {
            const failed = payloads.find((payload, index) => !responses[index].ok) as ApiError | undefined;
            throw new Error(failed?.error || 'Purchases and expenses are unavailable. The database migration may not be applied.');
        }
        setSuppliers(payloads[0] as Supplier[]);
        setPurchases(payloads[1] as Purchase[]);
        setCategories(payloads[2] as Category[]);
        setExpenses(payloads[3] as Expense[]);
        const inventory = payloads[4] as { warehouses: Warehouse[]; products: Product[] };
        setWarehouses(inventory.warehouses);
        setProducts(inventory.products);
        setSupplierId((current) => current || (payloads[0] as Supplier[])[0]?.id || '');
        setWarehouseId((current) => current || inventory.warehouses[0]?.id || '');
        setProductId((current) => current || inventory.products[0]?.id || '');
        setExpenseCategoryId((current) => current || (payloads[2] as Category[])[0]?.id || '');
    }, [businessId]);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError('');
        void load(controller.signal)
            .catch((loadError: unknown) => setError(loadError instanceof Error && loadError.name !== 'AbortError'
                ? loadError.message
                : 'Unable to load purchases and expenses'))
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [load]);

    async function post(path: string, body: Record<string, unknown>) {
        const response = await fetch(`/api/businesses/${encodeURIComponent(businessId)}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const payload = await response.json() as ApiError;
        if (!response.ok) throw new Error(payload.error || 'Unable to save.');
        return payload;
    }

    async function createSupplier(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true); setError(''); setNotice('');
        try {
            await post('/suppliers', { name: supplierName, email: supplierEmail || undefined });
            setSupplierName(''); setSupplierEmail('');
            await load();
            setNotice('Supplier created.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to create supplier.');
        } finally { setSaving(false); }
    }

    async function createCategory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true); setError(''); setNotice('');
        try {
            await post('/expenses/categories', { name: categoryName });
            setCategoryName('');
            await load();
            setNotice('Expense category created.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to create category.');
        } finally { setSaving(false); }
    }

    async function createPurchase(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true); setError(''); setNotice('');
        try {
            await post('/purchases', {
                supplierId,
                warehouseId,
                items: [{ productId, quantity: Number(quantity), unitCost: Number(unitCost) }],
                taxAmount: 0,
                idempotencyKey: crypto.randomUUID(),
            });
            await load();
            setQuantity('1'); setUnitCost('0');
            setNotice('Purchase completed and stock updated.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to record purchase.');
        } finally { setSaving(false); }
    }

    async function createExpense(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true); setError(''); setNotice('');
        try {
            await post('/expenses', {
                categoryId: expenseCategoryId,
                amount: Number(expenseAmount),
                paymentMethod: expenseMethod,
                description: expenseDescription,
                idempotencyKey: crypto.randomUUID(),
            });
            await load();
            setExpenseAmount(''); setExpenseDescription('');
            setNotice('Expense recorded.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to record expense.');
        } finally { setSaving(false); }
    }

    return (
        <main className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/olowo/businesses" className="text-sm font-semibold text-blue-700 hover:underline">← Your businesses</Link>
                <h1 className="mt-5 text-3xl font-bold text-slate-900">Purchases and expenses</h1>
                {loading ? <p className="mt-8 text-slate-600" role="status">Loading operations…</p> : (
                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold">Suppliers and purchases</h2>
                            <form onSubmit={createSupplier} className="mt-4 flex gap-2">
                                <input aria-label="Supplier name" value={supplierName} onChange={(event) => setSupplierName(event.target.value)} required placeholder="Supplier name" className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2" />
                                <input aria-label="Supplier email" type="email" value={supplierEmail} onChange={(event) => setSupplierEmail(event.target.value)} placeholder="Email" className="w-44 rounded-md border border-slate-300 px-3 py-2" />
                                <button disabled={saving} className="rounded-md bg-blue-700 px-3 py-2 font-semibold text-white disabled:opacity-50">Add</button>
                            </form>
                            <form onSubmit={createPurchase} className="mt-5 space-y-3">
                                <select aria-label="Supplier" value={supplierId} onChange={(event) => setSupplierId(event.target.value)} required className="w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Choose supplier</option>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}</select>
                                <select aria-label="Warehouse" value={warehouseId} onChange={(event) => setWarehouseId(event.target.value)} required className="w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Choose warehouse</option>{warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}</select>
                                <select aria-label="Product" value={productId} onChange={(event) => setProductId(event.target.value)} required className="w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Choose product</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select>
                                <div className="grid grid-cols-2 gap-3">
                                    <input aria-label="Purchase quantity" type="number" min="0.001" step="0.001" value={quantity} onChange={(event) => setQuantity(event.target.value)} required className="rounded-md border border-slate-300 px-3 py-2" />
                                    <input aria-label="Unit cost" type="number" min="0" step="0.01" value={unitCost} onChange={(event) => setUnitCost(event.target.value)} required className="rounded-md border border-slate-300 px-3 py-2" />
                                </div>
                                <button disabled={saving || !supplierId || !warehouseId || !productId} className="w-full rounded-md bg-violet-700 px-4 py-2 font-semibold text-white disabled:opacity-50">Record purchase</button>
                            </form>
                            <ul className="mt-5 divide-y text-sm">{purchases.map((purchase) => <li key={purchase.id} className="py-2"><strong>{purchase.reference}</strong> · ₦{Number(purchase.totalAmount).toLocaleString()} · {purchase.status}</li>)}</ul>
                        </section>
                        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold">Expense categories and expenses</h2>
                            <form onSubmit={createCategory} className="mt-4 flex gap-2">
                                <input aria-label="Expense category" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} required placeholder="Category name" className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2" />
                                <button disabled={saving} className="rounded-md bg-blue-700 px-3 py-2 font-semibold text-white disabled:opacity-50">Add</button>
                            </form>
                            <form onSubmit={createExpense} className="mt-5 space-y-3">
                                <select aria-label="Expense category" value={expenseCategoryId} onChange={(event) => setExpenseCategoryId(event.target.value)} required className="w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Choose category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                                <input aria-label="Expense description" value={expenseDescription} onChange={(event) => setExpenseDescription(event.target.value)} required placeholder="Description" className="w-full rounded-md border border-slate-300 px-3 py-2" />
                                <div className="grid grid-cols-2 gap-3">
                                    <input aria-label="Expense amount" type="number" min="0.01" step="0.01" value={expenseAmount} onChange={(event) => setExpenseAmount(event.target.value)} required className="rounded-md border border-slate-300 px-3 py-2" />
                                    <select aria-label="Expense payment method" value={expenseMethod} onChange={(event) => setExpenseMethod(event.target.value)} className="rounded-md border border-slate-300 px-3 py-2"><option value="CASH">Cash</option><option value="BANK_TRANSFER">Bank transfer</option><option value="POS">POS</option><option value="OTHER">Other</option></select>
                                </div>
                                <button disabled={saving || !expenseCategoryId} className="w-full rounded-md bg-violet-700 px-4 py-2 font-semibold text-white disabled:opacity-50">Record expense</button>
                            </form>
                            <ul className="mt-5 divide-y text-sm">{expenses.map((expense) => <li key={expense.id} className="py-2"><strong>{expense.description}</strong> · ₦{Number(expense.amount).toLocaleString()} · {expense.status}</li>)}</ul>
                        </section>
                    </div>
                )}
                {error && <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
                {notice && <p className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">{notice}</p>}
            </div>
        </main>
    );
}
