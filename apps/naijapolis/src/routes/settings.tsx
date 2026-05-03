import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { fetchSettings, updateSettings } from '../server/settings.functions'
import type { AppSettings } from '../lib/types'
import { Settings, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/settings')({
  loader: async () => fetchSettings(),
  component: SettingsPage,
})

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

function SettingsPage() {
  const initial = Route.useLoaderData()
  const [form, setForm] = useState<AppSettings>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function field(key: keyof AppSettings) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm(f => ({ ...f, [key]: e.target.value })),
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await updateSettings({ data: form })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save settings. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Campaign configuration and defaults</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Info */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Campaign Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('campaign_name')} placeholder="e.g. Okonkwo 2027 Campaign" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('candidate_name')} placeholder="e.g. Hon. Emeka Okonkwo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Political Party</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('party')} placeholder="e.g. APC, PDP, Labour" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('state')}>
                {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LGA</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('lga')} placeholder="e.g. Surulere" />
            </div>
          </div>
        </div>

        {/* Payment & Tech */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Payment & Localization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Provider</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('payment_provider')}>
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('currency')}>
                <option value="NGN">NGN (Nigerian Naira ₦)</option>
                <option value="USD">USD (US Dollar $)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" {...field('timezone')}>
                <option value="Africa/Lagos">Africa/Lagos (WAT, UTC+1)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* USSD Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">USSD Fallback</h2>
          <p className="text-sm text-gray-600 mb-2">
            USSD support via Africa's Talking enables field agents to log visits and support data with basic mobile phones — no smartphone or internet required.
          </p>
          <div className="bg-gray-900 text-green-400 font-mono text-xs rounded-lg p-3 space-y-1">
            <p>*123# → PoliForge Menu</p>
            <p>1. Log Visit</p>
            <p>2. Add Supporter</p>
            <p>3. Report Issue</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Configure your Africa's Talking USSD shortcode in your Netlify environment variables.</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <div className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
              <CheckCircle className="w-4 h-4" /> Settings saved!
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
