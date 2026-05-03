import { T as TSS_SERVER_FUNCTION } from "../server.js";
import { getStore } from "@netlify/blobs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const STORE_NAME = "poliforge";
function store() {
  return getStore({ name: STORE_NAME, consistency: "strong" });
}
async function getAll(key) {
  try {
    const data = await store().get(key, { type: "json" });
    return data ?? [];
  } catch {
    return [];
  }
}
async function setAll(key, data) {
  await store().set(key, JSON.stringify(data));
}
async function isSeeded() {
  try {
    const flag = await store().get("seeded");
    return flag === "true";
  } catch {
    return false;
  }
}
const SEED_PEOPLE = [
  { id: "p-1", full_name: "Emeka Okonkwo", phone: "+2348031234567", email: "emeka@example.com", polling_unit_id: "pu-1", tags: ["volunteer", "donor"], custom_fields: {}, created_at: "2026-04-01T08:00:00Z" },
  { id: "p-2", full_name: "Aisha Bello", phone: "+2348054321987", email: "aisha@example.com", polling_unit_id: "pu-3", tags: ["supporter"], custom_fields: {}, created_at: "2026-04-02T09:00:00Z" },
  { id: "p-3", full_name: "Chukwuemeka Eze", phone: "+2348067890123", polling_unit_id: "pu-1", tags: ["volunteer"], custom_fields: {}, created_at: "2026-04-03T10:00:00Z" },
  { id: "p-4", full_name: "Fatima Mohammed", phone: "+2348098765432", email: "fatima@example.com", polling_unit_id: "pu-4", tags: ["donor", "supporter"], custom_fields: {}, created_at: "2026-04-04T11:00:00Z" },
  { id: "p-5", full_name: "Tunde Adeyemi", phone: "+2348012345678", polling_unit_id: "pu-5", tags: ["ward_coordinator"], custom_fields: {}, created_at: "2026-04-05T12:00:00Z" },
  { id: "p-6", full_name: "Ngozi Obi", phone: "+2348023456789", email: "ngozi@example.com", polling_unit_id: "pu-6", tags: ["donor"], custom_fields: {}, created_at: "2026-04-06T08:00:00Z" },
  { id: "p-7", full_name: "Ibrahim Musa", phone: "+2348034567890", polling_unit_id: "pu-4", tags: ["supporter"], custom_fields: {}, created_at: "2026-04-07T09:00:00Z" },
  { id: "p-8", full_name: "Chidinma Nwosu", phone: "+2348045678901", email: "chidinma@example.com", polling_unit_id: "pu-1", tags: ["volunteer", "canvasser"], custom_fields: {}, created_at: "2026-04-08T10:00:00Z" }
];
const SEED_ACTIVITIES = [
  { id: "a-1", person_id: "p-1", person_name: "Emeka Okonkwo", type: "donation", metadata: { amount: 5e4, channel: "paystack" }, source: "web", sync_status: "synced", created_at: "2026-04-30T08:30:00Z" },
  { id: "a-2", person_id: "p-2", person_name: "Aisha Bello", type: "volunteer_signup", metadata: { role: "Ward Coordinator" }, source: "web", sync_status: "synced", created_at: "2026-04-30T09:15:00Z" },
  { id: "a-3", person_id: "p-3", person_name: "Chukwuemeka Eze", type: "canvass", metadata: { polling_unit: "Surulere Ward 1 PU A", support_level: "strong" }, source: "mobile", sync_status: "synced", created_at: "2026-04-30T10:00:00Z" },
  { id: "a-4", person_id: "p-4", person_name: "Fatima Mohammed", type: "rsvp", metadata: { event: "Campaign Rally - Kano", event_id: "e-1" }, source: "web", sync_status: "synced", created_at: "2026-04-30T11:00:00Z" },
  { id: "a-5", person_id: "p-5", person_name: "Tunde Adeyemi", type: "donation", metadata: { amount: 1e5, channel: "bank_transfer" }, source: "web", sync_status: "synced", created_at: "2026-04-30T12:00:00Z" },
  { id: "a-6", person_id: "p-6", person_name: "Ngozi Obi", type: "contact_candidate", metadata: { issue: "Infrastructure", message: "We need better roads in GRA" }, source: "web", sync_status: "synced", created_at: "2026-05-01T08:00:00Z" },
  { id: "a-7", person_id: "p-7", person_name: "Ibrahim Musa", type: "pledge", metadata: { amount: 25e3 }, source: "ussd", sync_status: "pending", created_at: "2026-05-01T09:30:00Z" },
  { id: "a-8", person_id: "p-8", person_name: "Chidinma Nwosu", type: "canvass", metadata: { polling_unit: "Surulere Ward 1 PU B", support_level: "lean" }, source: "mobile", sync_status: "pending", created_at: "2026-05-01T10:00:00Z" },
  { id: "a-9", person_id: "p-1", person_name: "Emeka Okonkwo", type: "rsvp", metadata: { event: "Town Hall - Lagos", event_id: "e-2" }, source: "web", sync_status: "synced", created_at: "2026-05-01T11:00:00Z" },
  { id: "a-10", person_id: "p-4", person_name: "Fatima Mohammed", type: "donation", metadata: { amount: 75e3, channel: "paystack" }, source: "web", sync_status: "synced", created_at: "2026-05-02T07:00:00Z" }
];
const SEED_TRANSACTIONS = [
  { id: "t-1", person_id: "p-1", person_name: "Emeka Okonkwo", amount: 5e4, channel: "paystack", status: "success", reference: "PAY-001-2026", fundraiser_id: "f-1", created_at: "2026-04-30T08:30:00Z" },
  { id: "t-2", person_id: "p-5", person_name: "Tunde Adeyemi", amount: 1e5, channel: "bank_transfer", status: "success", reference: "BT-002-2026", fundraiser_id: "f-1", created_at: "2026-04-30T12:00:00Z" },
  { id: "t-3", person_id: "p-4", person_name: "Fatima Mohammed", amount: 75e3, channel: "paystack", status: "success", reference: "PAY-003-2026", fundraiser_id: "f-2", created_at: "2026-05-02T07:00:00Z" },
  { id: "t-4", person_id: "p-2", person_name: "Aisha Bello", amount: 3e4, channel: "flutterwave", status: "pending", reference: "FLW-004-2026", created_at: "2026-05-02T09:00:00Z" }
];
const SEED_PLEDGES = [
  { id: "pl-1", person_id: "p-7", person_name: "Ibrahim Musa", amount: 25e3, due_date: "2026-05-15", fulfilled: false, created_at: "2026-05-01T09:30:00Z" },
  { id: "pl-2", person_id: "p-3", person_name: "Chukwuemeka Eze", amount: 15e3, due_date: "2026-05-10", fulfilled: false, created_at: "2026-05-01T10:00:00Z" }
];
const SEED_FUNDRAISERS = [
  { id: "f-1", name: "Q2 Campaign Fund", description: "Main campaign fundraising drive", goal_amount: 5e6, created_at: "2026-04-01T00:00:00Z" },
  { id: "f-2", name: "Media Campaign", description: "TV, radio and digital media spend", goal_amount: 2e6, created_at: "2026-04-15T00:00:00Z" }
];
const SEED_EVENTS = [
  { id: "e-1", title: "Campaign Rally - Kano", description: "Major rally at Sani Abacha Stadium", location: "Sani Abacha Stadium, Kano", date: "2026-05-15T10:00:00Z", rsvp_count: 1, created_at: "2026-04-20T00:00:00Z" },
  { id: "e-2", title: "Town Hall - Lagos", description: "Community engagement at Tafawa Balewa Square", location: "Tafawa Balewa Square, Lagos", date: "2026-05-20T14:00:00Z", rsvp_count: 1, created_at: "2026-04-22T00:00:00Z" },
  { id: "e-3", title: "Volunteer Training - Abuja", description: "Training for campaign volunteers", location: "Campaign HQ, Abuja", date: "2026-05-08T09:00:00Z", rsvp_count: 0, created_at: "2026-04-25T00:00:00Z" }
];
const SEED_GOALS = [
  { id: "g-1", name: "Q2 Fundraising Target", description: "Raise ₦5M for Q2 campaign operations", type: "donation", target: 5e6, current_value: 255e3, created_at: "2026-04-01T00:00:00Z" },
  { id: "g-2", name: "Volunteer Recruitment", description: "Recruit 500 active volunteers", type: "volunteers", target: 500, current_value: 48, created_at: "2026-04-01T00:00:00Z" },
  { id: "g-3", name: "Door-Knock Drive", description: "Complete 10,000 canvass visits", type: "canvass", target: 1e4, current_value: 1240, created_at: "2026-04-15T00:00:00Z" },
  { id: "g-4", name: "Rally RSVPs", description: "Get 5,000 RSVPs for major rallies", type: "rsvp", target: 5e3, current_value: 2, created_at: "2026-04-20T00:00:00Z" }
];
const SEED_CANVASS = [
  { id: "c-1", person_id: "p-3", person_name: "Chukwuemeka Eze", agent_name: "Chukwuemeka Eze", polling_unit_id: "pu-1", polling_unit_name: "Surulere Ward 1 PU A", lat: 6.5009, lng: 3.3544, support_level: "strong", notes: "Very supportive, will bring family to vote", sync_status: "synced", created_at: "2026-04-30T10:00:00Z" },
  { id: "c-2", person_id: "p-8", person_name: "Chidinma Nwosu", agent_name: "Chidinma Nwosu", polling_unit_id: "pu-2", polling_unit_name: "Surulere Ward 1 PU B", lat: 6.5012, lng: 3.3548, support_level: "lean", notes: "Undecided but leaning our way", sync_status: "pending", created_at: "2026-05-01T10:00:00Z" }
];
const SEED_ADVOCACY = [
  { id: "av-1", person_id: "p-6", person_name: "Ngozi Obi", issue: "Infrastructure", message: "We need better roads in GRA area. The roads have been in disrepair for years.", created_at: "2026-05-01T08:00:00Z" }
];
const SEED_SETTINGS = {
  campaign_name: "PoliForge Campaign 2027",
  candidate_name: "Hon. Candidate Name",
  party: "Your Party",
  timezone: "Africa/Lagos",
  currency: "NGN",
  payment_provider: "paystack",
  state: "Lagos",
  lga: "Surulere"
};
async function ensureSeeded() {
  if (await isSeeded()) return;
  const s = store();
  await Promise.all([
    s.set("people", JSON.stringify(SEED_PEOPLE)),
    s.set("activities", JSON.stringify(SEED_ACTIVITIES)),
    s.set("transactions", JSON.stringify(SEED_TRANSACTIONS)),
    s.set("pledges", JSON.stringify(SEED_PLEDGES)),
    s.set("fundraisers", JSON.stringify(SEED_FUNDRAISERS)),
    s.set("events", JSON.stringify(SEED_EVENTS)),
    s.set("goals", JSON.stringify(SEED_GOALS)),
    s.set("canvass", JSON.stringify(SEED_CANVASS)),
    s.set("advocacy", JSON.stringify(SEED_ADVOCACY)),
    s.set("settings", JSON.stringify(SEED_SETTINGS)),
    s.set("seeded", "true")
  ]);
}
async function getPeople() {
  await ensureSeeded();
  return getAll("people");
}
async function addPerson(person) {
  const all = await getPeople();
  await setAll("people", [...all, person]);
}
async function updatePerson(updated) {
  const all = await getPeople();
  await setAll("people", all.map((p) => p.id === updated.id ? updated : p));
}
async function getActivities() {
  await ensureSeeded();
  const all = await getAll("activities");
  return all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
async function addActivity(activity) {
  const all = await getAll("activities");
  await setAll("activities", [activity, ...all]);
}
async function getTransactions() {
  await ensureSeeded();
  return getAll("transactions");
}
async function addTransaction(tx) {
  const all = await getTransactions();
  await setAll("transactions", [tx, ...all]);
}
async function getPledges() {
  await ensureSeeded();
  return getAll("pledges");
}
async function addPledge(pledge) {
  const all = await getPledges();
  await setAll("pledges", [...all, pledge]);
}
async function getFundraisers() {
  await ensureSeeded();
  return getAll("fundraisers");
}
async function getEvents() {
  await ensureSeeded();
  return getAll("events");
}
async function addEvent(event) {
  const all = await getEvents();
  await setAll("events", [...all, event]);
}
async function addEventRsvp(rsvp) {
  const all = await getAll("event_rsvps");
  await setAll("event_rsvps", [...all, rsvp]);
  const events = await getEvents();
  await setAll("events", events.map(
    (e) => e.id === rsvp.event_id ? { ...e, rsvp_count: e.rsvp_count + 1 } : e
  ));
}
async function getGoals() {
  await ensureSeeded();
  return getAll("goals");
}
async function updateGoalValue(id, value) {
  const all = await getGoals();
  await setAll("goals", all.map((g) => g.id === id ? { ...g, current_value: value } : g));
}
async function getCanvassRecords() {
  await ensureSeeded();
  return getAll("canvass");
}
async function addCanvassRecord(record) {
  const all = await getCanvassRecords();
  await setAll("canvass", [record, ...all]);
}
async function getAdvocacyContacts() {
  await ensureSeeded();
  return getAll("advocacy");
}
async function addAdvocacyContact(contact) {
  const all = await getAdvocacyContacts();
  await setAll("advocacy", [contact, ...all]);
}
async function getSettings() {
  await ensureSeeded();
  try {
    const s = store();
    const data = await s.get("settings", { type: "json" });
    return data ?? SEED_SETTINGS;
  } catch {
    return SEED_SETTINGS;
  }
}
async function saveSettings(settings) {
  const s = store();
  await s.set("settings", JSON.stringify(settings));
}
export {
  addCanvassRecord as a,
  addActivity as b,
  createServerRpc as c,
  getPeople as d,
  addPerson as e,
  getSettings as f,
  getCanvassRecords as g,
  getEvents as h,
  addEvent as i,
  addEventRsvp as j,
  getActivities as k,
  getTransactions as l,
  getPledges as m,
  getFundraisers as n,
  addTransaction as o,
  addPledge as p,
  getGoals as q,
  updateGoalValue as r,
  saveSettings as s,
  getAdvocacyContacts as t,
  updatePerson as u,
  addAdvocacyContact as v
};
