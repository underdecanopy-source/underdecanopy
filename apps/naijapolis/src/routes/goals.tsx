import { createFileRoute } from '@tanstack/react-router'
import { fetchGoals } from '../server/goals.functions'
import type { Goal } from '../lib/types'
import { formatCurrency, cn } from '../lib/utils'
import { Target, DollarSign, Users, Map, Calendar } from 'lucide-react'

export const Route = createFileRoute('/goals')({
  loader: async () => fetchGoals(),
  component: GoalsPage,
})

const GOAL_CONFIG: Record<Goal['type'], { icon: React.ElementType; color: string; bg: string; unit: string }> = {
  donation: { icon: DollarSign, color: 'text-green-700', bg: 'bg-green-600', unit: '₦' },
  volunteers: { icon: Users, color: 'text-blue-700', bg: 'bg-blue-600', unit: '' },
  canvass: { icon: Map, color: 'text-purple-700', bg: 'bg-purple-600', unit: '' },
  rsvp: { icon: Calendar, color: 'text-amber-700', bg: 'bg-amber-600', unit: '' },
}

function GoalCard({ goal }: { goal: Goal }) {
  const cfg = GOAL_CONFIG[goal.type]
  const pct = Math.min(100, Math.round((goal.current_value / goal.target) * 100))
  const displayValue = goal.type === 'donation'
    ? formatCurrency(goal.current_value)
    : goal.current_value.toLocaleString()
  const displayTarget = goal.type === 'donation'
    ? formatCurrency(goal.target)
    : goal.target.toLocaleString()

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', cfg.bg)}>
            <cfg.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.name}</h3>
            <p className="text-xs text-gray-500">{goal.description}</p>
          </div>
        </div>
        <span className={cn('text-2xl font-bold', cfg.color)}>{pct}%</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
        <div
          className={cn('h-3 rounded-full transition-all duration-500', cfg.bg)}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{displayValue}</span>
        <span className="text-gray-400">of {displayTarget}</span>
      </div>

      {pct >= 100 && (
        <div className="mt-3 flex items-center gap-1.5 text-sm text-green-700 font-medium">
          <span>🎉</span> Goal achieved!
        </div>
      )}
      {pct >= 75 && pct < 100 && (
        <div className="mt-3 text-xs text-amber-600 font-medium">Almost there — {100 - pct}% to go!</div>
      )}
    </div>
  )
}

function GoalsPage() {
  const goals = Route.useLoaderData()

  const totalGoals = goals.length
  const achieved = goals.filter(g => g.current_value >= g.target).length
  const inProgress = goals.filter(g => g.current_value > 0 && g.current_value < g.target).length

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track campaign targets and progress</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Goals', value: totalGoals, color: 'text-gray-700' },
          { label: 'Achieved', value: achieved, color: 'text-green-700' },
          { label: 'In Progress', value: inProgress, color: 'text-amber-700' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 text-center">
            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {goals.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Target className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400">No goals set. Create your first campaign target.</p>
        </div>
      )}
    </div>
  )
}
