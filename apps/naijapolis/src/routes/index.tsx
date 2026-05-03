import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchActivities } from '../server/activity.functions'
import { fetchPeople } from '../server/people.functions'
import { createDonation } from '../server/finance.functions'
import type { Activity, Person } from '../lib/types'
import { formatRelative, formatCurrency, cn } from '../lib/utils'
import {
  DollarSign,
  Users,
  Map,
  Calendar,
  Megaphone,
  AlertCircle,
  UserPlus,
  Heart,
  Filter,
  Plus,
  X,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [activities, people] = await Promise.all([
      fetchActivities(),
      fetchPeople(),
    ])
    return { activities, people }
  },
  component: ActivityFeedPage,
})

const ACTIVITY_CONFIG: Record<
  Activity['type'],
  { label: string; color: string; bgColor: string; icon: React.ElementType }
> = {
  donation: { label: 'Donation', color: 'text-green-700', bgColor: 'bg-green-100', icon: DollarSign },
  canvass: { label: 'Canvass', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: Map },
  rsvp: { label: 'RSVP', color: 'text-purple-700', bgColor: 'bg-purple-100', icon: Calendar },
  contact_candidate: { label: 'Contacted Candidate', color: 'text-amber-700', bgColor: 'bg-amber-100', icon: Megaphone },
  volunteer_signup: { label: 'Volunteer Signup', color: 'text-teal-700', bgColor: 'bg-teal-100', icon: UserPlus },
  incident: { label: 'Incident', color: 'text-red-700', bgColor: 'bg-red-100', icon: AlertCircle },
  pledge: { label: 'Pledge', color: 'text-indigo-700', bgColor: 'bg-indigo-100', icon: Heart },
}

function ActivityItem({ activity }: { activity: Activity }) {
  const cfg = ACTIVITY_CONFIG[activity.type]
  const Icon = cfg.icon

  function getSummary() {
    const m = activity.metadata
    switch (activity.type) {
      case 'donation': return `donated ${formatCurrency(m.amount as number)} via ${m.channel}`
      case 'canvass': return `canvassed at ${m.polling_unit} — ${m.support_level} supporter`
      case 'rsvp': return `RSVPed to ${m.event}`
      case 'contact_candidate': return `sent message about "${m.issue}"`
      case 'volunteer_signup': return `signed up as volunteer (${m.role ?? 'General'})`
      case 'incident': return `reported incident: ${m.description ?? 'details logged'}`
      case 'pledge': return `pledged ${formatCurrency(m.amount as number)}`
      default: return 'performed an action'
    }
  }

  return (
    <div className="flex gap-3 py-3">
      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', cfg.bgColor)}>
        <Icon className={cn('w-4 h-4', cfg.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{activity.person_name}</span>{' '}
          <span className="text-gray-600">{getSummary()}</span>
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', cfg.bgColor, cfg.color)}>
            {cfg.label}
          </span>
          <span className="text-xs text-gray-400">{formatRelative(activity.created_at)}</span>
          {activity.sync_status === 'pending' && (
            <span className="text-xs text-amber-600 font-medium">⏳ pending sync</span>
          )}
          {activity.source === 'ussd' && (
            <span className="text-xs text-gray-500 uppercase tracking-wide">USSD</span>
          )}
        </div>
      </div>
    </div>
  )
}

function DonationModal({
  people,
  onClose,
  onSuccess,
}: {
  people: Person[]
  onClose: () => void
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    person_id: '',
    amount: '',
    channel: 'paystack' as const,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const person = people.find(p => p.id === form.person_id)
    if (!person) { setError('Please select a person'); return }
    const amount = parseInt(form.amount, 10)
    if (!amount || amount <= 0) { setError('Enter a valid amount'); return }
    setLoading(true)
    try {
      await createDonation({
        data: {
          person_id: person.id,
          person_name: person.full_name,
          amount,
          channel: form.channel,
        },
      })
      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to record donation. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Record Donation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donor</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.person_id}
              onChange={e => setForm(f => ({ ...f, person_id: e.target.value }))}
              required
            >
              <option value="">Select person...</option>
              {people.map(p => (
                <option key={p.id} value={p.id}>{p.full_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g. 50000"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Channel</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={form.channel}
              onChange={e => setForm(f => ({ ...f, channel: e.target.value as typeof form.channel }))}
            >
              <option value="paystack">Paystack</option>
              <option value="flutterwave">Flutterwave</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Record Donation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ActivityFeedPage() {
  const { activities: initial, people } = Route.useLoaderData()
  const [activities, setActivities] = useState(initial)
  const [filter, setFilter] = useState<Activity['type'] | 'all'>('all')
  const [showDonation, setShowDonation] = useState(false)

  const filtered = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter)

  async function refresh() {
    const updated = await fetchActivities()
    setActivities(updated)
  }

  const stats = {
    totalDonations: activities.filter(a => a.type === 'donation').reduce((s, a) => s + ((a.metadata.amount as number) || 0), 0),
    volunteers: activities.filter(a => a.type === 'volunteer_signup').length,
    canvasses: activities.filter(a => a.type === 'canvass').length,
    rsvps: activities.filter(a => a.type === 'rsvp').length,
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Feed</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time campaign activity stream</p>
        </div>
        <button
          onClick={() => setShowDonation(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Donation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Raised', value: formatCurrency(stats.totalDonations), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Volunteers', value: String(stats.volunteers), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Canvasses', value: String(stats.canvasses), icon: Map, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'RSVPs', value: String(stats.rsvps), icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.bg)}>
              <stat.icon className={cn('w-5 h-5', stat.color)} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feed Card */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* Filter bar */}
        <div className="flex items-center gap-2 p-4 border-b overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {(['all', 'donation', 'canvass', 'rsvp', 'volunteer_signup', 'contact_candidate', 'pledge'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                filter === type
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {type === 'all' ? 'All' : ACTIVITY_CONFIG[type].label}
            </button>
          ))}
        </div>

        {/* Activity list */}
        <div className="divide-y divide-gray-50 px-4">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-gray-400 text-sm">No activities yet</p>
          ) : (
            filtered.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </div>

      {showDonation && (
        <DonationModal
          people={people}
          onClose={() => setShowDonation(false)}
          onSuccess={refresh}
        />
      )}
    </div>
  )
}
