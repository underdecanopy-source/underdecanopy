import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchCanvassRecords, createCanvassRecord } from '../server/canvass.functions'
import { fetchPeople } from '../server/people.functions'
import { POLLING_UNITS } from '../lib/data'
import type { CanvassRecord, Person } from '../lib/types'
import { formatRelative, cn } from '../lib/utils'
import { Map, Plus, X, CheckCircle, Clock } from 'lucide-react'

export const Route = createFileRoute('/canvassing')({
  loader: async () => {
    const [records, people] = await Promise.all([fetchCanvassRecords(), fetchPeople()])
    return { records, people }
  },
  component: CanvassingPage,
})

const SUPPORT_CONFIG: Record<CanvassRecord['support_level'], { label: string; color: string; bg: string }> = {
  strong: { label: 'Strong Support', color: 'text-green-700', bg: 'bg-green-100' },
  lean: { label: 'Leaning', color: 'text-teal-700', bg: 'bg-teal-100' },
  neutral: { label: 'Neutral', color: 'text-amber-700', bg: 'bg-amber-100' },
  opposed: { label: 'Opposed', color: 'text-red-700', bg: 'bg-red-100' },
}

function LogCanvassModal({ people, onClose, onSuccess }: { people: Person[]; onClose: () => void; onSuccess: (r: CanvassRecord) => void }) {
  const [form, setForm] = useState({
    person_id: '',
    polling_unit_id: '',
    agent_name: '',
    support_level: 'strong' as CanvassRecord['support_level'],
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const person = people.find(p => p.id === form.person_id)
    const pu = POLLING_UNITS.find(u => u.id === form.polling_unit_id)
    if (!person || !pu) { setError('Person and polling unit required'); return }
    setLoading(true)
    try {
      const record = await createCanvassRecord({
        data: {
          person_id: person.id,
          person_name: person.full_name,
          agent_name: form.agent_name || person.full_name,
          polling_unit_id: pu.id,
          polling_unit_name: pu.name,
          support_level: form.support_level,
          notes: form.notes,
          sync_status: 'synced',
        },
      })
      onSuccess(record)
      onClose()
    } catch { setError('Failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Log Door-Knock</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Person Visited</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.person_id} onChange={e => setForm(f => ({ ...f, person_id: e.target.value }))} required>
              <option value="">Select person...</option>
              {people.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Polling Unit</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.polling_unit_id} onChange={e => setForm(f => ({ ...f, polling_unit_id: e.target.value }))} required>
              <option value="">Select polling unit...</option>
              {POLLING_UNITS.map(pu => <option key={pu.id} value={pu.id}>{pu.pu_code} — {pu.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Canvasser Name</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.agent_name} onChange={e => setForm(f => ({ ...f, agent_name: e.target.value }))} placeholder="Agent who did the knock" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Level</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.support_level} onChange={e => setForm(f => ({ ...f, support_level: e.target.value as CanvassRecord['support_level'] }))}>
              <option value="strong">Strong Support</option>
              <option value="lean">Leaning Our Way</option>
              <option value="neutral">Neutral / Undecided</option>
              <option value="opposed">Opposed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any relevant observations..." />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">{loading ? 'Saving...' : 'Log Visit'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CanvassingPage() {
  const { records: initial, people } = Route.useLoaderData()
  const [records, setRecords] = useState(initial)
  const [showModal, setShowModal] = useState(false)

  const breakdown = {
    strong: records.filter(r => r.support_level === 'strong').length,
    lean: records.filter(r => r.support_level === 'lean').length,
    neutral: records.filter(r => r.support_level === 'neutral').length,
    opposed: records.filter(r => r.support_level === 'opposed').length,
    pending: records.filter(r => r.sync_status === 'pending').length,
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Canvassing</h1>
          <p className="text-sm text-gray-500">{records.length} door-knocks logged</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Log Visit
        </button>
      </div>

      {/* Support breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(['strong', 'lean', 'neutral', 'opposed'] as const).map(level => {
          const cfg = SUPPORT_CONFIG[level]
          return (
            <div key={level} className="bg-white rounded-xl shadow-sm p-4 text-center">
              <p className={cn('text-2xl font-bold', cfg.color)}>{breakdown[level]}</p>
              <p className="text-xs text-gray-500 mt-0.5">{cfg.label}</p>
            </div>
          )
        })}
      </div>

      {/* USSD sync notice */}
      {breakdown.pending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2 text-sm text-amber-700">
          <Clock className="w-4 h-4" />
          <strong>{breakdown.pending}</strong> record{breakdown.pending > 1 ? 's' : ''} pending sync from field agents (USSD/offline)
        </div>
      )}

      {/* Records list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-600">Recent Visits</h2>
        </div>
        {records.length === 0 ? (
          <div className="p-12 text-center">
            <Map className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400">No canvass records yet. Start logging door-knocks.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {records.map(record => {
              const cfg = SUPPORT_CONFIG[record.support_level]
              return (
                <div key={record.id} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50">
                  <div className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', cfg.bg.replace('bg-', 'bg-').replace('-100', '-400'))} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm">{record.person_name}</span>
                      <span className={cn('text-xs px-2 py-0.5 rounded font-medium', cfg.bg, cfg.color)}>{cfg.label}</span>
                      {record.sync_status === 'pending' && <span className="text-xs text-amber-600">⏳ pending</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{record.polling_unit_name}</p>
                    {record.notes && <p className="text-xs text-gray-600 mt-0.5 italic">"{record.notes}"</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs text-gray-400">{formatRelative(record.created_at)}</span>
                    {record.sync_status === 'synced'
                      ? <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      : <Clock className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showModal && (
        <LogCanvassModal
          people={people}
          onClose={() => setShowModal(false)}
          onSuccess={r => setRecords(prev => [r, ...prev])}
        />
      )}
    </div>
  )
}
