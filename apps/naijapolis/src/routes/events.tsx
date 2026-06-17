import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchEvents, createEvent, rsvpToEvent } from '../server/events.functions'
import { fetchPeople } from '../server/people.functions'
import type { Event, Person } from '../lib/types'
import { formatDate } from '../lib/utils'
import { Calendar, MapPin, Users, Plus, X } from 'lucide-react'

export const Route = createFileRoute('/events')({
  loader: async () => {
    const [events, people] = await Promise.all([fetchEvents(), fetchPeople()])
    return { events, people }
  },
  component: EventsPage,
})

function CreateEventModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (e: Event) => void }) {
  const [form, setForm] = useState({ title: '', description: '', location: '', date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!form.title || !form.date || !form.location) { setError('Title, location and date required'); return }
    setLoading(true)
    try {
      const event = await createEvent({ data: { ...form, date: new Date(form.date).toISOString() } })
      onSuccess(event)
      onClose()
    } catch { setError('Failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Create Event</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Campaign Rally - Lagos" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Tafawa Balewa Square, Lagos" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
            <input type="datetime-local" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">{loading ? 'Creating...' : 'Create Event'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function RsvpModal({ event, people, onClose, onSuccess }: { event: Event; people: Person[]; onClose: () => void; onSuccess: () => void }) {
  const [personId, setPersonId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const person = people.find(p => p.id === personId)
    if (!person) { setError('Select a person'); return }
    setLoading(true)
    try {
      await rsvpToEvent({ data: { event_id: event.id, event_title: event.title, person_id: person.id, person_name: person.full_name } })
      onSuccess()
      onClose()
    } catch { setError('Failed. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">RSVP: {event.title}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={personId} onChange={e => setPersonId(e.target.value)} required>
            <option value="">Select person...</option>
            {people.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
          </select>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50">{loading ? 'Saving...' : 'RSVP'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EventsPage() {
  const { events: initial, people } = Route.useLoaderData()
  const [events, setEvents] = useState(initial)
  const [showCreate, setShowCreate] = useState(false)
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null)

  function isUpcoming(e: Event) {
    return new Date(e.date) >= new Date()
  }

  async function refreshEvents() {
    const updated = await fetchEvents()
    setEvents(updated)
  }

  const upcoming = events.filter(isUpcoming)
  const past = events.filter(e => !isUpcoming(e))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500">{upcoming.length} upcoming, {past.length} past</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-purple-700">
                    {new Date(event.date).toLocaleDateString('en-NG', { month: 'short' }).toUpperCase()}
                  </span>
                  <span className="text-lg font-bold text-purple-700 leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  {event.description && <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>}
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.rsvp_count} RSVPs</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(event.date)}</span>
                  </div>
                </div>
                <button onClick={() => setRsvpEvent(event)} className="flex-shrink-0 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700">
                  RSVP
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Past Events</h2>
          <div className="space-y-3">
            {past.map(event => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 opacity-70">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-700">{event.title}</h3>
                  <p className="text-xs text-gray-400">{event.location} · {event.rsvp_count} attended</p>
                </div>
                <span className="text-xs text-gray-400">{formatDate(event.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400">No events yet. Create your first campaign event.</p>
        </div>
      )}

      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} onSuccess={e => { setEvents(prev => [...prev, e]); setShowCreate(false) }} />}
      {rsvpEvent && <RsvpModal event={rsvpEvent} people={people} onClose={() => setRsvpEvent(null)} onSuccess={refreshEvents} />}
    </div>
  )
}
