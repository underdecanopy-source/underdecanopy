import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchFinanceData, createDonation } from '../server/finance.functions'
import { fetchPeople } from '../server/people.functions'
import type { Transaction, Person } from '../lib/types'
import { formatCurrency, formatDate, cn } from '../lib/utils'
import { DollarSign, TrendingUp, Clock, Plus, X, CheckCircle, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/finance')({
  loader: async () => {
    const [finance, people] = await Promise.all([fetchFinanceData(), fetchPeople()])
    return { ...finance, people }
  },
  component: FinancePage,
})

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub?: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

function DonationModal({ people, onClose, onSuccess }: { people: Person[]; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ person_id: '', amount: '', channel: 'paystack' as Transaction['channel'] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const person = people.find(p => p.id === form.person_id)
    if (!person || !form.amount) { setError('All fields required'); return }
    setLoading(true)
    try {
      await createDonation({ data: { person_id: person.id, person_name: person.full_name, amount: parseInt(form.amount, 10), channel: form.channel } })
      onSuccess()
      onClose()
    } catch { setError('Failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">New Donation</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donor</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.person_id} onChange={e => setForm(f => ({ ...f, person_id: e.target.value }))} required>
              <option value="">Select donor...</option>
              {people.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
            <input type="number" min="1" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="e.g. 50000" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value as Transaction['channel'] }))}>
              <option value="paystack">Paystack</option>
              <option value="flutterwave">Flutterwave</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">{loading ? 'Saving...' : 'Record Donation'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FinancePage() {
  const { transactions: initTx, pledges: initPl, fundraisers, people } = Route.useLoaderData()
  const [transactions, setTransactions] = useState(initTx)
  const [pledges] = useState(initPl)
  const [activeTab, setActiveTab] = useState<'transactions' | 'pledges' | 'fundraisers'>('transactions')
  const [showDonation, setShowDonation] = useState(false)

  const totalRaised = transactions.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0)
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0)
  const pledgeTotal = pledges.filter(p => !p.fulfilled).reduce((s, p) => s + p.amount, 0)

  async function refresh() {
    const { fetchFinanceData: ff } = await import('../server/finance.functions')
    const data = await ff()
    setTransactions(data.transactions)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
          <p className="text-sm text-gray-500 mt-0.5">Donations, pledges, and fundraisers</p>
        </div>
        <button onClick={() => setShowDonation(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> New Donation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Raised" value={formatCurrency(totalRaised)} sub={`${transactions.filter(t => t.status === 'success').length} transactions`} icon={DollarSign} color="bg-green-600" />
        <StatCard label="Pending" value={formatCurrency(pendingAmount)} sub="awaiting confirmation" icon={Clock} color="bg-amber-500" />
        <StatCard label="Pledged" value={formatCurrency(pledgeTotal)} sub={`${pledges.filter(p => !p.fulfilled).length} unfulfilled`} icon={TrendingUp} color="bg-blue-500" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          {(['transactions', 'pledges', 'fundraisers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn('px-5 py-3 text-sm font-medium capitalize transition-colors', activeTab === tab ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500 hover:text-gray-700')}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'transactions' && (
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Donor</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Channel</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{tx.person_name}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">{formatCurrency(tx.amount)}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize hidden sm:table-cell">{tx.channel.replace('_', ' ')}</td>
                  <td className="px-4 py-3">
                    <span className={cn('flex items-center gap-1 text-xs font-medium', tx.status === 'success' ? 'text-green-700' : tx.status === 'pending' ? 'text-amber-600' : 'text-red-600')}>
                      {tx.status === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{formatDate(tx.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'pledges' && (
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Person</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Due Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {pledges.map(pledge => (
                <tr key={pledge.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{pledge.person_name}</td>
                  <td className="px-4 py-3 font-semibold text-indigo-700">{formatCurrency(pledge.amount)}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{formatDate(pledge.due_date)}</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs font-medium px-2 py-1 rounded', pledge.fulfilled ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')}>
                      {pledge.fulfilled ? 'Fulfilled' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'fundraisers' && (
          <div className="p-4 grid gap-4">
            {fundraisers.map(f => {
              const raised = transactions.filter(t => t.fundraiser_id === f.id && t.status === 'success').reduce((s, t) => s + t.amount, 0)
              const pct = Math.min(100, Math.round((raised / f.goal_amount) * 100))
              return (
                <div key={f.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{f.name}</h3>
                      <p className="text-sm text-gray-500">{f.description}</p>
                    </div>
                    <span className="text-sm font-bold text-green-700">{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatCurrency(raised)} raised</span>
                    <span>Goal: {formatCurrency(f.goal_amount)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showDonation && (
        <DonationModal people={people} onClose={() => setShowDonation(false)} onSuccess={refresh} />
      )}
    </div>
  )
}
