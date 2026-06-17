import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchAdvocacyContacts, submitAdvocacyContact } from '../server/advocacy.functions'
import { fetchPeople } from '../server/people.functions'
import type { AdvocacyContact, Person } from '../lib/types'
import { formatRelative } from '../lib/utils'
import { Megaphone, Plus, X, MessageSquare } from 'lucide-react'

export const Route = createFileRoute('/advocacy')({
  loader: async () => {
    const [contacts, people] = await Promise.all([fetchAdvocacyContacts(), fetchPeople()])
    return { contacts, people }
  },
  component: AdvocacyPage,
})

const ISSUES = [
  'Infrastructure',
  'Education',
  'Healthcare',
  'Security',
  'Unemployment',
  'Agriculture',
  'Power Supply',
  'Water Supply',
  'Housing',
  'Other',
]

function ContactModal({ people, onClose, onSuccess }: { people: Person[]; onClose: () => void; onSuccess: (c: AdvocacyContact) => void }) {
  const [form, setForm] = useState({ person_id: '', issue: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const person = people.find(p => p.id === form.person_id)
    if (!person || !form.issue || !form.message) { setError('All fields required'); return }
    setLoading(true)
    try {
      const contact = await submitAdvocacyContact({
        data: { person_id: person.id, person_name: person.full_name, issue: form.issue, message: form.message },
      })
      onSuccess(contact)
      onClose()
    } catch { setError('Failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Contact Your Candidate</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Constituent</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.person_id} onChange={e => setForm(f => ({ ...f, person_id: e.target.value }))} required>
              <option value="">Select person...</option>
              {people.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))} required>
              <option value="">Select issue...</option>
              {ISSUES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Describe the issue and what you'd like the candidate to address..."
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 disabled:opacity-50">{loading ? 'Sending...' : 'Send Message'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AdvocacyPage() {
  const { contacts: initial, people } = Route.useLoaderData()
  const [contacts, setContacts] = useState(initial)
  const [showModal, setShowModal] = useState(false)

  const issueBreakdown = contacts.reduce<Record<string, number>>((acc, c) => {
    acc[c.issue] = (acc[c.issue] ?? 0) + 1
    return acc
  }, {})

  const topIssues = Object.entries(issueBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advocacy</h1>
          <p className="text-sm text-gray-500">{contacts.length} constituent messages</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700">
          <Plus className="w-4 h-4" /> New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-600">Constituent Messages</h2>
            </div>
            {contacts.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p className="text-gray-400">No messages yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {contacts.map(contact => (
                  <div key={contact.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{contact.person_name}</span>
                          <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">{contact.issue}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{contact.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{formatRelative(contact.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Issue summary */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">Top Issues</h2>
            {topIssues.length === 0 ? (
              <p className="text-sm text-gray-400">No data yet</p>
            ) : (
              <div className="space-y-3">
                {topIssues.map(([issue, count]) => {
                  const maxCount = topIssues[0][1]
                  const pct = Math.round((count / maxCount) * 100)
                  return (
                    <div key={issue}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{issue}</span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-4 h-4 text-amber-700" />
              <span className="text-sm font-semibold text-amber-800">ActionButton</span>
            </div>
            <p className="text-xs text-amber-700">
              Constituents can directly contact your candidate on issues that matter to them. Every message is logged and tracked in the activity stream.
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <ContactModal people={people} onClose={() => setShowModal(false)} onSuccess={c => setContacts(prev => [c, ...prev])} />
      )}
    </div>
  )
}
