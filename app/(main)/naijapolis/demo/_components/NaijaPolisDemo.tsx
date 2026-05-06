'use client';

import {
  Activity,
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  DollarSign,
  Download,
  Flag,
  KeyRound,
  Lock,
  Mail,
  Map,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Target,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ChangeEvent, type ComponentType, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { POLLING_UNITS } from '@/lib/naijapolis/data';
import {
  getCoveredStateOptions,
  getLgaOptions,
  getPersonLocationLabel,
  getPollingUnitById,
  getPollingUnitOptions,
  getWardOptions,
  isPollingUnitSelectionValid,
} from '@/lib/naijapolis/locations';
import {
  buildEventShareText,
  buildMailtoUrl,
  buildWhatsAppUrl,
  cn,
  downloadTextFile,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelative,
  generateId,
  humanizeChannel,
  isValidEmail,
  isValidPhone,
  normalizePhone,
  nowISO,
  sanitizeLongText,
  sanitizeText,
} from '@/lib/naijapolis/utils';
import {
  clearNaijaPolisState,
  getInitialNaijaPolisState,
  loadNaijaPolisState,
  saveNaijaPolisState,
} from '@/lib/naijapolis/store';
import type {
  Activity as CampaignActivity,
  ActivityType,
  AdvocacyContact,
  AppSettings,
  AuditEntry,
  CanvassRecord,
  CampaignSelfDetermination,
  DeterminationCategory,
  DeterminationStatus,
  DonationStatus,
  Event,
  Goal,
  GoalType,
  ModuleId,
  NaijaPolisState,
  PaymentChannel,
  Person,
  SupportLevel,
  Transaction,
  WhatsAppMessage,
  WhatsAppStatus,
} from '@/lib/naijapolis/types';

type IconComponent = ComponentType<{ className?: string }>;

const modules: Array<{ id: ModuleId; label: string; icon: IconComponent }> = [
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'people', label: 'People', icon: Users },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'canvassing', label: 'Canvassing', icon: Map },
  { id: 'advocacy', label: 'Advocacy', icon: Megaphone },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const issueOptions = [
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
];

const MAX_LOGO_FILE_BYTES = 1024 * 1024;

const supportConfig: Record<SupportLevel, { label: string; color: string; bg: string; dot: string }> = {
  strong: { label: 'Strong Support', color: 'text-green-700', bg: 'bg-green-100', dot: 'bg-green-500' },
  lean: { label: 'Leaning', color: 'text-teal-700', bg: 'bg-teal-100', dot: 'bg-teal-500' },
  neutral: { label: 'Neutral', color: 'text-amber-700', bg: 'bg-amber-100', dot: 'bg-amber-500' },
  opposed: { label: 'Opposed', color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500' },
};

const activityConfig: Record<ActivityType, { label: string; color: string; bg: string; icon: IconComponent }> = {
  donation: { label: 'Donation', color: 'text-green-700', bg: 'bg-green-100', icon: DollarSign },
  canvass: { label: 'Canvass', color: 'text-blue-700', bg: 'bg-blue-100', icon: Map },
  rsvp: { label: 'RSVP', color: 'text-purple-700', bg: 'bg-purple-100', icon: Calendar },
  contact_candidate: { label: 'Candidate Contact', color: 'text-amber-700', bg: 'bg-amber-100', icon: Megaphone },
  volunteer_signup: { label: 'Volunteer Signup', color: 'text-teal-700', bg: 'bg-teal-100', icon: Users },
  incident: { label: 'Incident', color: 'text-red-700', bg: 'bg-red-100', icon: AlertCircle },
  pledge: { label: 'Pledge', color: 'text-indigo-700', bg: 'bg-indigo-100', icon: Target },
  whatsapp_message: { label: 'WhatsApp Message', color: 'text-emerald-700', bg: 'bg-emerald-100', icon: MessageCircle },
  whatsapp_response: { label: 'WhatsApp Response', color: 'text-sky-700', bg: 'bg-sky-100', icon: Send },
  settings_update: { label: 'Settings Update', color: 'text-slate-700', bg: 'bg-slate-100', icon: Settings },
  report_export: { label: 'Report Export', color: 'text-violet-700', bg: 'bg-violet-100', icon: Printer },
};

const paymentChannels: Array<{ value: PaymentChannel; label: string }> = [
  { value: 'paystack', label: 'Paystack' },
  { value: 'flutterwave', label: 'Flutterwave' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash', label: 'Cash' },
  { value: 'ussd', label: 'USSD' },
  { value: 'other', label: 'Other' },
];

const donationStatuses: Array<{ value: DonationStatus; label: string }> = [
  { value: 'successful', label: 'Successful' },
  { value: 'pending', label: 'Pending' },
  { value: 'pledged', label: 'Pledged' },
];

const goalTypes: Array<{ value: GoalType; label: string; unit: string }> = [
  { value: 'donation', label: 'Successful Donations', unit: 'currency' },
  { value: 'volunteers', label: 'Volunteers', unit: 'people' },
  { value: 'canvass', label: 'Canvass Visits', unit: 'visits' },
  { value: 'rsvp', label: 'Event RSVPs', unit: 'RSVPs' },
  { value: 'advocacy', label: 'Advocacy Messages', unit: 'messages' },
  { value: 'whatsapp_response', label: 'WhatsApp Responses', unit: 'responses' },
  { value: 'events', label: 'Events Created', unit: 'events' },
  { value: 'people', label: 'People in Database', unit: 'records' },
];

const determinationCategories: Array<{ value: DeterminationCategory; label: string }> = [
  { value: 'priority', label: 'Priority' },
  { value: 'pledge', label: 'Pledge' },
  { value: 'boundary', label: 'Boundary' },
  { value: 'message', label: 'Message' },
  { value: 'risk', label: 'Risk' },
];

const determinationStatuses: Array<{ value: DeterminationStatus; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'complete', label: 'Complete' },
];

type Metrics = ReturnType<typeof getMetrics>;

function audit(module: ModuleId, action: string, detail: string): AuditEntry {
  return {
    id: generateId('audit'),
    action,
    module,
    detail,
    created_at: nowISO(),
  };
}

function sortByDateDesc<T extends { created_at: string }>(items: T[]) {
  return [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

function isValidLogoDataUrl(value: string) {
  return !value || (value.startsWith('data:image/') && value.length <= MAX_LOGO_FILE_BYTES * 2);
}

function countPeopleWithTag(people: Person[], tag: string) {
  return people.filter((person) => person.tags.includes(tag)).length;
}

function getMetrics(state: NaijaPolisState) {
  const successfulTransactions = state.transactions.filter((tx) => tx.status === 'successful');
  const pendingTransactions = state.transactions.filter((tx) => tx.status === 'pending');
  const standalonePledgedTransactions = state.transactions.filter(
    (tx) =>
      tx.status === 'pledged' &&
      !state.pledges.some((pledge) => pledge.person_id === tx.person_id && pledge.amount === tx.amount),
  );
  const totalRaised = successfulTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const pendingAmount = pendingTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const pledgedAmount =
    state.pledges.filter((pledge) => !pledge.fulfilled).reduce((sum, pledge) => sum + pledge.amount, 0) +
    standalonePledgedTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const volunteers = countPeopleWithTag(state.people, 'volunteer');
  const donors = new Set([
    ...state.people.filter((person) => person.tags.includes('donor')).map((person) => person.id),
    ...state.transactions.map((transaction) => transaction.person_id),
    ...state.pledges.map((pledge) => pledge.person_id),
  ]).size;
  const canvassers = new Set([
    ...state.people
      .filter((person) => person.tags.some((tag) => ['canvasser', 'ward_coordinator'].includes(tag)))
      .map((person) => person.id),
    ...state.canvass_records.map((record) => record.agent_name.toLowerCase()),
  ]).size;
  const supporters = countPeopleWithTag(state.people, 'supporter');
  const canvassCount = state.canvass_records.length;
  const rsvps = state.event_rsvps.length;
  const rsvpPeople = new Set(state.event_rsvps.map((rsvp) => rsvp.person_id)).size;
  const support = state.canvass_records.reduce<Record<SupportLevel, number>>(
    (acc, record) => {
      acc[record.support_level] += 1;
      return acc;
    },
    { strong: 0, lean: 0, neutral: 0, opposed: 0 },
  );
  const topIssues = Object.entries(
    state.advocacy_contacts.reduce<Record<string, number>>((acc, contact) => {
      acc[contact.issue] = (acc[contact.issue] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const whatsappOpen = state.whatsapp_messages.filter((message) => message.status !== 'responded').length;
  const whatsappResponses = state.whatsapp_messages.filter((message) => message.status === 'responded').length;
  const upcomingEvents = state.events.filter((event) => new Date(event.date) >= new Date()).length;
  const successfulDonationCount = successfulTransactions.length;
  const pendingDonationCount = pendingTransactions.length;
  const unfulfilledPledgeCount = state.pledges.filter((pledge) => !pledge.fulfilled).length;
  const averageSuccessfulDonation = successfulDonationCount > 0 ? Math.round(totalRaised / successfulDonationCount) : 0;
  const totalCommitted = totalRaised + pendingAmount + pledgedAmount;
  const representedStates = new Set(state.people.map((person) => person.state).filter(Boolean)).size;
  const representedLgas = new Set(
    state.people.map((person) => [person.state, person.lga].filter(Boolean).join('|')).filter(Boolean),
  ).size;
  const representedWards = new Set(
    state.people.map((person) => [person.state, person.lga, person.ward].filter(Boolean).join('|')).filter(Boolean),
  ).size;
  const representedPollingUnits = new Set(state.people.map((person) => person.polling_unit_id).filter(Boolean)).size;

  return {
    totalRaised,
    pendingAmount,
    pledgedAmount,
    totalCommitted,
    volunteers,
    donors,
    canvassers,
    supporters,
    canvassCount,
    rsvps,
    rsvpPeople,
    support,
    topIssues,
    whatsappOpen,
    whatsappResponses,
    upcomingEvents,
    successfulDonationCount,
    pendingDonationCount,
    unfulfilledPledgeCount,
    averageSuccessfulDonation,
    representedStates,
    representedLgas,
    representedWards,
    representedPollingUnits,
    peopleCount: state.people.length,
    eventCount: state.events.length,
    fundraiserCount: state.fundraisers.length,
    advocacyCount: state.advocacy_contacts.length,
    auditCount: state.audit_log.length,
  };
}

function deriveGoals(goals: Goal[], metrics: Metrics) {
  return goals.map((goal) => {
    const current_value = getGoalCurrentValue(goal.type, metrics);
    return { ...goal, current_value };
  });
}

function getGoalCurrentValue(type: GoalType, metrics: Metrics) {
  switch (type) {
    case 'donation':
      return metrics.totalRaised;
    case 'volunteers':
      return metrics.volunteers;
    case 'canvass':
      return metrics.canvassCount;
    case 'rsvp':
      return metrics.rsvps;
    case 'advocacy':
      return metrics.advocacyCount;
    case 'whatsapp_response':
      return metrics.whatsappResponses;
    case 'events':
      return metrics.eventCount;
    case 'people':
      return metrics.peopleCount;
    default:
      return 0;
  }
}

function getGoalTypeLabel(type: GoalType) {
  return goalTypes.find((goalType) => goalType.value === type)?.label ?? type;
}

function formatGoalValue(type: GoalType, value: number, currency: string) {
  return type === 'donation' ? formatCurrency(value, currency) : value.toLocaleString();
}

function getActivitySummary(activity: CampaignActivity, currency: string) {
  const metadata = activity.metadata;
  switch (activity.type) {
    case 'donation':
      return `recorded ${formatCurrency(Number(metadata.amount) || 0, currency)} via ${String(metadata.channel ?? 'channel')}`;
    case 'pledge':
      return `pledged ${formatCurrency(Number(metadata.amount) || 0, currency)}`;
    case 'canvass':
      return `canvassed at ${String(metadata.polling_unit ?? 'polling unit')}`;
    case 'rsvp':
      return `RSVPed to ${String(metadata.event ?? 'event')}`;
    case 'contact_candidate':
      return `raised ${String(metadata.issue ?? 'an issue')}`;
    case 'volunteer_signup':
      return `joined as ${String(metadata.role ?? 'volunteer')}`;
    case 'whatsapp_message':
      return `sent WhatsApp issue: ${String(metadata.issue ?? 'General')}`;
    case 'whatsapp_response':
      return `responded on WhatsApp about ${String(metadata.issue ?? 'an issue')}`;
    case 'settings_update':
      return 'updated campaign settings';
    case 'report_export':
      return 'prepared a report export';
    case 'incident':
      return `reported incident: ${String(metadata.description ?? 'details logged')}`;
    default:
      return 'performed an action';
  }
}

export function NaijaPolisDemo() {
  const [state, setState] = useState<NaijaPolisState>(() => getInitialNaijaPolisState());
  const [hydrated, setHydrated] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleId>('activity');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locked, setLocked] = useState(false);
  const [unlockPin, setUnlockPin] = useState('');
  const [lockError, setLockError] = useState('');

  useEffect(() => {
    setState(loadNaijaPolisState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveNaijaPolisState(state);
  }, [hydrated, state]);

  const metrics = useMemo(() => getMetrics(state), [state]);
  const derivedGoals = useMemo(() => deriveGoals(state.goals, metrics), [state.goals, metrics]);

  function updateState(mutator: (current: NaijaPolisState) => NaijaPolisState) {
    setState((current) => mutator(current));
  }

  function addPerson(data: {
    full_name: string;
    phone: string;
    email?: string;
    state: string;
    lga: string;
    ward: string;
    polling_unit_id?: string;
    tags: string[];
  }) {
    const fullName = sanitizeText(data.full_name, 120);
    const phone = normalizePhone(data.phone);
    const email = data.email?.trim().toLowerCase();
    const stateName = sanitizeText(data.state, 80);
    const lgaName = sanitizeText(data.lga, 120);
    const wardName = sanitizeText(data.ward, 120);
    if (!fullName || !isValidPhone(phone) || !isValidEmail(email)) return 'Enter a valid name, phone and email.';
    if (!stateName || !lgaName || !wardName || !data.polling_unit_id) {
      return 'Select a state, local government area, ward and polling unit.';
    }
    if (
      !isPollingUnitSelectionValid({
        state: stateName,
        lga: lgaName,
        ward: wardName,
        polling_unit_id: data.polling_unit_id,
      })
    ) {
      return 'Selected location fields do not match the polling unit.';
    }

    const person: Person = {
      id: generateId('person'),
      full_name: fullName,
      phone,
      email: email || undefined,
      state: stateName,
      lga: lgaName,
      ward: wardName,
      polling_unit_id: data.polling_unit_id,
      tags: data.tags.map((tag) => sanitizeText(tag.toLowerCase(), 32)).filter(Boolean),
      custom_fields: {},
      created_at: nowISO(),
    };

    const pollingUnit = getPollingUnitById(person.polling_unit_id);

    updateState((current) => ({
      ...current,
      people: [...current.people, person],
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: 'volunteer_signup',
          metadata: {
            role: person.tags[0] ?? 'supporter',
            state: person.state,
            lga: person.lga,
            ward: person.ward,
            polling_unit: pollingUnit?.name,
          },
          source: 'web',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [
        audit(
          'people',
          'create_person',
          `Added ${person.full_name} to ${person.ward}, ${person.lga}${pollingUnit ? ` (${pollingUnit.name})` : ''}`,
        ),
        ...current.audit_log,
      ],
    }));
    return '';
  }

  function addDonation(data: { person_id: string; amount: string; channel: PaymentChannel; status: DonationStatus }) {
    const person = state.people.find((item) => item.id === data.person_id);
    const amount = Number(data.amount);
    if (!person || !Number.isFinite(amount) || amount <= 0) return 'Select a donor and enter a valid amount.';

    const createdAt = nowISO();
    const transaction: Transaction = {
      id: generateId('tx'),
      person_id: person.id,
      person_name: person.full_name,
      amount: Math.round(amount),
      channel: data.channel,
      status: data.status,
      reference: `${data.channel.toUpperCase()}-${Date.now()}`,
      created_at: createdAt,
    };
    const activityType: ActivityType = data.status === 'pledged' ? 'pledge' : 'donation';
    const pledge =
      data.status === 'pledged'
        ? {
            id: generateId('pledge'),
            person_id: person.id,
            person_name: person.full_name,
            amount: Math.round(amount),
            due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            fulfilled: false,
            created_at: createdAt,
          }
        : null;

    updateState((current) => ({
      ...current,
      transactions: [transaction, ...current.transactions],
      pledges: pledge ? [pledge, ...current.pledges] : current.pledges,
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: activityType,
          metadata: { amount: transaction.amount, channel: data.channel, status: data.status },
          source: 'web',
          sync_status: data.status === 'pending' ? 'pending' : 'synced',
          created_at: createdAt,
        },
        ...current.activities,
      ],
      audit_log: [
        audit('finance', 'record_donation', `${person.full_name}: ${formatCurrency(transaction.amount, current.settings.currency)} ${data.status}`),
        ...current.audit_log,
      ],
    }));
    return '';
  }

  function addEvent(data: { title: string; description: string; location: string; date: string }) {
    const title = sanitizeText(data.title, 160);
    const location = sanitizeText(data.location, 180);
    const description = sanitizeLongText(data.description, 700);
    if (!title || !location || !data.date) return 'Title, location and date are required.';

    const event: Event = {
      id: generateId('event'),
      title,
      description,
      location,
      date: new Date(data.date).toISOString(),
      rsvp_count: 0,
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      events: [event, ...current.events],
      audit_log: [audit('events', 'create_event', `Created ${event.title}`), ...current.audit_log],
    }));
    return '';
  }

  function rsvpContact(event: Event, personId: string) {
    const person = state.people.find((item) => item.id === personId);
    if (!person) return 'Select a contact.';
    const rsvp = {
      id: generateId('rsvp'),
      event_id: event.id,
      person_id: person.id,
      person_name: person.full_name,
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      event_rsvps: [rsvp, ...current.event_rsvps],
      events: current.events.map((item) => (item.id === event.id ? { ...item, rsvp_count: item.rsvp_count + 1 } : item)),
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: 'rsvp',
          metadata: { event: event.title, event_id: event.id },
          source: 'web',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('events', 'rsvp', `${person.full_name} RSVP for ${event.title}`), ...current.audit_log],
    }));
    return '';
  }

  function shareEvent(event: Event, personId: string, channel: 'email' | 'whatsapp') {
    const person = state.people.find((item) => item.id === personId);
    if (!person) return 'Select a contact.';
    const body = buildEventShareText(event, state.settings.campaign_name);

    if (state.settings.require_share_confirmation) {
      const confirmed = window.confirm(`Share "${event.title}" with ${person.full_name} by ${channel}?`);
      if (!confirmed) return '';
    }

    if (channel === 'email') {
      if (!person.email) return 'Selected contact has no email address.';
      window.location.href = buildMailtoUrl([person.email], event.title, body);
    } else {
      if (!isValidPhone(person.phone)) return 'Selected contact has no valid WhatsApp phone number.';
      window.open(buildWhatsAppUrl(person.phone, body), '_blank', 'noopener,noreferrer');
      const message: WhatsAppMessage = {
        id: generateId('wm'),
        person_id: person.id,
        person_name: person.full_name,
        phone: person.phone,
        issue: 'Event Share',
        message: body,
        direction: 'outgoing',
        status: 'responded',
        created_at: nowISO(),
        responded_at: nowISO(),
      };
      updateState((current) => ({
        ...current,
        whatsapp_messages: [message, ...current.whatsapp_messages],
      }));
    }

    updateState((current) => ({
      ...current,
      audit_log: [audit('events', `share_${channel}`, `${event.title} shared with ${person.full_name}`), ...current.audit_log],
    }));
    return '';
  }

  function addCanvass(data: {
    person_id: string;
    polling_unit_id: string;
    agent_name: string;
    support_level: SupportLevel;
    notes: string;
    sync_status: 'synced' | 'pending';
  }) {
    const person = state.people.find((item) => item.id === data.person_id);
    const pollingUnit = POLLING_UNITS.find((item) => item.id === data.polling_unit_id);
    if (!person || !pollingUnit) return 'Select a person and polling unit.';

    const record: CanvassRecord = {
      id: generateId('canvass'),
      person_id: person.id,
      person_name: person.full_name,
      agent_name: sanitizeText(data.agent_name || person.full_name, 120),
      polling_unit_id: pollingUnit.id,
      polling_unit_name: pollingUnit.name,
      support_level: data.support_level,
      notes: sanitizeLongText(data.notes, 500),
      sync_status: data.sync_status,
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      canvass_records: [record, ...current.canvass_records],
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: 'canvass',
          metadata: { polling_unit: pollingUnit.name, support_level: data.support_level },
          source: data.sync_status === 'pending' ? 'mobile' : 'web',
          sync_status: data.sync_status,
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('canvassing', 'log_visit', `${person.full_name} at ${pollingUnit.name}`), ...current.audit_log],
    }));
    return '';
  }

  function addManualAdvocacy(data: { person_id: string; issue: string; message: string }) {
    const person = state.people.find((item) => item.id === data.person_id);
    const issue = sanitizeText(data.issue, 120);
    const message = sanitizeLongText(data.message, 800);
    if (!person || !issue || !message) return 'Select a constituent, issue and message.';

    const contact: AdvocacyContact = {
      id: generateId('advocacy'),
      person_id: person.id,
      person_name: person.full_name,
      issue,
      message,
      source: 'manual',
      status: 'new',
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      advocacy_contacts: [contact, ...current.advocacy_contacts],
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: 'contact_candidate',
          metadata: { issue, message },
          source: 'web',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('advocacy', 'new_message', `${person.full_name}: ${issue}`), ...current.audit_log],
    }));
    return '';
  }

  function sendWhatsAppIssue(data: { person_id: string; issue: string; message: string }) {
    const person = state.people.find((item) => item.id === data.person_id);
    const issue = sanitizeText(data.issue, 120);
    const message = sanitizeLongText(data.message, 800);
    if (!person || !issue || !message) return 'Select a constituent, issue and message.';
    if (!isValidPhone(state.settings.whatsapp_number)) return 'Add a valid campaign WhatsApp number in Settings.';

    const contactId = generateId('advocacy');
    const contact: AdvocacyContact = {
      id: contactId,
      person_id: person.id,
      person_name: person.full_name,
      issue,
      message,
      source: 'whatsapp',
      status: 'in_review',
      created_at: nowISO(),
    };
    const whatsappMessage: WhatsAppMessage = {
      id: generateId('wm'),
      contact_id: contactId,
      person_id: person.id,
      person_name: person.full_name,
      phone: person.phone,
      issue,
      message,
      direction: 'incoming',
      status: 'in_review',
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      advocacy_contacts: [contact, ...current.advocacy_contacts],
      whatsapp_messages: [whatsappMessage, ...current.whatsapp_messages],
      activities: [
        {
          id: generateId('activity'),
          person_id: person.id,
          person_name: person.full_name,
          type: 'whatsapp_message',
          metadata: { issue, message, campaign_number: current.settings.whatsapp_number },
          source: 'whatsapp',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('advocacy', 'whatsapp_capture', `${person.full_name}: ${issue}`), ...current.audit_log],
    }));

    window.open(buildWhatsAppUrl(state.settings.whatsapp_number, `${person.full_name}: ${message}`), '_blank', 'noopener,noreferrer');
    return '';
  }

  function respondToWhatsApp(messageId: string, response: string) {
    const cleaned = sanitizeLongText(response, 600);
    const message = state.whatsapp_messages.find((item) => item.id === messageId);
    if (!message || !cleaned) return 'Write a response before sending.';
    if (!isValidPhone(message.phone)) return 'The selected message has no valid WhatsApp phone number.';

    const status: WhatsAppStatus = 'responded';
    updateState((current) => ({
      ...current,
      whatsapp_messages: current.whatsapp_messages.map((item) =>
        item.id === messageId
          ? { ...item, response: cleaned, status, responded_at: nowISO() }
          : item,
      ),
      advocacy_contacts: current.advocacy_contacts.map((contact) =>
        contact.id === message.contact_id ? { ...contact, status } : contact,
      ),
      activities: [
        {
          id: generateId('activity'),
          person_id: message.person_id ?? 'whatsapp',
          person_name: message.person_name,
          type: 'whatsapp_response',
          metadata: { issue: message.issue, response: cleaned },
          source: 'whatsapp',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('advocacy', 'whatsapp_response', `${message.person_name}: ${message.issue}`), ...current.audit_log],
    }));

    window.open(buildWhatsAppUrl(message.phone, cleaned), '_blank', 'noopener,noreferrer');
    return '';
  }

  function saveSettings(settings: AppSettings) {
    const cleaned: AppSettings = {
      ...settings,
      platform_name: sanitizeText(settings.platform_name || 'NaijaPolis', 80),
      campaign_name: sanitizeText(settings.campaign_name || 'Campaign', 120),
      candidate_name: sanitizeText(settings.candidate_name, 120),
      party: sanitizeText(settings.party, 80),
      campaign_logo_data_url: settings.campaign_logo_data_url || '',
      campaign_slogan: sanitizeText(settings.campaign_slogan, 140),
      mission_statement: sanitizeLongText(settings.mission_statement, 700),
      target_voter_segment: sanitizeLongText(settings.target_voter_segment, 500),
      priority_wards: sanitizeLongText(settings.priority_wards, 500),
      decision_rules: sanitizeLongText(settings.decision_rules, 700),
      victory_threshold: Math.max(0, Math.round(Number(settings.victory_threshold) || 0)),
      lga: sanitizeText(settings.lga, 80),
      whatsapp_number: normalizePhone(settings.whatsapp_number),
      operator_pin: sanitizeText(settings.operator_pin, 12),
      data_retention_days: Math.max(30, Math.min(3650, Number(settings.data_retention_days) || 365)),
    };
    if (!isValidPhone(cleaned.whatsapp_number)) return 'Enter a valid WhatsApp number.';
    if (!isValidLogoDataUrl(cleaned.campaign_logo_data_url)) return 'Upload a PNG, JPG, SVG, GIF, or WebP logo under 1MB.';

    updateState((current) => ({
      ...current,
      settings: cleaned,
      activities: [
        {
          id: generateId('activity'),
          person_id: 'settings',
          person_name: cleaned.platform_name,
          type: 'settings_update',
          metadata: {
            platform_name: cleaned.platform_name,
            campaign_name: cleaned.campaign_name,
            logo_uploaded: Boolean(cleaned.campaign_logo_data_url),
          },
          source: 'web',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('settings', 'save_settings', `Updated ${cleaned.platform_name}`), ...current.audit_log],
    }));
    return '';
  }

  function addGoal(data: { name: string; description: string; type: GoalType; target: string }) {
    const name = sanitizeText(data.name, 120);
    const description = sanitizeLongText(data.description, 400);
    const target = Math.round(Number(data.target));
    if (!name || !description || !Number.isFinite(target) || target <= 0) {
      return 'Goal name, description and a positive target are required.';
    }

    const goal: Goal = {
      id: generateId('goal'),
      name,
      description,
      type: data.type,
      target,
      current_value: 0,
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      goals: [goal, ...current.goals],
      audit_log: [audit('settings', 'create_goal', `${goal.name}: ${goal.target}`), ...current.audit_log],
    }));
    return '';
  }

  function updateGoal(goalId: string, data: { name: string; description: string; type: GoalType; target: string }) {
    const name = sanitizeText(data.name, 120);
    const description = sanitizeLongText(data.description, 400);
    const target = Math.round(Number(data.target));
    if (!name || !description || !Number.isFinite(target) || target <= 0) {
      return 'Goal name, description and a positive target are required.';
    }

    updateState((current) => ({
      ...current,
      goals: current.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, name, description, type: data.type, target }
          : goal,
      ),
      audit_log: [audit('settings', 'update_goal', `${name}: ${target}`), ...current.audit_log],
    }));
    return '';
  }

  function deleteGoal(goalId: string) {
    const goal = state.goals.find((item) => item.id === goalId);
    if (!goal) return;
    const confirmed = window.confirm(`Delete goal "${goal.name}"?`);
    if (!confirmed) return;

    updateState((current) => ({
      ...current,
      goals: current.goals.filter((item) => item.id !== goalId),
      audit_log: [audit('settings', 'delete_goal', goal.name), ...current.audit_log],
    }));
  }

  function addDetermination(data: {
    title: string;
    category: DeterminationCategory;
    description: string;
    owner: string;
    status: DeterminationStatus;
  }) {
    const title = sanitizeText(data.title, 120);
    const description = sanitizeLongText(data.description, 500);
    const owner = sanitizeText(data.owner, 80);
    if (!title || !description || !owner) {
      return 'Title, owner and description are required.';
    }

    const determination: CampaignSelfDetermination = {
      id: generateId('determine'),
      title,
      category: data.category,
      description,
      owner,
      status: data.status,
      created_at: nowISO(),
    };

    updateState((current) => ({
      ...current,
      self_determinations: [determination, ...current.self_determinations],
      audit_log: [audit('settings', 'create_determination', determination.title), ...current.audit_log],
    }));
    return '';
  }

  function updateDetermination(
    determinationId: string,
    data: {
      title: string;
      category: DeterminationCategory;
      description: string;
      owner: string;
      status: DeterminationStatus;
    },
  ) {
    const title = sanitizeText(data.title, 120);
    const description = sanitizeLongText(data.description, 500);
    const owner = sanitizeText(data.owner, 80);
    if (!title || !description || !owner) {
      return 'Title, owner and description are required.';
    }

    updateState((current) => ({
      ...current,
      self_determinations: current.self_determinations.map((item) =>
        item.id === determinationId
          ? { ...item, title, category: data.category, description, owner, status: data.status }
          : item,
      ),
      audit_log: [audit('settings', 'update_determination', title), ...current.audit_log],
    }));
    return '';
  }

  function deleteDetermination(determinationId: string) {
    const determination = state.self_determinations.find((item) => item.id === determinationId);
    if (!determination) return;
    const confirmed = window.confirm(`Delete determination "${determination.title}"?`);
    if (!confirmed) return;

    updateState((current) => ({
      ...current,
      self_determinations: current.self_determinations.filter((item) => item.id !== determinationId),
      audit_log: [audit('settings', 'delete_determination', determination.title), ...current.audit_log],
    }));
  }

  function exportData() {
    const filename = `naijapolis-demo-${new Date().toISOString().slice(0, 10)}.json`;
    downloadTextFile(filename, JSON.stringify(state, null, 2));
    updateState((current) => ({
      ...current,
      audit_log: [audit('settings', 'export_data', filename), ...current.audit_log],
    }));
  }

  function resetDemo() {
    const confirmed = window.confirm('Reset the NaijaPolis demo data on this browser?');
    if (!confirmed) return;
    clearNaijaPolisState();
    setState(getInitialNaijaPolisState());
    setActiveModule('activity');
  }

  function printReport() {
    updateState((current) => ({
      ...current,
      activities: [
        {
          id: generateId('activity'),
          person_id: 'reports',
          person_name: current.settings.platform_name,
          type: 'report_export',
          metadata: { generated_at: nowISO() },
          source: 'web',
          sync_status: 'synced',
          created_at: nowISO(),
        },
        ...current.activities,
      ],
      audit_log: [audit('reports', 'print_report', 'Report opened for print or PDF save'), ...current.audit_log],
    }));
    window.setTimeout(() => window.print(), 50);
  }

  function lockWorkspace() {
    setLocked(true);
    setUnlockPin('');
  }

  function unlockWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expected = state.settings.operator_pin;
    if (expected && unlockPin !== expected) {
      setLockError('Invalid operator PIN.');
      return;
    }
    setLocked(false);
    setLockError('');
    setUnlockPin('');
  }

  if (locked) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
        <form onSubmit={unlockWorkspace} className="w-full max-w-sm bg-white text-gray-900 rounded-lg shadow-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">Workspace locked</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the operator PIN to continue.</p>
          <input
            type="password"
            className="mt-5 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={unlockPin}
            onChange={(event) => setUnlockPin(event.target.value)}
            placeholder={state.settings.operator_pin ? 'Operator PIN' : 'No PIN set'}
          />
          {lockError && <p className="text-sm text-red-600 mt-2">{lockError}</p>}
          <button type="submit" className="mt-4 w-full bg-gray-900 text-white rounded-md py-2 text-sm font-semibold">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 print:bg-white">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 flex-col bg-gray-900 text-white print:hidden">
          <Sidebar
            activeModule={activeModule}
            platformName={state.settings.platform_name}
            campaignName={state.settings.campaign_name}
            logoDataUrl={state.settings.campaign_logo_data_url}
            onSelect={setActiveModule}
          />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden print:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative h-full w-72 bg-gray-900 text-white">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <Sidebar
                activeModule={activeModule}
                platformName={state.settings.platform_name}
                campaignName={state.settings.campaign_name}
                logoDataUrl={state.settings.campaign_logo_data_url}
                onSelect={(module) => {
                  setActiveModule(module);
                  setMobileOpen(false);
                }}
              />
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur print:hidden">
            <div className="flex h-16 items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="lg:hidden rounded-md border border-gray-200 p-2"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <CampaignLogo
                  logoDataUrl={state.settings.campaign_logo_data_url}
                  label={state.settings.campaign_name || state.settings.platform_name}
                  className="hidden h-10 w-10 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 sm:flex"
                  imageClassName="object-contain"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{modules.find((module) => module.id === activeModule)?.label}</p>
                  <p className="text-xs text-gray-500">{state.settings.candidate_name} - {state.settings.party}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/naijapolis" className="hidden sm:inline-flex rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50">
                  NaijaPolis Page
                </Link>
                {state.settings.session_lock_enabled && (
                  <button
                    type="button"
                    onClick={lockWorkspace}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    <Lock className="w-4 h-4" />
                    Lock
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 pb-24 md:p-6 md:pb-8 print:p-0">
            <div className="mx-auto max-w-7xl">
              {activeModule === 'activity' && (
                <ActivityView state={state} metrics={metrics} onNewDonation={() => setActiveModule('finance')} />
              )}
              {activeModule === 'people' && <PeopleView state={state} onAddPerson={addPerson} />}
              {activeModule === 'finance' && <FinanceView state={state} metrics={metrics} onAddDonation={addDonation} />}
              {activeModule === 'events' && (
                <EventsView state={state} onAddEvent={addEvent} onRsvp={rsvpContact} onShare={shareEvent} />
              )}
              {activeModule === 'goals' && <GoalsView goals={derivedGoals} metrics={metrics} currency={state.settings.currency} />}
              {activeModule === 'canvassing' && <CanvassingView state={state} metrics={metrics} onAddCanvass={addCanvass} />}
              {activeModule === 'advocacy' && (
                <AdvocacyView
                  state={state}
                  metrics={metrics}
                  onManualMessage={addManualAdvocacy}
                  onWhatsAppIssue={sendWhatsAppIssue}
                  onRespond={respondToWhatsApp}
                />
              )}
              {activeModule === 'reports' && (
                <ReportsView state={state} metrics={metrics} goals={derivedGoals} onPrint={printReport} />
              )}
              {activeModule === 'settings' && (
                <SettingsView
                  state={state}
                  goals={derivedGoals}
                  onSaveSettings={saveSettings}
                  onAddGoal={addGoal}
                  onUpdateGoal={updateGoal}
                  onDeleteGoal={deleteGoal}
                  onAddDetermination={addDetermination}
                  onUpdateDetermination={updateDetermination}
                  onDeleteDetermination={deleteDetermination}
                  onExportData={exportData}
                  onResetDemo={resetDemo}
                  onLock={lockWorkspace}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function CampaignLogo({
  logoDataUrl,
  label,
  className,
  imageClassName,
  fallbackClassName,
}: {
  logoDataUrl?: string;
  label: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}) {
  if (logoDataUrl) {
    return (
      <div className={cn('relative overflow-hidden rounded-md bg-white', className)}>
        <Image src={logoDataUrl} alt={`${label} logo`} fill unoptimized className={cn('object-cover', imageClassName)} sizes="96px" />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center rounded-md bg-green-600', className)}>
      <Flag className={cn('h-5 w-5 text-white', fallbackClassName)} />
    </div>
  );
}

function Sidebar({
  activeModule,
  platformName,
  campaignName,
  logoDataUrl,
  onSelect,
}: {
  activeModule: ModuleId;
  platformName: string;
  campaignName: string;
  logoDataUrl: string;
  onSelect: (module: ModuleId) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-700 px-4 py-5">
        <div className="flex items-center gap-3">
          <CampaignLogo
            logoDataUrl={logoDataUrl}
            label={campaignName || platformName}
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-green-600 p-1"
            imageClassName="object-contain"
            fallbackClassName="text-white"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{platformName}</div>
            <div className="truncate text-xs text-gray-400">{campaignName}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            onClick={() => onSelect(module.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors',
              activeModule === module.id ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white',
            )}
          >
            <module.icon className="w-4 h-4 shrink-0" />
            {module.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-gray-700 px-4 py-3 text-xs text-gray-400">
        Built for Nigerian campaigns
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: IconComponent;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-md text-white', color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="truncate text-lg font-bold text-gray-900">{value}</p>
          {sub && <p className="truncate text-xs text-gray-400">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

function ActivityView({
  state,
  metrics,
  onNewDonation,
}: {
  state: NaijaPolisState;
  metrics: Metrics;
  onNewDonation: () => void;
}) {
  const [filter, setFilter] = useState<ActivityType | 'all'>('all');
  const activities = sortByDateDesc(state.activities).filter((activity) => filter === 'all' || activity.type === filter);

  return (
    <>
      <SectionHeader
        title="Activity Feed"
        subtitle="Real-time campaign activity stream"
        action={
          <button
            type="button"
            onClick={onNewDonation}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            New Donation
          </button>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Raised" value={formatCurrency(metrics.totalRaised, state.settings.currency)} icon={DollarSign} color="bg-green-600" />
        <StatCard label="Volunteers" value={String(metrics.volunteers)} icon={Users} color="bg-blue-600" />
        <StatCard label="Canvasses" value={String(metrics.canvassCount)} icon={Map} color="bg-purple-600" />
        <StatCard label="WhatsApp Open" value={String(metrics.whatsappOpen)} icon={MessageCircle} color="bg-emerald-600" />
      </div>
      <div className="rounded-lg bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto border-b border-gray-100 p-4">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={cn('rounded-full px-3 py-1 text-xs font-semibold', filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600')}
          >
            All
          </button>
          {Object.entries(activityConfig).map(([type, config]) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type as ActivityType)}
              className={cn('whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold', filter === type ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600')}
            >
              {config.label}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-100 px-4">
          {activities.map((activity) => {
            const config = activityConfig[activity.type];
            return (
              <div key={activity.id} className="flex gap-3 py-4">
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', config.bg)}>
                  <config.icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.person_name}</span>{' '}
                    <span className="text-gray-600">{getActivitySummary(activity, state.settings.currency)}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={cn('rounded px-2 py-0.5 text-xs font-semibold', config.bg, config.color)}>{config.label}</span>
                    <span className="text-xs text-gray-400">{formatRelative(activity.created_at)}</span>
                    {activity.sync_status === 'pending' && <span className="text-xs font-semibold text-amber-600">pending sync</span>}
                    <span className="text-xs uppercase tracking-wide text-gray-400">{activity.source}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {activities.length === 0 && <p className="py-10 text-center text-sm text-gray-400">No activities match this filter.</p>}
        </div>
      </div>
    </>
  );
}

function PeopleView({
  state,
  onAddPerson,
}: {
  state: NaijaPolisState;
  onAddPerson: (data: {
    full_name: string;
    phone: string;
    email?: string;
    state: string;
    lga: string;
    ward: string;
    polling_unit_id?: string;
    tags: string[];
  }) => string;
}) {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    state: '',
    lga: '',
    ward: '',
    polling_unit_id: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const stateOptions = getCoveredStateOptions();
  const lgaOptions = getLgaOptions(form.state);
  const wardOptions = getWardOptions(form.state, form.lga);
  const pollingUnitOptions = getPollingUnitOptions(form.state, form.lga, form.ward);

  const filtered = state.people.filter((person) => {
    const query = search.toLowerCase();
    const location = getPersonLocationLabel(person);

    return (
      person.full_name.toLowerCase().includes(query) ||
      person.phone.includes(search) ||
      (person.email ?? '').toLowerCase().includes(query) ||
      location.state.toLowerCase().includes(query) ||
      location.lga.toLowerCase().includes(query) ||
      location.ward.toLowerCase().includes(query) ||
      (location.pollingUnit?.name ?? '').toLowerCase().includes(query) ||
      (location.pollingUnit?.pu_code ?? '').toLowerCase().includes(query) ||
      person.tags.join(' ').toLowerCase().includes(query)
    );
  });

  function resetForm() {
    setForm({
      full_name: '',
      phone: '',
      email: '',
      state: '',
      lga: '',
      ward: '',
      polling_unit_id: '',
      tags: '',
    });
  }

  function updateStateSelection(stateName: string) {
    setForm((current) => ({ ...current, state: stateName, lga: '', ward: '', polling_unit_id: '' }));
  }

  function updateLgaSelection(lgaName: string) {
    setForm((current) => ({ ...current, lga: lgaName, ward: '', polling_unit_id: '' }));
  }

  function updateWardSelection(wardName: string) {
    setForm((current) => ({ ...current, ward: wardName, polling_unit_id: '' }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onAddPerson({
      full_name: form.full_name,
      phone: form.phone,
      email: form.email,
      state: form.state,
      lga: form.lga,
      ward: form.ward,
      polling_unit_id: form.polling_unit_id,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    });
    setError(result);
    if (!result) resetForm();
  }

  return (
    <>
      <SectionHeader title="People" subtitle={`${state.people.length} supporters, volunteers and donors`} />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, phone or email"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Contact</th>
                  <th className="hidden px-4 py-3 font-semibold lg:table-cell">Location</th>
                  <th className="hidden px-4 py-3 font-semibold xl:table-cell">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((person) => {
                  const location = getPersonLocationLabel(person);

                  return (
                    <tr key={person.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                            {person.full_name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                          </div>
                          <span className="font-medium">{person.full_name}</span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <div className="space-y-1 text-gray-600">
                          <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{person.phone}</span>
                          {person.email && <span className="flex items-center gap-1 text-xs"><Mail className="h-3 w-3" />{person.email}</span>}
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{location.pollingUnit?.name ?? 'Unassigned'}</p>
                          <p className="text-xs text-gray-500">{location.lines.join(' / ') || 'No location assigned'}</p>
                          {location.pollingUnit?.pu_code && <p className="text-xs text-gray-400">{location.pollingUnit.pu_code}</p>}
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 xl:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {person.tags.map((tag) => (
                            <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-600">
                              {tag.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">Add Person</h2>
          <p className="mb-4 text-xs text-gray-500">
            State options follow the INEC state list. LGA, ward, and polling unit options load from the bundled demo polling-unit dataset.
          </p>
          <FormField label="Full Name">
            <input className="form-input" value={form.full_name} onChange={(event) => setForm((current) => ({ ...current, full_name: event.target.value }))} required />
          </FormField>
          <FormField label="Phone">
            <input className="form-input" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} required />
          </FormField>
          <FormField label="Email">
            <input type="email" className="form-input" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </FormField>
          <FormField label="State">
            <select className="form-input" value={form.state} onChange={(event) => updateStateSelection(event.target.value)} required>
              <option value="">Select state</option>
              {stateOptions.map((stateOption) => (
                <option key={stateOption.name} value={stateOption.name} disabled={!stateOption.covered}>
                  {stateOption.covered ? stateOption.name : `${stateOption.name} (no demo polling units)`}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Local Government Area">
            <select
              className="form-input"
              value={form.lga}
              onChange={(event) => updateLgaSelection(event.target.value)}
              disabled={!form.state}
              required
            >
              <option value="">{form.state ? 'Select local government area' : 'Select state first'}</option>
              {lgaOptions.map((lga) => <option key={lga} value={lga}>{lga}</option>)}
            </select>
          </FormField>
          <FormField label="Ward">
            <select
              className="form-input"
              value={form.ward}
              onChange={(event) => updateWardSelection(event.target.value)}
              disabled={!form.lga}
              required
            >
              <option value="">{form.lga ? 'Select ward' : 'Select local government area first'}</option>
              {wardOptions.map((ward) => <option key={ward} value={ward}>{ward}</option>)}
            </select>
          </FormField>
          <FormField label="Polling Unit">
            <select
              className="form-input"
              value={form.polling_unit_id}
              onChange={(event) => setForm((current) => ({ ...current, polling_unit_id: event.target.value }))}
              disabled={!form.ward}
              required
            >
              <option value="">Select polling unit</option>
              {pollingUnitOptions.map((unit) => <option key={unit.id} value={unit.id}>{unit.pu_code} - {unit.name}</option>)}
            </select>
          </FormField>
          <FormField label="Tags">
            <input className="form-input" value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="volunteer, donor" />
          </FormField>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Add Person
          </button>
        </form>
      </div>
    </>
  );
}

function FinanceView({
  state,
  metrics,
  onAddDonation,
}: {
  state: NaijaPolisState;
  metrics: Metrics;
  onAddDonation: (data: { person_id: string; amount: string; channel: PaymentChannel; status: DonationStatus }) => string;
}) {
  const defaultChannel = paymentChannels.some((channel) => channel.value === state.settings.payment_provider)
    ? (state.settings.payment_provider as PaymentChannel)
    : 'paystack';
  const [form, setForm] = useState({
    person_id: '',
    amount: '',
    channel: defaultChannel,
    status: 'successful' as DonationStatus,
  });
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onAddDonation(form);
    setError(result);
    if (!result) setForm((current) => ({ ...current, person_id: '', amount: '', status: 'successful' }));
  }

  return (
    <>
      <SectionHeader title="Finance" subtitle="Donations, pledges and fundraisers" />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Successful" value={formatCurrency(metrics.totalRaised, state.settings.currency)} sub="confirmed donations" icon={DollarSign} color="bg-green-600" />
        <StatCard label="Pending" value={formatCurrency(metrics.pendingAmount, state.settings.currency)} sub="awaiting confirmation" icon={Clock} color="bg-amber-500" />
        <StatCard label="Pledged" value={formatCurrency(metrics.pledgedAmount, state.settings.currency)} sub="committed giving" icon={Target} color="bg-blue-600" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Channel</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="hidden px-4 py-3 font-semibold lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortByDateDesc(state.transactions).map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{transaction.person_name}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">{formatCurrency(transaction.amount, state.settings.currency)}</td>
                  <td className="hidden px-4 py-3 capitalize text-gray-600 sm:table-cell">{humanizeChannel(transaction.channel)}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold capitalize',
                      transaction.status === 'successful' && 'bg-green-100 text-green-700',
                      transaction.status === 'pending' && 'bg-amber-100 text-amber-700',
                      transaction.status === 'pledged' && 'bg-blue-100 text-blue-700',
                    )}>
                      {transaction.status === 'successful' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">{formatDate(transaction.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">New Donation</h2>
          <FormField label="Donor">
            <select className="form-input" value={form.person_id} onChange={(event) => setForm((current) => ({ ...current, person_id: event.target.value }))} required>
              <option value="">Select donor</option>
              {state.people.map((person) => <option key={person.id} value={person.id}>{person.full_name}</option>)}
            </select>
          </FormField>
          <FormField label="Amount">
            <input type="number" min="1" className="form-input" value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} required />
          </FormField>
          <FormField label="Channel">
            <select className="form-input" value={form.channel} onChange={(event) => setForm((current) => ({ ...current, channel: event.target.value as PaymentChannel }))}>
              {paymentChannels.map((channel) => <option key={channel.value} value={channel.value}>{channel.label}</option>)}
            </select>
          </FormField>
          <FormField label="Status">
            <select className="form-input" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as DonationStatus }))}>
              {donationStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
            </select>
          </FormField>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Record Donation
          </button>
        </form>
      </div>
    </>
  );
}

function EventsView({
  state,
  onAddEvent,
  onRsvp,
  onShare,
}: {
  state: NaijaPolisState;
  onAddEvent: (data: { title: string; description: string; location: string; date: string }) => string;
  onRsvp: (event: Event, personId: string) => string;
  onShare: (event: Event, personId: string, channel: 'email' | 'whatsapp') => string;
}) {
  const [form, setForm] = useState({ title: '', description: '', location: '', date: '' });
  const [selectedContacts, setSelectedContacts] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onAddEvent(form);
    setError(result);
    if (!result) setForm({ title: '', description: '', location: '', date: '' });
  }

  function selected(eventId: string) {
    return selectedContacts[eventId] ?? '';
  }

  return (
    <>
      <SectionHeader title="Events" subtitle={`${state.events.length} campaign events`} />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {sortByDateDesc(state.events).map((event) => {
            const contactId = selected(event.id);
            return (
              <div key={event.id} className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-purple-100 text-purple-700">
                    <span className="text-xs font-bold">{new Date(event.date).toLocaleDateString('en-NG', { month: 'short' }).toUpperCase()}</span>
                    <span className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-gray-900">{event.title}</h2>
                    {event.description && <p className="mt-1 text-sm text-gray-600">{event.description}</p>}
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDateTime(event.date)}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.rsvp_count} RSVPs</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
                  <select
                    className="form-input"
                    value={contactId}
                    onChange={(changeEvent) => setSelectedContacts((current) => ({ ...current, [event.id]: changeEvent.target.value }))}
                  >
                    <option value="">Select contact</option>
                    {state.people.map((person) => <option key={person.id} value={person.id}>{person.full_name}</option>)}
                  </select>
                  <EventActionButton icon={CheckCircle} label="RSVP" onClick={() => setError(onRsvp(event, contactId))} />
                  <EventActionButton icon={Mail} label="Email" onClick={() => setError(onShare(event, contactId, 'email'))} />
                  <EventActionButton icon={MessageCircle} label="WhatsApp" onClick={() => setError(onShare(event, contactId, 'whatsapp'))} />
                </div>
              </div>
            );
          })}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">Create Event</h2>
          <FormField label="Title">
            <input className="form-input" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
          </FormField>
          <FormField label="Description">
            <textarea className="form-input min-h-20" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
          </FormField>
          <FormField label="Location">
            <input className="form-input" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} required />
          </FormField>
          <FormField label="Date and Time">
            <input type="datetime-local" className="form-input" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} required />
          </FormField>
          <button type="submit" className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Create Event
          </button>
        </form>
      </div>
    </>
  );
}

function EventActionButton({ icon: Icon, label, onClick }: { icon: IconComponent; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function GoalsView({ goals, metrics, currency }: { goals: Goal[]; metrics: Metrics; currency: string }) {
  return (
    <>
      <SectionHeader title="Goals" subtitle="Targets are recalculated from live demo records" />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Achieved" value={String(goals.filter((goal) => goal.current_value >= goal.target).length)} icon={CheckCircle} color="bg-green-600" />
        <StatCard label="In Progress" value={String(goals.filter((goal) => goal.current_value > 0 && goal.current_value < goal.target).length)} icon={Clock} color="bg-amber-500" />
        <StatCard label="Upcoming Events" value={String(metrics.upcomingEvents)} icon={Calendar} color="bg-purple-600" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current_value / goal.target) * 100));
          const displayValue = formatGoalValue(goal.type, goal.current_value, currency);
          const displayTarget = formatGoalValue(goal.type, goal.target, currency);
          return (
            <div key={goal.id} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900">{goal.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{getGoalTypeLabel(goal.type)}</p>
                </div>
                <span className="text-2xl font-bold text-green-700">{percent}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-green-600" style={{ width: `${percent}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">{displayValue}</span>
                <span className="text-gray-500">of {displayTarget}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function CanvassingView({
  state,
  metrics,
  onAddCanvass,
}: {
  state: NaijaPolisState;
  metrics: Metrics;
  onAddCanvass: (data: { person_id: string; polling_unit_id: string; agent_name: string; support_level: SupportLevel; notes: string; sync_status: 'synced' | 'pending' }) => string;
}) {
  const [form, setForm] = useState({
    person_id: '',
    polling_unit_id: '',
    agent_name: '',
    support_level: 'strong' as SupportLevel,
    notes: '',
    sync_status: 'synced' as 'synced' | 'pending',
  });
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onAddCanvass(form);
    setError(result);
    if (!result) setForm((current) => ({ ...current, person_id: '', polling_unit_id: '', agent_name: '', notes: '' }));
  }

  return (
    <>
      <SectionHeader title="Canvassing" subtitle={`${state.canvass_records.length} door-knocks logged`} />
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {(Object.keys(supportConfig) as SupportLevel[]).map((level) => (
          <div key={level} className="rounded-lg bg-white p-4 text-center shadow-sm">
            <p className={cn('text-2xl font-bold', supportConfig[level].color)}>{metrics.support[level]}</p>
            <p className="mt-1 text-xs text-gray-500">{supportConfig[level].label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">Recent Visits</div>
          <div className="divide-y divide-gray-100">
            {sortByDateDesc(state.canvass_records).map((record) => {
              const support = supportConfig[record.support_level];
              return (
                <div key={record.id} className="flex gap-3 px-4 py-4">
                  <span className={cn('mt-2 h-2 w-2 rounded-full', support.dot)} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-gray-900">{record.person_name}</span>
                      <span className={cn('rounded px-2 py-0.5 text-xs font-semibold', support.bg, support.color)}>{support.label}</span>
                      {record.sync_status === 'pending' && <span className="text-xs font-semibold text-amber-600">pending sync</span>}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{record.polling_unit_name}</p>
                    {record.notes && <p className="mt-1 text-sm text-gray-600">{record.notes}</p>}
                  </div>
                  <span className="text-xs text-gray-400">{formatRelative(record.created_at)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">Log Visit</h2>
          <FormField label="Person Visited">
            <select className="form-input" value={form.person_id} onChange={(event) => setForm((current) => ({ ...current, person_id: event.target.value }))} required>
              <option value="">Select person</option>
              {state.people.map((person) => <option key={person.id} value={person.id}>{person.full_name}</option>)}
            </select>
          </FormField>
          <FormField label="Polling Unit">
            <select className="form-input" value={form.polling_unit_id} onChange={(event) => setForm((current) => ({ ...current, polling_unit_id: event.target.value }))} required>
              <option value="">Select polling unit</option>
              {POLLING_UNITS.map((unit) => <option key={unit.id} value={unit.id}>{unit.pu_code} - {unit.name}</option>)}
            </select>
          </FormField>
          <FormField label="Canvasser">
            <input className="form-input" value={form.agent_name} onChange={(event) => setForm((current) => ({ ...current, agent_name: event.target.value }))} />
          </FormField>
          <FormField label="Support Level">
            <select className="form-input" value={form.support_level} onChange={(event) => setForm((current) => ({ ...current, support_level: event.target.value as SupportLevel }))}>
              {(Object.keys(supportConfig) as SupportLevel[]).map((level) => <option key={level} value={level}>{supportConfig[level].label}</option>)}
            </select>
          </FormField>
          <FormField label="Sync Status">
            <select className="form-input" value={form.sync_status} onChange={(event) => setForm((current) => ({ ...current, sync_status: event.target.value as 'synced' | 'pending' }))}>
              <option value="synced">Synced</option>
              <option value="pending">Pending</option>
            </select>
          </FormField>
          <FormField label="Notes">
            <textarea className="form-input min-h-20" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
          </FormField>
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
            Log Visit
          </button>
        </form>
      </div>
    </>
  );
}

function AdvocacyView({
  state,
  metrics,
  onManualMessage,
  onWhatsAppIssue,
  onRespond,
}: {
  state: NaijaPolisState;
  metrics: Metrics;
  onManualMessage: (data: { person_id: string; issue: string; message: string }) => string;
  onWhatsAppIssue: (data: { person_id: string; issue: string; message: string }) => string;
  onRespond: (messageId: string, response: string) => string;
}) {
  const [manualForm, setManualForm] = useState({ person_id: '', issue: '', message: '' });
  const [whatsAppForm, setWhatsAppForm] = useState({ person_id: '', issue: '', message: '' });
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  function submitManual(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onManualMessage(manualForm);
    setError(result);
    if (!result) setManualForm({ person_id: '', issue: '', message: '' });
  }

  function submitWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onWhatsAppIssue(whatsAppForm);
    setError(result);
    if (!result) setWhatsAppForm({ person_id: '', issue: '', message: '' });
  }

  function respond(messageId: string) {
    const result = onRespond(messageId, responses[messageId] ?? '');
    setError(result);
    if (!result) setResponses((current) => ({ ...current, [messageId]: '' }));
  }

  return (
    <>
      <SectionHeader title="Advocacy" subtitle={`${state.advocacy_contacts.length} constituent messages and ${metrics.whatsappOpen} open WhatsApp items`} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Messages" value={String(metrics.advocacyCount)} icon={Megaphone} color="bg-amber-600" />
        <StatCard label="WhatsApp Open" value={String(metrics.whatsappOpen)} icon={MessageCircle} color="bg-emerald-600" />
        <StatCard label="Top Issue" value={metrics.topIssues[0]?.[0] ?? 'None'} icon={BarChart3} color="bg-blue-600" />
      </div>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">Constituent Messages</div>
            <div className="divide-y divide-gray-100">
              {sortByDateDesc(state.advocacy_contacts).map((contact) => (
                <div key={contact.id} className="px-4 py-4">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-900">{contact.person_name}</span>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">{contact.issue}</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold capitalize text-gray-600">{contact.source}</span>
                    <span className="text-xs text-gray-400">{formatRelative(contact.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{contact.message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="text-sm font-semibold text-gray-600">WhatsApp Room</span>
              <span className="text-xs font-medium text-emerald-700">{state.settings.whatsapp_number}</span>
            </div>
            <div className="divide-y divide-gray-100">
              {sortByDateDesc(state.whatsapp_messages).map((message) => (
                <div key={message.id} className="px-4 py-4">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-900">{message.person_name}</span>
                    <span className={cn('rounded px-2 py-0.5 text-xs font-semibold', message.status === 'responded' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')}>
                      {message.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400">{formatRelative(message.created_at)}</span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{message.issue}</p>
                  <p className="mt-1 text-sm text-gray-600">{message.message}</p>
                  {message.response && <p className="mt-2 rounded bg-green-50 p-2 text-sm text-green-800">{message.response}</p>}
                  <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      className="form-input"
                      value={responses[message.id] ?? ''}
                      onChange={(event) => setResponses((current) => ({ ...current, [message.id]: event.target.value }))}
                      placeholder="Response to send by WhatsApp"
                    />
                    <button
                      type="button"
                      onClick={() => respond(message.id)}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Send className="h-4 w-4" />
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <AdvocacyForm title="New Message" form={manualForm} people={state.people} onChange={setManualForm} onSubmit={submitManual} buttonLabel="Save Message" />
          <AdvocacyForm title="WhatsApp Intake" form={whatsAppForm} people={state.people} onChange={setWhatsAppForm} onSubmit={submitWhatsApp} buttonLabel="Send and Store" />
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-semibold text-amber-900">Response Queue</span>
            </div>
            <p className="text-sm text-amber-800">{metrics.whatsappOpen} WhatsApp item{metrics.whatsappOpen === 1 ? '' : 's'} awaiting review.</p>
          </div>
        </div>
      </div>
    </>
  );
}

function AdvocacyForm({
  title,
  form,
  people,
  onChange,
  onSubmit,
  buttonLabel,
}: {
  title: string;
  form: { person_id: string; issue: string; message: string };
  people: Person[];
  onChange: (form: { person_id: string; issue: string; message: string }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  buttonLabel: string;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">{title}</h2>
      <FormField label="Constituent">
        <select className="form-input" value={form.person_id} onChange={(event) => onChange({ ...form, person_id: event.target.value })} required>
          <option value="">Select person</option>
          {people.map((person) => <option key={person.id} value={person.id}>{person.full_name}</option>)}
        </select>
      </FormField>
      <FormField label="Issue">
        <select className="form-input" value={form.issue} onChange={(event) => onChange({ ...form, issue: event.target.value })} required>
          <option value="">Select issue</option>
          {issueOptions.map((issue) => <option key={issue} value={issue}>{issue}</option>)}
        </select>
      </FormField>
      <FormField label="Message">
        <textarea className="form-input min-h-24" value={form.message} onChange={(event) => onChange({ ...form, message: event.target.value })} required />
      </FormField>
      <button type="submit" className="w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
        {buttonLabel}
      </button>
    </form>
  );
}

function ReportsView({
  state,
  metrics,
  goals,
  onPrint,
}: {
  state: NaijaPolisState;
  metrics: Metrics;
  goals: Goal[];
  onPrint: () => void;
}) {
  const peopleByState = Object.entries(
    state.people.reduce<Record<string, number>>((acc, person) => {
      const stateName = person.state || 'Unassigned';
      acc[stateName] = (acc[stateName] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5);

  return (
    <>
      <SectionHeader
        title="Reports"
        subtitle="Campaign metrics from finance, people, events, advocacy and canvassing models"
        action={
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 print:hidden"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        }
      />
      <div className="rounded-lg bg-white p-6 shadow-sm print:shadow-none">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <CampaignLogo
                logoDataUrl={state.settings.campaign_logo_data_url}
                label={state.settings.campaign_name || state.settings.platform_name}
                className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-white p-2"
                imageClassName="object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{state.settings.campaign_name} Report</h2>
                <p className="text-sm text-gray-500">
                  {state.settings.candidate_name} · {state.settings.party || state.settings.platform_name}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Generated {formatDateTime(nowISO())}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Raised" value={formatCurrency(metrics.totalRaised, state.settings.currency)} icon={DollarSign} color="bg-green-600" />
          <StatCard label="Total Committed" value={formatCurrency(metrics.totalCommitted, state.settings.currency)} icon={Target} color="bg-emerald-700" />
          <StatCard label="Volunteers" value={String(metrics.volunteers)} icon={Users} color="bg-blue-600" />
          <StatCard label="Donors" value={String(metrics.donors)} icon={DollarSign} color="bg-amber-600" />
          <StatCard label="RSVPs" value={String(metrics.rsvps)} icon={Calendar} color="bg-purple-600" />
          <StatCard label="Canvassers" value={String(metrics.canvassers)} icon={Map} color="bg-sky-600" />
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <ReportPanel title="Campaign Charter">
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Slogan</p>
                <p className="font-medium text-gray-900">{state.settings.campaign_slogan || 'Not set'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Mission</p>
                <p className="text-gray-600">{state.settings.mission_statement || 'Not set'}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Target Voters</p>
                  <p className="text-gray-600">{state.settings.target_voter_segment || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Victory Threshold</p>
                  <p className="font-semibold text-gray-900">{state.settings.victory_threshold.toLocaleString()} votes</p>
                </div>
              </div>
            </div>
          </ReportPanel>
          <ReportPanel title="Finance Overview">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3"><span>Successful donations</span><span className="font-semibold">{metrics.successfulDonationCount}</span></div>
              <div className="flex justify-between gap-3"><span>Pending donations</span><span className="font-semibold">{metrics.pendingDonationCount}</span></div>
              <div className="flex justify-between gap-3"><span>Active pledges</span><span className="font-semibold">{metrics.unfulfilledPledgeCount}</span></div>
              <div className="flex justify-between gap-3"><span>Total raised</span><span className="font-semibold">{formatCurrency(metrics.totalRaised, state.settings.currency)}</span></div>
              <div className="flex justify-between gap-3"><span>Pending amount</span><span className="font-semibold">{formatCurrency(metrics.pendingAmount, state.settings.currency)}</span></div>
              <div className="flex justify-between gap-3"><span>Outstanding pledges</span><span className="font-semibold">{formatCurrency(metrics.pledgedAmount, state.settings.currency)}</span></div>
              <div className="flex justify-between gap-3"><span>Average successful gift</span><span className="font-semibold">{formatCurrency(metrics.averageSuccessfulDonation, state.settings.currency)}</span></div>
              <div className="flex justify-between gap-3"><span>Active fundraisers</span><span className="font-semibold">{metrics.fundraiserCount}</span></div>
            </div>
          </ReportPanel>
          <ReportPanel title="People and Field Metrics">
            <div className="grid grid-cols-2 gap-3">
              <MetricTile label="People" value={String(metrics.peopleCount)} />
              <MetricTile label="Supporters" value={String(metrics.supporters)} />
              <MetricTile label="Volunteers" value={String(metrics.volunteers)} />
              <MetricTile label="Donors" value={String(metrics.donors)} />
              <MetricTile label="Canvassers" value={String(metrics.canvassers)} />
              <MetricTile label="Canvass Visits" value={String(metrics.canvassCount)} />
              <MetricTile label="RSVP Contacts" value={String(metrics.rsvpPeople)} />
              <MetricTile label="Advocacy Cases" value={String(metrics.advocacyCount)} />
            </div>
          </ReportPanel>
          <ReportPanel title="Goal Performance">
            <div className="space-y-4">
              {goals.map((goal) => {
                const percent = Math.min(100, Math.round((goal.current_value / goal.target) * 100));
                return (
                  <div key={goal.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{goal.name}</span>
                      <span>{percent}%</span>
                    </div>
                    <p className="mb-2 text-xs text-gray-500">
                      {formatGoalValue(goal.type, goal.current_value, state.settings.currency)} of{' '}
                      {formatGoalValue(goal.type, goal.target, state.settings.currency)}
                    </p>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-green-600" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ReportPanel>
          <ReportPanel title="Geographic Coverage">
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <MetricTile label="States" value={String(metrics.representedStates)} />
                <MetricTile label="LGAs" value={String(metrics.representedLgas)} />
                <MetricTile label="Wards" value={String(metrics.representedWards)} />
                <MetricTile label="Polling Units" value={String(metrics.representedPollingUnits)} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Top State Coverage</p>
                <div className="space-y-2">
                  {peopleByState.map(([stateName, count]) => (
                    <div key={stateName} className="flex items-center justify-between text-sm">
                      <span>{stateName}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ReportPanel>
          <ReportPanel title="Support Model">
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(supportConfig) as SupportLevel[]).map((level) => (
                <div key={level} className="rounded-md border border-gray-200 p-3">
                  <p className={cn('text-xl font-bold', supportConfig[level].color)}>{metrics.support[level]}</p>
                  <p className="text-xs text-gray-500">{supportConfig[level].label}</p>
                </div>
              ))}
            </div>
          </ReportPanel>
          <ReportPanel title="Issue Metrics">
            <div className="space-y-3">
              {metrics.topIssues.slice(0, 6).map(([issue, count]) => (
                <div key={issue} className="flex items-center justify-between text-sm">
                  <span>{issue}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
              {metrics.topIssues.length === 0 && <p className="text-sm text-gray-400">No issue data yet.</p>}
            </div>
          </ReportPanel>
          <ReportPanel title="Security and Audit">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Audit entries</span><span className="font-semibold">{metrics.auditCount}</span></div>
              <div className="flex justify-between"><span>Share confirmation</span><span className="font-semibold">{state.settings.require_share_confirmation ? 'On' : 'Off'}</span></div>
              <div className="flex justify-between"><span>Session lock</span><span className="font-semibold">{state.settings.session_lock_enabled ? 'On' : 'Off'}</span></div>
              <div className="flex justify-between"><span>Retention</span><span className="font-semibold">{state.settings.data_retention_days} days</span></div>
            </div>
          </ReportPanel>
          <ReportPanel title="Determinations">
            <div className="space-y-3">
              {state.self_determinations.slice(0, 6).map((determination) => (
                <div key={determination.id} className="rounded-md border border-gray-200 p-3">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-900">{determination.title}</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold capitalize text-gray-600">{determination.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">{determination.description}</p>
                </div>
              ))}
            </div>
          </ReportPanel>
        </div>
      </div>
    </>
  );
}

function ReportPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-600">{title}</h3>
      {children}
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gray-200 p-3">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function SettingsView({
  state,
  goals,
  onSaveSettings,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onAddDetermination,
  onUpdateDetermination,
  onDeleteDetermination,
  onExportData,
  onResetDemo,
  onLock,
}: {
  state: NaijaPolisState;
  goals: Goal[];
  onSaveSettings: (settings: AppSettings) => string;
  onAddGoal: (data: { name: string; description: string; type: GoalType; target: string }) => string;
  onUpdateGoal: (goalId: string, data: { name: string; description: string; type: GoalType; target: string }) => string;
  onDeleteGoal: (goalId: string) => void;
  onAddDetermination: (data: {
    title: string;
    category: DeterminationCategory;
    description: string;
    owner: string;
    status: DeterminationStatus;
  }) => string;
  onUpdateDetermination: (
    determinationId: string,
    data: {
      title: string;
      category: DeterminationCategory;
      description: string;
      owner: string;
      status: DeterminationStatus;
    },
  ) => string;
  onDeleteDetermination: (determinationId: string) => void;
  onExportData: () => void;
  onResetDemo: () => void;
  onLock: () => void;
}) {
  const [form, setForm] = useState<AppSettings>(state.settings);
  const [goalForm, setGoalForm] = useState({
    name: '',
    description: '',
    type: 'donation' as GoalType,
    target: '',
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [determinationForm, setDeterminationForm] = useState({
    title: '',
    category: 'priority' as DeterminationCategory,
    description: '',
    owner: '',
    status: 'active' as DeterminationStatus,
  });
  const [editingDeterminationId, setEditingDeterminationId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [goalError, setGoalError] = useState('');
  const [determinationError, setDeterminationError] = useState('');

  useEffect(() => setForm(state.settings), [state.settings]);

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function uploadLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Upload a PNG, JPG, SVG, GIF, or WebP logo.');
      return;
    }
    if (file.size > MAX_LOGO_FILE_BYTES) {
      setError('Upload a logo under 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!isValidLogoDataUrl(result)) {
        setError('Upload a PNG, JPG, SVG, GIF, or WebP logo under 1MB.');
        return;
      }
      update('campaign_logo_data_url', result);
      setError('');
      setSaved(false);
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    update('campaign_logo_data_url', '');
    setError('');
    setSaved(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = onSaveSettings(form);
    setError(result);
    setSaved(!result);
    if (!result) window.setTimeout(() => setSaved(false), 2500);
  }

  function resetGoalForm() {
    setGoalForm({ name: '', description: '', type: 'donation', target: '' });
    setEditingGoalId(null);
    setGoalError('');
  }

  function submitGoal() {
    const result = editingGoalId ? onUpdateGoal(editingGoalId, goalForm) : onAddGoal(goalForm);
    setGoalError(result);
    if (!result) resetGoalForm();
  }

  function editGoal(goal: Goal) {
    setGoalForm({
      name: goal.name,
      description: goal.description,
      type: goal.type,
      target: String(goal.target),
    });
    setEditingGoalId(goal.id);
    setGoalError('');
  }

  function resetDeterminationForm() {
    setDeterminationForm({
      title: '',
      category: 'priority',
      description: '',
      owner: '',
      status: 'active',
    });
    setEditingDeterminationId(null);
    setDeterminationError('');
  }

  function submitDetermination() {
    const result = editingDeterminationId
      ? onUpdateDetermination(editingDeterminationId, determinationForm)
      : onAddDetermination(determinationForm);
    setDeterminationError(result);
    if (!result) resetDeterminationForm();
  }

  function editDetermination(determination: CampaignSelfDetermination) {
    setDeterminationForm({
      title: determination.title,
      category: determination.category,
      description: determination.description,
      owner: determination.owner,
      status: determination.status,
    });
    setEditingDeterminationId(determination.id);
    setDeterminationError('');
  }

  return (
    <>
      <SectionHeader title="Settings" subtitle="Campaign configuration, WhatsApp routing and security controls" />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="space-y-6">
          <SettingsPanel title="Campaign Information" icon={Flag}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Campaign Platform Name">
                <input className="form-input" value={form.platform_name} onChange={(event) => update('platform_name', event.target.value)} />
              </FormField>
              <FormField label="Campaign Name">
                <input className="form-input" value={form.campaign_name} onChange={(event) => update('campaign_name', event.target.value)} />
              </FormField>
              <FormField label="Candidate Name">
                <input className="form-input" value={form.candidate_name} onChange={(event) => update('candidate_name', event.target.value)} />
              </FormField>
              <FormField label="Political Party">
                <input className="form-input" value={form.party} onChange={(event) => update('party', event.target.value)} />
              </FormField>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_200px]">
              <FormField label="Party / Campaign Logo">
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml"
                    onChange={uploadLogo}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-green-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-green-700"
                  />
                  <p className="text-xs text-gray-500">Supported: PNG, JPG, WebP, GIF, SVG. Maximum size: 1MB.</p>
                  {form.campaign_logo_data_url && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove Logo
                    </button>
                  )}
                </div>
              </FormField>
              <div className="rounded-lg border border-dashed border-gray-300 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Preview</p>
                <CampaignLogo
                  logoDataUrl={form.campaign_logo_data_url}
                  label={form.campaign_name || form.platform_name}
                  className="mx-auto h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-white p-2"
                  imageClassName="object-contain"
                />
              </div>
            </div>
          </SettingsPanel>
          <SettingsPanel title="Campaign Self-Determination" icon={Target}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Campaign Slogan">
                <input className="form-input" value={form.campaign_slogan} onChange={(event) => update('campaign_slogan', event.target.value)} />
              </FormField>
              <FormField label="Victory Threshold">
                <input type="number" min="0" className="form-input" value={form.victory_threshold} onChange={(event) => update('victory_threshold', Number(event.target.value))} />
              </FormField>
            </div>
            <FormField label="Mission Statement">
              <textarea className="form-input min-h-24" value={form.mission_statement} onChange={(event) => update('mission_statement', event.target.value)} />
            </FormField>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Target Voter Segment">
                <textarea className="form-input min-h-24" value={form.target_voter_segment} onChange={(event) => update('target_voter_segment', event.target.value)} />
              </FormField>
              <FormField label="Priority Wards">
                <textarea className="form-input min-h-24" value={form.priority_wards} onChange={(event) => update('priority_wards', event.target.value)} />
              </FormField>
            </div>
            <FormField label="Decision Rules">
              <textarea className="form-input min-h-24" value={form.decision_rules} onChange={(event) => update('decision_rules', event.target.value)} />
            </FormField>
          </SettingsPanel>
          <SettingsPanel title="Location and Payments" icon={MapPin}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="State">
                <select className="form-input" value={form.state} onChange={(event) => update('state', event.target.value)}>
                  {getCoveredStateOptions().map((stateOption) => <option key={stateOption.name} value={stateOption.name}>{stateOption.name}</option>)}
                </select>
              </FormField>
              <FormField label="LGA">
                <input className="form-input" value={form.lga} onChange={(event) => update('lga', event.target.value)} />
              </FormField>
              <FormField label="Currency">
                <select className="form-input" value={form.currency} onChange={(event) => update('currency', event.target.value)}>
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </FormField>
              <FormField label="Default Payment Provider">
                <select className="form-input" value={form.payment_provider} onChange={(event) => update('payment_provider', event.target.value)}>
                  <option value="paystack">Paystack</option>
                  <option value="flutterwave">Flutterwave</option>
                  <option value="both">Both</option>
                </select>
              </FormField>
              <FormField label="Timezone">
                <select className="form-input" value={form.timezone} onChange={(event) => update('timezone', event.target.value)}>
                  <option value="Africa/Lagos">Africa/Lagos</option>
                  <option value="UTC">UTC</option>
                </select>
              </FormField>
              <FormField label="Campaign WhatsApp Number">
                <input className="form-input" value={form.whatsapp_number} onChange={(event) => update('whatsapp_number', event.target.value)} />
              </FormField>
            </div>
          </SettingsPanel>
          <SettingsPanel title="Security" icon={ShieldCheck}>
            <div className="grid gap-4 md:grid-cols-2">
              <ToggleField
                label="Confirm event sharing"
                checked={form.require_share_confirmation}
                onChange={(checked) => update('require_share_confirmation', checked)}
              />
              <ToggleField
                label="Enable session lock"
                checked={form.session_lock_enabled}
                onChange={(checked) => update('session_lock_enabled', checked)}
              />
              <FormField label="Operator PIN">
                <input type="password" className="form-input" value={form.operator_pin} onChange={(event) => update('operator_pin', event.target.value)} maxLength={12} />
              </FormField>
              <FormField label="Data Retention Days">
                <input type="number" min="30" max="3650" className="form-input" value={form.data_retention_days} onChange={(event) => update('data_retention_days', Number(event.target.value))} />
              </FormField>
            </div>
          </SettingsPanel>
          <SettingsPanel title="Goal Studio" icon={BarChart3}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Goal Name">
                <input className="form-input" value={goalForm.name} onChange={(event) => setGoalForm((current) => ({ ...current, name: event.target.value }))} />
              </FormField>
              <FormField label="Metric">
                <select className="form-input" value={goalForm.type} onChange={(event) => setGoalForm((current) => ({ ...current, type: event.target.value as GoalType }))}>
                  {goalTypes.map((goalType) => <option key={goalType.value} value={goalType.value}>{goalType.label}</option>)}
                </select>
              </FormField>
              <FormField label="Target">
                <input type="number" min="1" className="form-input" value={goalForm.target} onChange={(event) => setGoalForm((current) => ({ ...current, target: event.target.value }))} />
              </FormField>
              <FormField label="Description">
                <input className="form-input" value={goalForm.description} onChange={(event) => setGoalForm((current) => ({ ...current, description: event.target.value }))} />
              </FormField>
            </div>
            {goalError && <p className="mb-3 text-sm text-red-600">{goalError}</p>}
            <div className="mb-5 flex flex-wrap gap-2">
              <button type="button" onClick={submitGoal} className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                {editingGoalId ? 'Update Goal' : 'Add Goal'}
              </button>
              {editingGoalId && (
                <button type="button" onClick={resetGoalForm} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="space-y-3">
              {goals.map((goal) => {
                const percent = Math.min(100, Math.round((goal.current_value / goal.target) * 100));
                return (
                  <div key={goal.id} className="rounded-md border border-gray-200 p-3">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">{getGoalTypeLabel(goal.type)}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          {formatGoalValue(goal.type, goal.current_value, state.settings.currency)} of {formatGoalValue(goal.type, goal.target, state.settings.currency)}
                        </p>
                        <div className="mt-2 h-2 rounded-full bg-gray-100">
                          <div className="h-2 rounded-full bg-green-600" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => editGoal(goal)} className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold hover:bg-gray-50">
                          Edit
                        </button>
                        <button type="button" onClick={() => onDeleteGoal(goal.id)} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SettingsPanel>
          <SettingsPanel title="Determination Register" icon={ShieldCheck}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Title">
                <input className="form-input" value={determinationForm.title} onChange={(event) => setDeterminationForm((current) => ({ ...current, title: event.target.value }))} />
              </FormField>
              <FormField label="Owner">
                <input className="form-input" value={determinationForm.owner} onChange={(event) => setDeterminationForm((current) => ({ ...current, owner: event.target.value }))} />
              </FormField>
              <FormField label="Category">
                <select className="form-input" value={determinationForm.category} onChange={(event) => setDeterminationForm((current) => ({ ...current, category: event.target.value as DeterminationCategory }))}>
                  {determinationCategories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                </select>
              </FormField>
              <FormField label="Status">
                <select className="form-input" value={determinationForm.status} onChange={(event) => setDeterminationForm((current) => ({ ...current, status: event.target.value as DeterminationStatus }))}>
                  {determinationStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Description">
              <textarea className="form-input min-h-24" value={determinationForm.description} onChange={(event) => setDeterminationForm((current) => ({ ...current, description: event.target.value }))} />
            </FormField>
            {determinationError && <p className="mb-3 text-sm text-red-600">{determinationError}</p>}
            <div className="mb-5 flex flex-wrap gap-2">
              <button type="button" onClick={submitDetermination} className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                {editingDeterminationId ? 'Update Determination' : 'Add Determination'}
              </button>
              {editingDeterminationId && (
                <button type="button" onClick={resetDeterminationForm} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="space-y-3">
              {state.self_determinations.map((determination) => (
                <div key={determination.id} className="rounded-md border border-gray-200 p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{determination.title}</h3>
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold capitalize text-blue-700">{determination.category}</span>
                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold capitalize text-green-700">{determination.status}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{determination.description}</p>
                      <p className="mt-2 text-xs text-gray-400">Owner: {determination.owner}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => editDetermination(determination)} className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold hover:bg-gray-50">
                        Edit
                      </button>
                      <button type="button" onClick={() => onDeleteDetermination(determination.id)} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SettingsPanel>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700">
              Save Settings
            </button>
            {saved && <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700"><CheckCircle className="h-4 w-4" />Settings saved</span>}
          </div>
        </form>
        <div className="space-y-6">
          <SettingsPanel title="Data Controls" icon={Database}>
            <div className="grid gap-3">
              <button type="button" onClick={onExportData} className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                <Download className="h-4 w-4" />
                Export JSON
              </button>
              <button type="button" onClick={onResetDemo} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                <RotateCcw className="h-4 w-4" />
                Reset Demo Data
              </button>
              <button type="button" onClick={onLock} className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                <KeyRound className="h-4 w-4" />
                Lock Workspace
              </button>
            </div>
          </SettingsPanel>
          <SettingsPanel title="Audit Log" icon={ShieldCheck}>
            <div className="max-h-96 space-y-3 overflow-y-auto">
              {sortByDateDesc(state.audit_log).slice(0, 20).map((entry) => (
                <div key={entry.id} className="rounded-md border border-gray-200 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-900">{entry.action.replace('_', ' ')}</span>
                    <span className="text-xs text-gray-400">{formatRelative(entry.created_at)}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{entry.detail}</p>
                </div>
              ))}
            </div>
          </SettingsPanel>
        </div>
      </div>
    </>
  );
}

function SettingsPanel({ title, icon: Icon, children }: { title: string; icon: IconComponent; children: ReactNode }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-600">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm font-medium">
      {label}
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-green-600" />
    </label>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mb-4 block text-sm font-medium text-gray-700">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}
