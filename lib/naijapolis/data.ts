import type { NaijaPolisState, PollingUnit } from './types';

export const POLLING_UNITS: PollingUnit[] = [
  { id: 'pu-1', pu_code: '04/05/001/001', name: 'Surulere Ward 1 PU A', ward: 'Surulere', lga: 'Surulere', state: 'Lagos' },
  { id: 'pu-2', pu_code: '04/05/001/002', name: 'Surulere Ward 1 PU B', ward: 'Surulere', lga: 'Surulere', state: 'Lagos' },
  { id: 'pu-3', pu_code: '01/01/001/001', name: 'Garki Area 1 PU A', ward: 'Garki', lga: 'Municipal Area Council', state: 'FCT Abuja' },
  { id: 'pu-4', pu_code: '19/01/001/001', name: 'Kano Central PU A', ward: 'Kano Central', lga: 'Kano Municipal', state: 'Kano' },
  { id: 'pu-5', pu_code: '17/01/001/001', name: 'Ibadan North PU A', ward: 'Ibadan North', lga: 'Ibadan North', state: 'Oyo' },
  { id: 'pu-6', pu_code: '32/01/001/001', name: 'Port Harcourt City PU A', ward: 'Central', lga: 'Port Harcourt', state: 'Rivers' },
];

export const INITIAL_NAIJAPOLIS_STATE: NaijaPolisState = {
  people: [
    { id: 'p-1', full_name: 'Emeka Okonkwo', phone: '+2348031234567', email: 'emeka@example.com', polling_unit_id: 'pu-1', tags: ['volunteer', 'donor'], custom_fields: {}, created_at: '2026-04-01T08:00:00Z' },
    { id: 'p-2', full_name: 'Aisha Bello', phone: '+2348054321987', email: 'aisha@example.com', polling_unit_id: 'pu-3', tags: ['supporter'], custom_fields: {}, created_at: '2026-04-02T09:00:00Z' },
    { id: 'p-3', full_name: 'Chukwuemeka Eze', phone: '+2348067890123', polling_unit_id: 'pu-1', tags: ['volunteer'], custom_fields: {}, created_at: '2026-04-03T10:00:00Z' },
    { id: 'p-4', full_name: 'Fatima Mohammed', phone: '+2348098765432', email: 'fatima@example.com', polling_unit_id: 'pu-4', tags: ['donor', 'supporter'], custom_fields: {}, created_at: '2026-04-04T11:00:00Z' },
    { id: 'p-5', full_name: 'Tunde Adeyemi', phone: '+2348012345678', polling_unit_id: 'pu-5', tags: ['ward_coordinator'], custom_fields: {}, created_at: '2026-04-05T12:00:00Z' },
    { id: 'p-6', full_name: 'Ngozi Obi', phone: '+2348023456789', email: 'ngozi@example.com', polling_unit_id: 'pu-6', tags: ['donor'], custom_fields: {}, created_at: '2026-04-06T08:00:00Z' },
    { id: 'p-7', full_name: 'Ibrahim Musa', phone: '+2348034567890', polling_unit_id: 'pu-4', tags: ['supporter'], custom_fields: {}, created_at: '2026-04-07T09:00:00Z' },
    { id: 'p-8', full_name: 'Chidinma Nwosu', phone: '+2348045678901', email: 'chidinma@example.com', polling_unit_id: 'pu-1', tags: ['volunteer', 'canvasser'], custom_fields: {}, created_at: '2026-04-08T10:00:00Z' },
  ],
  activities: [
    { id: 'a-1', person_id: 'p-1', person_name: 'Emeka Okonkwo', type: 'donation', metadata: { amount: 50000, channel: 'paystack' }, source: 'web', sync_status: 'synced', created_at: '2026-04-30T08:30:00Z' },
    { id: 'a-2', person_id: 'p-2', person_name: 'Aisha Bello', type: 'volunteer_signup', metadata: { role: 'Ward Coordinator' }, source: 'web', sync_status: 'synced', created_at: '2026-04-30T09:15:00Z' },
    { id: 'a-3', person_id: 'p-3', person_name: 'Chukwuemeka Eze', type: 'canvass', metadata: { polling_unit: 'Surulere Ward 1 PU A', support_level: 'strong' }, source: 'mobile', sync_status: 'synced', created_at: '2026-04-30T10:00:00Z' },
    { id: 'a-4', person_id: 'p-4', person_name: 'Fatima Mohammed', type: 'rsvp', metadata: { event: 'Campaign Rally - Kano', event_id: 'e-1' }, source: 'web', sync_status: 'synced', created_at: '2026-04-30T11:00:00Z' },
    { id: 'a-5', person_id: 'p-5', person_name: 'Tunde Adeyemi', type: 'donation', metadata: { amount: 100000, channel: 'bank_transfer' }, source: 'web', sync_status: 'synced', created_at: '2026-04-30T12:00:00Z' },
    { id: 'a-6', person_id: 'p-6', person_name: 'Ngozi Obi', type: 'contact_candidate', metadata: { issue: 'Infrastructure', message: 'We need better roads in GRA' }, source: 'web', sync_status: 'synced', created_at: '2026-05-01T08:00:00Z' },
    { id: 'a-7', person_id: 'p-7', person_name: 'Ibrahim Musa', type: 'pledge', metadata: { amount: 25000 }, source: 'ussd', sync_status: 'pending', created_at: '2026-05-01T09:30:00Z' },
    { id: 'a-8', person_id: 'p-8', person_name: 'Chidinma Nwosu', type: 'canvass', metadata: { polling_unit: 'Surulere Ward 1 PU B', support_level: 'lean' }, source: 'mobile', sync_status: 'pending', created_at: '2026-05-01T10:00:00Z' },
    { id: 'a-9', person_id: 'p-1', person_name: 'Emeka Okonkwo', type: 'rsvp', metadata: { event: 'Town Hall - Lagos', event_id: 'e-2' }, source: 'web', sync_status: 'synced', created_at: '2026-05-01T11:00:00Z' },
    { id: 'a-10', person_id: 'p-4', person_name: 'Fatima Mohammed', type: 'donation', metadata: { amount: 75000, channel: 'paystack' }, source: 'web', sync_status: 'synced', created_at: '2026-05-02T07:00:00Z' },
  ],
  transactions: [
    { id: 't-1', person_id: 'p-1', person_name: 'Emeka Okonkwo', amount: 50000, channel: 'paystack', status: 'successful', reference: 'PAY-001-2026', fundraiser_id: 'f-1', created_at: '2026-04-30T08:30:00Z' },
    { id: 't-2', person_id: 'p-5', person_name: 'Tunde Adeyemi', amount: 100000, channel: 'bank_transfer', status: 'successful', reference: 'BT-002-2026', fundraiser_id: 'f-1', created_at: '2026-04-30T12:00:00Z' },
    { id: 't-3', person_id: 'p-4', person_name: 'Fatima Mohammed', amount: 75000, channel: 'paystack', status: 'successful', reference: 'PAY-003-2026', fundraiser_id: 'f-2', created_at: '2026-05-02T07:00:00Z' },
    { id: 't-4', person_id: 'p-2', person_name: 'Aisha Bello', amount: 30000, channel: 'flutterwave', status: 'pending', reference: 'FLW-004-2026', created_at: '2026-05-02T09:00:00Z' },
  ],
  pledges: [
    { id: 'pl-1', person_id: 'p-7', person_name: 'Ibrahim Musa', amount: 25000, due_date: '2026-05-15', fulfilled: false, created_at: '2026-05-01T09:30:00Z' },
    { id: 'pl-2', person_id: 'p-3', person_name: 'Chukwuemeka Eze', amount: 15000, due_date: '2026-05-10', fulfilled: false, created_at: '2026-05-01T10:00:00Z' },
  ],
  fundraisers: [
    { id: 'f-1', name: 'Q2 Campaign Fund', description: 'Main campaign fundraising drive', goal_amount: 5000000, created_at: '2026-04-01T00:00:00Z' },
    { id: 'f-2', name: 'Media Campaign', description: 'TV, radio and digital media spend', goal_amount: 2000000, created_at: '2026-04-15T00:00:00Z' },
  ],
  events: [
    { id: 'e-1', title: 'Campaign Rally - Kano', description: 'Major rally at Sani Abacha Stadium', location: 'Sani Abacha Stadium, Kano', date: '2026-05-15T10:00:00Z', rsvp_count: 1, created_at: '2026-04-20T00:00:00Z' },
    { id: 'e-2', title: 'Town Hall - Lagos', description: 'Community engagement at Tafawa Balewa Square', location: 'Tafawa Balewa Square, Lagos', date: '2026-05-20T14:00:00Z', rsvp_count: 1, created_at: '2026-04-22T00:00:00Z' },
    { id: 'e-3', title: 'Volunteer Training - Abuja', description: 'Training for campaign volunteers', location: 'Campaign HQ, Abuja', date: '2026-05-08T09:00:00Z', rsvp_count: 0, created_at: '2026-04-25T00:00:00Z' },
  ],
  event_rsvps: [
    { id: 'er-1', event_id: 'e-1', person_id: 'p-4', person_name: 'Fatima Mohammed', created_at: '2026-04-30T11:00:00Z' },
    { id: 'er-2', event_id: 'e-2', person_id: 'p-1', person_name: 'Emeka Okonkwo', created_at: '2026-05-01T11:00:00Z' },
  ],
  goals: [
    { id: 'g-1', name: 'Q2 Fundraising Target', description: 'Raise NGN 5M for Q2 campaign operations', type: 'donation', target: 5000000, current_value: 255000, created_at: '2026-04-01T00:00:00Z' },
    { id: 'g-2', name: 'Volunteer Recruitment', description: 'Recruit 500 active volunteers', type: 'volunteers', target: 500, current_value: 48, created_at: '2026-04-01T00:00:00Z' },
    { id: 'g-3', name: 'Door-Knock Drive', description: 'Complete 10,000 canvass visits', type: 'canvass', target: 10000, current_value: 1240, created_at: '2026-04-15T00:00:00Z' },
    { id: 'g-4', name: 'Rally RSVPs', description: 'Get 5,000 RSVPs for major rallies', type: 'rsvp', target: 5000, current_value: 2, created_at: '2026-04-20T00:00:00Z' },
  ],
  canvass_records: [
    { id: 'c-1', person_id: 'p-3', person_name: 'Chukwuemeka Eze', agent_name: 'Chukwuemeka Eze', polling_unit_id: 'pu-1', polling_unit_name: 'Surulere Ward 1 PU A', lat: 6.5009, lng: 3.3544, support_level: 'strong', notes: 'Very supportive, will bring family to vote', sync_status: 'synced', created_at: '2026-04-30T10:00:00Z' },
    { id: 'c-2', person_id: 'p-8', person_name: 'Chidinma Nwosu', agent_name: 'Chidinma Nwosu', polling_unit_id: 'pu-2', polling_unit_name: 'Surulere Ward 1 PU B', lat: 6.5012, lng: 3.3548, support_level: 'lean', notes: 'Undecided but leaning our way', sync_status: 'pending', created_at: '2026-05-01T10:00:00Z' },
  ],
  advocacy_contacts: [
    { id: 'av-1', person_id: 'p-6', person_name: 'Ngozi Obi', issue: 'Infrastructure', message: 'We need better roads in GRA area. The roads have been in disrepair for years.', source: 'manual', status: 'new', created_at: '2026-05-01T08:00:00Z' },
  ],
  whatsapp_messages: [
    { id: 'wm-1', contact_id: 'av-1', person_id: 'p-6', person_name: 'Ngozi Obi', phone: '+2348023456789', issue: 'Infrastructure', message: 'Please raise the bad roads around GRA at the next town hall.', direction: 'incoming', status: 'in_review', created_at: '2026-05-01T08:05:00Z' },
  ],
  self_determinations: [
    {
      id: 'sd-1',
      title: 'Run a voter-first campaign',
      category: 'pledge',
      description: 'Every field decision should be traceable to voter needs captured through canvassing, advocacy, events, and WhatsApp intake.',
      owner: 'Campaign Director',
      status: 'active',
      created_at: '2026-05-01T08:00:00Z',
    },
    {
      id: 'sd-2',
      title: 'Keep finance records transparent',
      category: 'boundary',
      description: 'All donations, pledges, and pending contributions must be logged with donor, channel, amount, and status before campaign spending decisions.',
      owner: 'Finance Lead',
      status: 'monitoring',
      created_at: '2026-05-01T08:10:00Z',
    },
  ],
  settings: {
    platform_name: 'NaijaPolis',
    campaign_name: 'NaijaPolis Campaign 2027',
    candidate_name: 'Hon. Candidate Name',
    party: 'Your Party',
    campaign_slogan: 'People. Data. Progress.',
    mission_statement: 'Organize a transparent, community-led campaign that listens first and acts with measurable accountability.',
    target_voter_segment: 'Undecided urban and peri-urban voters, first-time voters, volunteers, and community association leaders.',
    priority_wards: 'Surulere Ward 1, Garki Area 1, Kano Central',
    decision_rules: 'Prioritize issues with high WhatsApp volume, strong canvassing feedback, and direct event attendance signals.',
    victory_threshold: 250000,
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    payment_provider: 'paystack',
    state: 'Lagos',
    lga: 'Surulere',
    whatsapp_number: '+2348064852108',
    require_share_confirmation: true,
    session_lock_enabled: false,
    operator_pin: '',
    data_retention_days: 365,
  },
  audit_log: [
    { id: 'audit-1', action: 'seed', module: 'settings', detail: 'Demo workspace initialized', created_at: '2026-05-01T08:00:00Z' },
  ],
};
