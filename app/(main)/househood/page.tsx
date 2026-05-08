import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  KeyRound,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { FullContactSection } from '@/components/contact/FullContactSection';
import { MobileOptimizedFooter } from '@/components/contact/MobileOptimizedFooter';

const roles = [
  {
    title: 'Residents',
    description: 'Track onboarding, service requests, documents, and community updates from a single portal.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Property Managers',
    description: 'Coordinate approvals, payment follow-up, occupancy, and announcements with clear audit trails.',
    icon: <ClipboardList className="h-6 w-6" />,
  },
  {
    title: 'Operations Teams',
    description: 'Run maintenance workflows, access schedules, and compliance tasks without spreadsheet sprawl.',
    icon: <Wrench className="h-6 w-6" />,
  },
];

const features = [
  'Role-based dashboards for residents, managers, and operations staff',
  'Shared request tracking for onboarding, maintenance, finance, and facility workflows',
  'Document-aware portal views for leases, notices, approvals, and resident files',
  'A contained demo experience integrated into the main Next.js application',
];

const workflow = [
  {
    title: 'Invite and onboard users',
    description: 'Create a workspace, assign roles, and publish access credentials without changing the main repo auth stack.',
    icon: <KeyRound className="h-5 w-5" />,
  },
  {
    title: 'Coordinate daily operations',
    description: 'Manage service requests, notices, and team tasks from a single operational view.',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: 'Keep delivery auditable',
    description: 'Every workflow stays visible and structured, which makes handoffs, reporting, and support safer.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export const metadata = {
  title: 'Househood Portals | Underdecanopy',
  description:
    "Househood Portals is Underdecanopy's integrated portal experience for community operations, resident workflows, and team coordination.",
};

export default function HousehoodPage() {
  return (
    <div>
      <Navigation />
      <main id="main-content">
        <section className="bg-slate-950 text-white py-16 md:py-24">
          <div className="page-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
                Core Service 8
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Househood Portals for modern community operations
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">
                Househood Portals brings resident access, manager workflows, and operations delivery into one calm interface.
                It has been integrated into the main repository as a contained service so the existing platform remains stable.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/househood/demo"
                  className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Open Demo
                </Link>
                <Link
                  href="#features"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Explore Features
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Active workspaces', value: '3 communities' },
                  { label: 'Open tasks', value: '4 tracked items' },
                  { label: 'Team coverage', value: 'Resident to ops' },
                  { label: 'Integration mode', value: 'Safe demo route' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" id="features">
          <div className="page-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-slate-900">Integration-ready portal capabilities</h2>
              <p className="mt-3 text-slate-600">
                The attached portal was adapted into the repo&apos;s existing architecture rather than mounted as a second standalone stack.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <p className="text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-50" id="roles">
          <div className="page-container">
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-3xl font-bold text-slate-900">Designed for every role in the community</h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                The portal surface supports the people who request work, approve it, and deliver it.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {roles.map((role) => (
                <div key={role.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    {role.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{role.title}</h3>
                  <p className="mt-3 text-slate-600">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" id="workflow">
          <div className="page-container">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">A safer integration workflow</h2>
                <p className="mt-4 text-slate-600">
                  The implementation keeps the current repository in control by translating the incoming portal into route-local UI and typed demo data.
                </p>
              </div>
              <div className="space-y-4">
                {workflow.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FullContactSection
          title="Talk to us about Househood Portals"
          subtitle="Tell us how you want to run resident, facility, or operations workflows."
          serviceOptions={[
            { value: 'Resident Portal', label: 'Resident Portal' },
            { value: 'Manager Workflow', label: 'Manager Workflow' },
            { value: 'Operations Setup', label: 'Operations Setup' },
            { value: 'Other', label: 'Other' },
          ]}
        />
        <MobileOptimizedFooter serviceName="Househood Portals" showQuickContact={false} />
      </main>
    </div>
  );
}
