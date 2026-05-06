import type {
  Activity,
  AdvocacyContact,
  CanvassRecord,
  Event,
  EventRsvp,
  Fundraiser,
  Goal,
  NaijaPolisState,
  PaymentChannel,
  Pledge,
  PollingUnit,
  SupportLevel,
  Transaction,
  WhatsAppMessage,
} from './types';

const FIRST_NAMES = [
  'Adaeze',
  'Aisha',
  'Amaka',
  'Bassey',
  'Chioma',
  'David',
  'Emeka',
  'Fatima',
  'Ibrahim',
  'Ngozi',
];

const LAST_NAMES = [
  'Adeyemi',
  'Bello',
  'Chukwu',
  'Danjuma',
  'Eze',
  'Folorunso',
  'Garba',
  'Hassan',
  'Iloh',
  'Johnson',
];

const ISSUE_OPTIONS = [
  'Infrastructure',
  'Education',
  'Healthcare',
  'Security',
  'Unemployment',
  'Agriculture',
  'Power Supply',
  'Water Supply',
];

const SUPPORT_LEVELS: SupportLevel[] = ['strong', 'lean', 'neutral', 'opposed'];
const TRANSACTION_CHANNELS: PaymentChannel[] = ['paystack', 'flutterwave', 'bank_transfer', 'cash', 'ussd', 'other'];

export const POLLING_UNITS: PollingUnit[] = [
  {
    id: 'pu-1',
    pu_code: '24/14/01/001',
    name: 'Adeniran Ogunsanya Primary School PU A',
    ward: 'Adeniran Ogunsanya',
    lga: 'Surulere',
    state: 'Lagos',
  },
  {
    id: 'pu-2',
    pu_code: '24/14/01/002',
    name: 'Adeniran Ogunsanya Primary School PU B',
    ward: 'Adeniran Ogunsanya',
    lga: 'Surulere',
    state: 'Lagos',
  },
  {
    id: 'pu-3',
    pu_code: '24/14/02/001',
    name: 'Aguda Civic Centre PU A',
    ward: 'Aguda',
    lga: 'Surulere',
    state: 'Lagos',
  },
  {
    id: 'pu-4',
    pu_code: '37/02/01/001',
    name: 'Garki Area 1 PU A',
    ward: 'Garki',
    lga: 'Municipal Area Council',
    state: 'FCT Abuja',
  },
  {
    id: 'pu-5',
    pu_code: '37/02/02/001',
    name: 'Wuse Market PU A',
    ward: 'Wuse',
    lga: 'Municipal Area Council',
    state: 'FCT Abuja',
  },
  {
    id: 'pu-6',
    pu_code: '20/08/01/001',
    name: 'Kofar Mata PU A',
    ward: 'Kano Central',
    lga: 'Kano Municipal',
    state: 'Kano',
  },
  {
    id: 'pu-7',
    pu_code: '20/11/03/001',
    name: 'Fagge Model School PU A',
    ward: 'Fagge',
    lga: 'Fagge',
    state: 'Kano',
  },
  {
    id: 'pu-8',
    pu_code: '31/11/01/001',
    name: 'Agodi Gate PU A',
    ward: 'Agodi',
    lga: 'Ibadan North',
    state: 'Oyo',
  },
  {
    id: 'pu-9',
    pu_code: '31/11/02/001',
    name: 'Bodija Market PU A',
    ward: 'Bodija',
    lga: 'Ibadan North',
    state: 'Oyo',
  },
  {
    id: 'pu-10',
    pu_code: '33/15/01/001',
    name: 'Township Community Hall PU A',
    ward: 'Township',
    lga: 'Port Harcourt',
    state: 'Rivers',
  },
  {
    id: 'pu-11',
    pu_code: '33/15/02/001',
    name: 'Diobu Civic Centre PU A',
    ward: 'Diobu',
    lga: 'Port Harcourt',
    state: 'Rivers',
  },
  {
    id: 'pu-12',
    pu_code: '28/01/01/001',
    name: 'Ake Palace PU A',
    ward: 'Ake',
    lga: 'Abeokuta South',
    state: 'Ogun',
  },
  {
    id: 'pu-13',
    pu_code: '28/01/02/001',
    name: 'Kuto Hall PU A',
    ward: 'Kuto',
    lga: 'Abeokuta South',
    state: 'Ogun',
  },
];

const FUNDRAISERS: Fundraiser[] = [
  {
    id: 'f-1',
    name: 'Q2 Field Mobilisation',
    description: 'Ward, LGA and polling unit outreach operations across priority locations.',
    goal_amount: 6000000,
    created_at: '2026-04-01T00:00:00.000Z',
  },
  {
    id: 'f-2',
    name: 'Media and Visibility Push',
    description: 'Radio, digital, print and event visibility spend.',
    goal_amount: 3500000,
    created_at: '2026-04-08T00:00:00.000Z',
  },
  {
    id: 'f-3',
    name: 'Volunteer Logistics Pool',
    description: 'Transport, refreshments and volunteer materials.',
    goal_amount: 1800000,
    created_at: '2026-04-15T00:00:00.000Z',
  },
];

const BASE_EVENTS: Event[] = [
  {
    id: 'e-1',
    title: 'Town Hall - Lagos',
    description: 'Community listening session with market leaders and youth groups.',
    location: 'Surulere Civic Hall, Lagos',
    date: '2026-05-20T14:00:00.000Z',
    rsvp_count: 0,
    created_at: '2026-04-20T00:00:00.000Z',
  },
  {
    id: 'e-2',
    title: 'Volunteer Training - Abuja',
    description: 'Ward and polling unit operations training for coordinators.',
    location: 'Campaign HQ, Abuja',
    date: '2026-05-12T09:00:00.000Z',
    rsvp_count: 0,
    created_at: '2026-04-22T00:00:00.000Z',
  },
  {
    id: 'e-3',
    title: 'Canvass Briefing - Kano',
    description: 'Door-to-door mobilisation briefing for field teams.',
    location: 'Kano Municipal Secretariat',
    date: '2026-05-18T10:30:00.000Z',
    rsvp_count: 0,
    created_at: '2026-04-24T00:00:00.000Z',
  },
  {
    id: 'e-4',
    title: 'Donor Dinner - Port Harcourt',
    description: 'Finance transparency dinner with major donors and prospects.',
    location: 'GRA Conference Centre, Port Harcourt',
    date: '2026-05-25T18:00:00.000Z',
    rsvp_count: 0,
    created_at: '2026-04-26T00:00:00.000Z',
  },
];

function buildSeedDate(dayOffset: number, hour: number, minute: number) {
  return new Date(Date.UTC(2026, 3, 1 + dayOffset, hour, minute, 0)).toISOString();
}

function slugifyName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
}

function buildPhone(index: number) {
  const localNumber = String(700000000 + index).padStart(9, '0');
  return `+2348${localNumber}`;
}

function buildTags(index: number) {
  const tags = new Set<string>();

  if (index % 2 === 0) tags.add('supporter');
  if (index % 3 === 0) tags.add('volunteer');
  if (index % 4 === 0) tags.add('donor');
  if (index % 5 === 0) tags.add('canvasser');
  if (index % 11 === 0) tags.add('ward_coordinator');
  if (tags.size === 0) tags.add('supporter');

  return Array.from(tags);
}

function createPeople() {
  return FIRST_NAMES.flatMap((firstName, firstNameIndex) =>
    LAST_NAMES.map((lastName, lastNameIndex) => {
      const index = firstNameIndex * LAST_NAMES.length + lastNameIndex;
      const pollingUnit = POLLING_UNITS[index % POLLING_UNITS.length];
      const fullName = `${firstName} ${lastName}`;

      return {
        id: `p-${index + 1}`,
        full_name: fullName,
        phone: buildPhone(index),
        email: index % 5 === 0 ? undefined : `${slugifyName(fullName)}@example.com`,
        state: pollingUnit.state,
        lga: pollingUnit.lga,
        ward: pollingUnit.ward,
        polling_unit_id: pollingUnit.id,
        tags: buildTags(index),
        custom_fields: {
          segment: index % 2 === 0 ? 'urban' : 'peri-urban',
          source: 'demo-seed',
        },
        created_at: buildSeedDate(index % 28, 8 + (index % 8), (index * 7) % 60),
      };
    }),
  );
}

const PEOPLE = createPeople();

function createTransactions(people: typeof PEOPLE) {
  return people
    .filter((person) => person.tags.includes('donor'))
    .slice(0, 24)
    .map<Transaction>((person, index) => ({
      id: `t-${index + 1}`,
      person_id: person.id,
      person_name: person.full_name,
      amount: 15000 + (index % 6) * 10000 + Math.floor(index / 6) * 5000,
      channel: TRANSACTION_CHANNELS[index % TRANSACTION_CHANNELS.length],
      status: index % 5 === 0 ? 'pending' : 'successful',
      reference: `NP-${String(index + 1).padStart(3, '0')}-2026`,
      fundraiser_id: FUNDRAISERS[index % FUNDRAISERS.length]?.id,
      created_at: buildSeedDate(16 + (index % 12), 9 + (index % 6), (index * 13) % 60),
    }));
}

function createPledges(people: typeof PEOPLE) {
  return people
    .filter((person) => person.tags.includes('donor'))
    .slice(24, 32)
    .map<Pledge>((person, index) => ({
      id: `pl-${index + 1}`,
      person_id: person.id,
      person_name: person.full_name,
      amount: 25000 + index * 5000,
      due_date: new Date(Date.UTC(2026, 4, 12 + index)).toISOString(),
      fulfilled: index % 6 === 0,
      created_at: buildSeedDate(18 + index, 11, (index * 9) % 60),
    }));
}

function createEventRsvps(people: typeof PEOPLE) {
  return people.slice(0, 28).map<EventRsvp>((person, index) => {
    const event = BASE_EVENTS[index % BASE_EVENTS.length];

    return {
      id: `er-${index + 1}`,
      event_id: event.id,
      person_id: person.id,
      person_name: person.full_name,
      created_at: buildSeedDate(20 + (index % 8), 10 + (index % 4), (index * 5) % 60),
    };
  });
}

function applyRsvpCounts(events: Event[], rsvps: EventRsvp[]) {
  return events.map((event) => ({
    ...event,
    rsvp_count: rsvps.filter((rsvp) => rsvp.event_id === event.id).length,
  }));
}

function createCanvassRecords(people: typeof PEOPLE) {
  const canvasserPool = people.filter((person) => person.tags.includes('canvasser'));

  return people.slice(10, 46).map<CanvassRecord>((person, index) => {
    const pollingUnit = POLLING_UNITS[(index + 2) % POLLING_UNITS.length];
    const agent = canvasserPool[index % canvasserPool.length] ?? person;

    return {
      id: `c-${index + 1}`,
      person_id: person.id,
      person_name: person.full_name,
      agent_name: agent.full_name,
      polling_unit_id: pollingUnit.id,
      polling_unit_name: pollingUnit.name,
      support_level: SUPPORT_LEVELS[index % SUPPORT_LEVELS.length],
      notes:
        SUPPORT_LEVELS[index % SUPPORT_LEVELS.length] === 'strong'
          ? 'Ready to mobilize family and neighbours.'
          : SUPPORT_LEVELS[index % SUPPORT_LEVELS.length] === 'lean'
            ? 'Open to follow-up messaging before election day.'
            : SUPPORT_LEVELS[index % SUPPORT_LEVELS.length] === 'neutral'
              ? 'Needs more policy and credibility information.'
              : 'Currently leaning opposition, retain in watchlist.',
      sync_status: index % 4 === 0 ? 'pending' : 'synced',
      created_at: buildSeedDate(14 + (index % 14), 8 + (index % 7), (index * 3) % 60),
    };
  });
}

function createAdvocacyContacts(people: typeof PEOPLE) {
  return people.slice(18, 30).map<AdvocacyContact>((person, index) => ({
    id: `av-${index + 1}`,
    person_id: person.id,
    person_name: person.full_name,
    issue: ISSUE_OPTIONS[index % ISSUE_OPTIONS.length],
    message: `${person.full_name} flagged ${ISSUE_OPTIONS[index % ISSUE_OPTIONS.length].toLowerCase()} as a top ward priority.`,
    source: index % 3 === 0 ? 'whatsapp' : 'manual',
    status: index % 3 === 0 ? 'in_review' : index % 4 === 0 ? 'responded' : 'new',
    created_at: buildSeedDate(19 + (index % 10), 12 + (index % 5), (index * 4) % 60),
  }));
}

function createWhatsAppMessages(contacts: AdvocacyContact[], people: typeof PEOPLE) {
  return contacts.slice(0, 10).map<WhatsAppMessage>((contact, index) => {
    const person = people.find((item) => item.id === contact.person_id) ?? people[0];
    const responded = index % 3 === 0;

    return {
      id: `wm-${index + 1}`,
      contact_id: contact.id,
      person_id: person.id,
      person_name: person.full_name,
      phone: person.phone,
      issue: contact.issue,
      message: `Please keep ${contact.issue.toLowerCase()} on the campaign issue tracker for ${person.ward}.`,
      response: responded ? `Issue received and routed to the ${person.lga} follow-up desk.` : undefined,
      direction: 'incoming',
      status: responded ? 'responded' : index % 2 === 0 ? 'in_review' : 'new',
      created_at: buildSeedDate(21 + (index % 6), 13 + (index % 4), (index * 6) % 60),
      responded_at: responded ? buildSeedDate(22 + (index % 6), 15, (index * 6) % 60) : undefined,
    };
  });
}

function sortNewest<T extends { created_at: string }>(items: T[]) {
  return [...items].sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());
}

function createActivities(
  people: typeof PEOPLE,
  transactions: Transaction[],
  pledges: Pledge[],
  eventRsvps: EventRsvp[],
  canvassRecords: ReturnType<typeof createCanvassRecords>,
  advocacyContacts: AdvocacyContact[],
  whatsappMessages: WhatsAppMessage[],
  events: Event[],
) {
  const volunteerActivities: Activity[] = people
    .filter((person) => person.tags.includes('volunteer'))
    .slice(0, 16)
    .map((person, index) => ({
      id: `a-vol-${index + 1}`,
      person_id: person.id,
      person_name: person.full_name,
      type: 'volunteer_signup',
      metadata: { role: person.tags.includes('ward_coordinator') ? 'Ward Coordinator' : 'Volunteer' },
      source: 'web',
      sync_status: 'synced',
      created_at: buildSeedDate(10 + (index % 12), 9 + (index % 4), (index * 8) % 60),
    }));

  const donationActivities: Activity[] = transactions.slice(0, 18).map((transaction, index) => ({
    id: `a-don-${index + 1}`,
    person_id: transaction.person_id,
    person_name: transaction.person_name,
    type: 'donation',
    metadata: {
      amount: transaction.amount,
      channel: transaction.channel,
      status: transaction.status,
    },
    source: index % 4 === 0 ? 'mobile' : 'web',
    sync_status: transaction.status === 'pending' ? 'pending' : 'synced',
    created_at: transaction.created_at,
  }));

  const pledgeActivities: Activity[] = pledges.slice(0, 6).map((pledge, index) => ({
    id: `a-pl-${index + 1}`,
    person_id: pledge.person_id,
    person_name: pledge.person_name,
    type: 'pledge',
    metadata: { amount: pledge.amount, due_date: pledge.due_date },
    source: index % 2 === 0 ? 'ussd' : 'web',
    sync_status: 'synced',
    created_at: pledge.created_at,
  }));

  const canvassActivities: Activity[] = canvassRecords.slice(0, 16).map((record, index) => ({
    id: `a-can-${index + 1}`,
    person_id: record.person_id,
    person_name: record.person_name,
    type: 'canvass',
    metadata: { polling_unit: record.polling_unit_name, support_level: record.support_level },
    source: index % 3 === 0 ? 'mobile' : 'web',
    sync_status: record.sync_status,
    created_at: record.created_at,
  }));

  const rsvpActivities: Activity[] = eventRsvps.slice(0, 14).map((rsvp, index) => ({
    id: `a-rsvp-${index + 1}`,
    person_id: rsvp.person_id,
    person_name: rsvp.person_name,
    type: 'rsvp',
    metadata: {
      event: events.find((event) => event.id === rsvp.event_id)?.title ?? 'Campaign Event',
      event_id: rsvp.event_id,
    },
    source: 'web',
    sync_status: 'synced',
    created_at: rsvp.created_at,
  }));

  const advocacyActivities: Activity[] = advocacyContacts.slice(0, 10).map((contact, index) => ({
    id: `a-adv-${index + 1}`,
    person_id: contact.person_id,
    person_name: contact.person_name,
    type: 'contact_candidate',
    metadata: { issue: contact.issue, message: contact.message },
    source: contact.source === 'manual' ? 'web' : 'whatsapp',
    sync_status: contact.status === 'new' ? 'pending' : 'synced',
    created_at: contact.created_at,
  }));

  const whatsappActivities: Activity[] = whatsappMessages.slice(0, 8).map((message, index) => ({
    id: `a-wm-${index + 1}`,
    person_id: message.person_id ?? `whatsapp-${index + 1}`,
    person_name: message.person_name,
    type: message.status === 'responded' ? 'whatsapp_response' : 'whatsapp_message',
    metadata: { issue: message.issue, status: message.status },
    source: 'whatsapp',
    sync_status: message.status === 'new' ? 'pending' : 'synced',
    created_at: message.responded_at ?? message.created_at,
  }));

  return sortNewest([
    ...volunteerActivities,
    ...donationActivities,
    ...pledgeActivities,
    ...canvassActivities,
    ...rsvpActivities,
    ...advocacyActivities,
    ...whatsappActivities,
  ]);
}

const TRANSACTIONS = createTransactions(PEOPLE);
const PLEDGES = createPledges(PEOPLE);
const EVENT_RSVPS = createEventRsvps(PEOPLE);
const EVENTS = applyRsvpCounts(BASE_EVENTS, EVENT_RSVPS);
const CANVASS_RECORDS = createCanvassRecords(PEOPLE);
const ADVOCACY_CONTACTS = createAdvocacyContacts(PEOPLE);
const WHATSAPP_MESSAGES = createWhatsAppMessages(ADVOCACY_CONTACTS, PEOPLE);
const ACTIVITIES = createActivities(
  PEOPLE,
  TRANSACTIONS,
  PLEDGES,
  EVENT_RSVPS,
  CANVASS_RECORDS,
  ADVOCACY_CONTACTS,
  WHATSAPP_MESSAGES,
  EVENTS,
);

const GOALS: Goal[] = [
  {
    id: 'g-1',
    name: 'Fundraising Target',
    description: 'Raise NGN 6M for field, media and volunteer operations.',
    type: 'donation',
    target: 6000000,
    current_value: 0,
    created_at: '2026-04-01T00:00:00.000Z',
  },
  {
    id: 'g-2',
    name: 'Volunteer Recruitment',
    description: 'Recruit and maintain at least 150 active volunteers.',
    type: 'volunteers',
    target: 150,
    current_value: 0,
    created_at: '2026-04-02T00:00:00.000Z',
  },
  {
    id: 'g-3',
    name: 'Canvass Coverage',
    description: 'Complete 2,500 canvass touchpoints in priority wards.',
    type: 'canvass',
    target: 2500,
    current_value: 0,
    created_at: '2026-04-10T00:00:00.000Z',
  },
  {
    id: 'g-4',
    name: 'Event Attendance Pipeline',
    description: 'Capture 500 RSVP records across town halls and briefings.',
    type: 'rsvp',
    target: 500,
    current_value: 0,
    created_at: '2026-04-18T00:00:00.000Z',
  },
];

export const INITIAL_NAIJAPOLIS_STATE: NaijaPolisState = {
  people: PEOPLE,
  activities: ACTIVITIES,
  transactions: TRANSACTIONS,
  pledges: PLEDGES,
  fundraisers: FUNDRAISERS,
  events: EVENTS,
  event_rsvps: EVENT_RSVPS,
  goals: GOALS,
  canvass_records: CANVASS_RECORDS,
  advocacy_contacts: ADVOCACY_CONTACTS,
  whatsapp_messages: WHATSAPP_MESSAGES,
  self_determinations: [
    {
      id: 'sd-1',
      title: 'Run a voter-first campaign',
      category: 'pledge',
      description:
        'Every field decision should be traceable to voter needs captured through canvassing, advocacy, events, and WhatsApp intake.',
      owner: 'Campaign Director',
      status: 'active',
      created_at: '2026-05-01T08:00:00.000Z',
    },
    {
      id: 'sd-2',
      title: 'Keep finance records transparent',
      category: 'boundary',
      description:
        'All donations, pledges, and pending contributions must be logged with donor, channel, amount and status before new spend is approved.',
      owner: 'Finance Lead',
      status: 'monitoring',
      created_at: '2026-05-01T08:10:00.000Z',
    },
    {
      id: 'sd-3',
      title: 'Prioritize convertible neutral voters',
      category: 'priority',
      description:
        'Neutral and leaning respondents in priority wards should receive events, follow-up calls, and issue-specific messaging within 72 hours.',
      owner: 'Field Operations Lead',
      status: 'active',
      created_at: '2026-05-01T08:20:00.000Z',
    },
  ],
  settings: {
    platform_name: 'NaijaPolis',
    campaign_name: 'NaijaPolis Campaign 2027',
    candidate_name: 'Hon. Candidate Name',
    party: 'Your Party',
    campaign_slogan: 'People. Data. Progress.',
    mission_statement:
      'Organize a transparent, community-led campaign that listens first and acts with measurable accountability.',
    target_voter_segment:
      'Undecided urban and peri-urban voters, first-time voters, volunteers, donors, and community association leaders.',
    priority_wards:
      'Adeniran Ogunsanya, Aguda, Garki, Wuse, Kano Central, Township, Ake, Bodija',
    decision_rules:
      'Prioritize issues with strong polling-unit demand, visible finance coverage gaps, event attendance signals, and canvassing momentum.',
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
    {
      id: 'audit-1',
      action: 'seed',
      module: 'settings',
      detail: 'Demo workspace initialized with 100 seeded people and refreshed reporting metrics.',
      created_at: '2026-05-01T08:00:00.000Z',
    },
  ],
};
