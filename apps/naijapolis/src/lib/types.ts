export type ActivityType =
  | 'donation'
  | 'canvass'
  | 'rsvp'
  | 'contact_candidate'
  | 'volunteer_signup'
  | 'incident'
  | 'pledge'

export type SyncStatus = 'synced' | 'pending'
export type Source = 'web' | 'mobile' | 'ussd'
export type SupportLevel = 'strong' | 'lean' | 'neutral' | 'opposed'
export type PaymentChannel = 'paystack' | 'flutterwave' | 'cash' | 'bank_transfer'
export type GoalType = 'donation' | 'volunteers' | 'canvass' | 'rsvp'
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export interface PollingUnit {
  id: string
  pu_code: string
  name: string
  ward: string
  lga: string
  state: string
}

export interface Person {
  id: string
  full_name: string
  phone: string
  email?: string
  polling_unit_id?: string
  tags: string[]
  custom_fields: Record<string, JsonValue>
  created_at: string
}

export interface Activity {
  id: string
  person_id: string
  person_name: string
  type: ActivityType
  metadata: Record<string, JsonValue>
  source: Source
  sync_status: SyncStatus
  created_at: string
}

export interface Transaction {
  id: string
  person_id: string
  person_name: string
  amount: number
  channel: PaymentChannel
  status: 'success' | 'pending' | 'failed'
  reference: string
  fundraiser_id?: string
  created_at: string
}

export interface Pledge {
  id: string
  person_id: string
  person_name: string
  amount: number
  due_date: string
  fulfilled: boolean
  created_at: string
}

export interface Fundraiser {
  id: string
  name: string
  description: string
  goal_amount: number
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  rsvp_count: number
  created_at: string
}

export interface EventRsvp {
  id: string
  event_id: string
  person_id: string
  person_name: string
  created_at: string
}

export interface Goal {
  id: string
  name: string
  description: string
  type: GoalType
  target: number
  current_value: number
  created_at: string
}

export interface CanvassRecord {
  id: string
  person_id: string
  person_name: string
  agent_name: string
  polling_unit_id: string
  polling_unit_name: string
  lat?: number
  lng?: number
  support_level: SupportLevel
  notes: string
  sync_status: SyncStatus
  created_at: string
}

export interface AdvocacyContact {
  id: string
  person_id: string
  person_name: string
  issue: string
  message: string
  created_at: string
}

export interface AppSettings {
  campaign_name: string
  candidate_name: string
  party: string
  timezone: string
  currency: string
  payment_provider: string
  state: string
  lga: string
}
