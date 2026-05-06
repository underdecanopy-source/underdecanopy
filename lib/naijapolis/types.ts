export type ModuleId =
  | 'activity'
  | 'people'
  | 'finance'
  | 'events'
  | 'goals'
  | 'canvassing'
  | 'advocacy'
  | 'reports'
  | 'settings';

export type ActivityType =
  | 'donation'
  | 'canvass'
  | 'rsvp'
  | 'contact_candidate'
  | 'volunteer_signup'
  | 'incident'
  | 'pledge'
  | 'whatsapp_message'
  | 'whatsapp_response'
  | 'settings_update'
  | 'report_export';

export type SyncStatus = 'synced' | 'pending';
export type Source = 'web' | 'mobile' | 'ussd' | 'whatsapp';
export type SupportLevel = 'strong' | 'lean' | 'neutral' | 'opposed';
export type PaymentChannel = 'paystack' | 'flutterwave' | 'cash' | 'bank_transfer' | 'ussd' | 'other';
export type DonationStatus = 'successful' | 'pending' | 'pledged';
export type GoalType =
  | 'donation'
  | 'volunteers'
  | 'canvass'
  | 'rsvp'
  | 'advocacy'
  | 'whatsapp_response'
  | 'events'
  | 'people';
export type WhatsAppDirection = 'incoming' | 'outgoing';
export type WhatsAppStatus = 'new' | 'in_review' | 'responded';
export type DeterminationCategory = 'priority' | 'pledge' | 'boundary' | 'message' | 'risk';
export type DeterminationStatus = 'active' | 'monitoring' | 'complete';

export interface PollingUnit {
  id: string;
  pu_code: string;
  name: string;
  ward: string;
  lga: string;
  state: string;
}

export interface Person {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  state?: string;
  lga?: string;
  ward?: string;
  polling_unit_id?: string;
  tags: string[];
  custom_fields: Record<string, unknown>;
  created_at: string;
}

export interface Activity {
  id: string;
  person_id: string;
  person_name: string;
  type: ActivityType;
  metadata: Record<string, unknown>;
  source: Source;
  sync_status: SyncStatus;
  created_at: string;
}

export interface Transaction {
  id: string;
  person_id: string;
  person_name: string;
  amount: number;
  channel: PaymentChannel;
  status: DonationStatus;
  reference: string;
  fundraiser_id?: string;
  created_at: string;
}

export interface Pledge {
  id: string;
  person_id: string;
  person_name: string;
  amount: number;
  due_date: string;
  fulfilled: boolean;
  created_at: string;
}

export interface Fundraiser {
  id: string;
  name: string;
  description: string;
  goal_amount: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  rsvp_count: number;
  created_at: string;
}

export interface EventRsvp {
  id: string;
  event_id: string;
  person_id: string;
  person_name: string;
  created_at: string;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  type: GoalType;
  target: number;
  current_value: number;
  created_at: string;
}

export interface CampaignSelfDetermination {
  id: string;
  title: string;
  category: DeterminationCategory;
  description: string;
  owner: string;
  status: DeterminationStatus;
  created_at: string;
}

export interface CanvassRecord {
  id: string;
  person_id: string;
  person_name: string;
  agent_name: string;
  polling_unit_id: string;
  polling_unit_name: string;
  lat?: number;
  lng?: number;
  support_level: SupportLevel;
  notes: string;
  sync_status: SyncStatus;
  created_at: string;
}

export interface AdvocacyContact {
  id: string;
  person_id: string;
  person_name: string;
  issue: string;
  message: string;
  source: 'manual' | 'whatsapp';
  status: WhatsAppStatus;
  created_at: string;
}

export interface WhatsAppMessage {
  id: string;
  contact_id?: string;
  person_id?: string;
  person_name: string;
  phone: string;
  issue: string;
  message: string;
  response?: string;
  direction: WhatsAppDirection;
  status: WhatsAppStatus;
  created_at: string;
  responded_at?: string;
}

export interface AppSettings {
  platform_name: string;
  campaign_name: string;
  candidate_name: string;
  party: string;
  campaign_slogan: string;
  mission_statement: string;
  target_voter_segment: string;
  priority_wards: string;
  decision_rules: string;
  victory_threshold: number;
  timezone: string;
  currency: string;
  payment_provider: string;
  state: string;
  lga: string;
  whatsapp_number: string;
  require_share_confirmation: boolean;
  session_lock_enabled: boolean;
  operator_pin: string;
  data_retention_days: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  module: ModuleId;
  detail: string;
  created_at: string;
}

export interface NaijaPolisState {
  people: Person[];
  activities: Activity[];
  transactions: Transaction[];
  pledges: Pledge[];
  fundraisers: Fundraiser[];
  events: Event[];
  event_rsvps: EventRsvp[];
  goals: Goal[];
  canvass_records: CanvassRecord[];
  advocacy_contacts: AdvocacyContact[];
  whatsapp_messages: WhatsAppMessage[];
  self_determinations: CampaignSelfDetermination[];
  settings: AppSettings;
  audit_log: AuditEntry[];
}
