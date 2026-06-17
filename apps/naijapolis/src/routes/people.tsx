import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchPeople, createPerson } from '../server/people.functions'
import { POLLING_UNITS } from '../lib/data'
import type { Person } from '../lib/types'
import { formatDate, cn } from '../lib/utils'
import { Users, Plus, Search, Phone, Mail, X } from 'lucide-react'

export const Route = createFileRoute('/people')({
  loader: async () => fetchPeople(),
  component: PeoplePage,
})

const TAG_COLORS: Record<string, string> = {
  volunteer: 'bg-teal-100 text-teal-700',
  donor: 'bg-green-100 text-green-700',
  supporter: 'bg-blue-100 text-blue-700',
  canvasser: 'bg-purple-100 text-purple-700',
  ward_coordinator: 'bg-amber-100 text-amber-700',
}

function AddPersonModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (p: Person) => void }) {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    polling_unit_id: '',
    tags: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.phone) { setError('Name and phone are required'); return }
    setLoading(true)
    try {
      const person = await createPerson({
        data: {
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || undefined,
          polling_unit_id: form.polling_unit_id || undefined,
          tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
          custom_fields: {},
        },
      })
      onSuccess(person)
      onClose()
    } catch {
      setError('Failed to add person. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Add Person</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.full_name}
              onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
              placeholder="e.g. Emeka Okonkwo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+2348012345678"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="optional"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Polling Unit</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.polling_unit_id}
              onChange={e => setForm(f => ({ ...f, polling_unit_id: e.target.value }))}
            >
              <option value="">Select polling unit...</option>
              {POLLING_UNITS.map(pu => (
                <option key={pu.id} value={pu.id}>{pu.pu_code} — {pu.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="volunteer, donor (comma separated)"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Add Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PeoplePage() {
  const initial = Route.useLoaderData()
  const [people, setPeople] = useState(initial)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = people.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    (p.email ?? '').toLowerCase().includes(search.toLowerCase())
  )

  function getPuName(id?: string) {
    return POLLING_UNITS.find(pu => pu.id === id)?.name ?? '—'
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">People</h1>
          <p className="text-sm text-gray-500 mt-0.5">{people.length} supporters in database</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add Person
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Polling Unit</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Tags</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No people found
                </td>
              </tr>
            ) : (
              filtered.map(person => (
                <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-xs flex-shrink-0">
                        {person.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-900">{person.full_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-3 h-3" />{person.phone}
                      </div>
                      {person.email && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Mail className="w-3 h-3" />{person.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {getPuName(person.polling_unit_id)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {person.tags.map(tag => (
                        <span
                          key={tag}
                          className={cn('px-2 py-0.5 rounded text-xs font-medium', TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600')}
                        >
                          {tag.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500">
                    {formatDate(person.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddPersonModal
          onClose={() => setShowAdd(false)}
          onSuccess={p => setPeople(prev => [...prev, p])}
        />
      )}
    </div>
  )
}
