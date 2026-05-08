'use client';

import { useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Search,
  TriangleAlert,
} from 'lucide-react';
import { demoAlerts, demoTasks, demoUser, demoWorkspaces } from '@/lib/househood/demoData';
import type { PortalTask, PortalWorkspace } from '@/lib/househood/types';

function HousehoodLogin({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState(demoUser.email);
  const [password, setPassword] = useState('househood-demo');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center px-4">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-slate-900">Househood Portals</h1>
          <p className="mt-2 text-sm text-slate-600">
            Demo access for resident, manager, and operations workflows.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="househood-email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="househood-email"
              type="email"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="househood-password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                id="househood-password"
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSignIn}
          className="mt-6 w-full rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Enter demo portal
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          This is a contained demo route. No existing repository auth or production data is modified.
        </p>
      </div>
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: PortalWorkspace }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-2" style={{ backgroundColor: workspace.color }} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{workspace.code}</p>
            <h3 className="text-xl font-semibold text-slate-900">{workspace.name}</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {workspace.units} units
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">{workspace.description}</p>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
            <span>Workflow coverage</span>
            <span>{workspace.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full"
              style={{ width: `${workspace.progress}%`, backgroundColor: workspace.color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TasksList({ tasks }: { tasks: PortalTask[] }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
        No tasks in this view.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{task.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{task.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{task.points} pts</span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{task.priority} priority</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              due {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HousehoodPortalDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');

  const urgentTasks = useMemo(
    () =>
      demoTasks.filter(
        (task) => new Date(task.dueDate).getTime() < Date.now() + 7 * 24 * 60 * 60 * 1000,
      ),
    [],
  );

  const filteredWorkspaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return demoWorkspaces;
    }

    return demoWorkspaces.filter((workspace) =>
      [workspace.code, workspace.name, workspace.description].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [search]);

  if (!isAuthenticated) {
    return <HousehoodLogin onSignIn={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="page-container flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Househood Portals</p>
              <h1 className="text-xl font-semibold text-slate-900">Operations dashboard</h1>
            </div>
          </div>

          <div className="flex flex-1 items-center gap-3 lg:max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search communities, files, tasks..."
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-semibold text-slate-950">
                {demoAlerts.filter((alert) => !alert.read).length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="page-container py-8">
        <section className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-8 text-white shadow-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Welcome back</p>
          <h2 className="mt-3 text-3xl font-bold">
            {demoUser.firstName} {demoUser.lastName}
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            You are covering {demoWorkspaces.length} workspaces and {urgentTasks.length} time-sensitive tasks this week.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Active workspaces', value: demoWorkspaces.length, tone: 'text-emerald-600', icon: <BookOpen className="h-5 w-5" /> },
            { label: 'Tracked tasks', value: demoTasks.length, tone: 'text-blue-600', icon: <Clock className="h-5 w-5" /> },
            { label: 'Urgent this week', value: urgentTasks.length, tone: 'text-amber-600', icon: <TriangleAlert className="h-5 w-5" /> },
            { label: 'Unread alerts', value: demoAlerts.filter((alert) => !alert.read).length, tone: 'text-slate-900', icon: <Calendar className="h-5 w-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`flex items-center justify-between ${stat.tone}`}>
                {stat.icon}
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Communities and workspaces</h2>
            <p className="text-sm text-slate-500">{filteredWorkspaces.length} results</p>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="mb-5 text-2xl font-semibold text-slate-900">Open operational tasks</h2>
            <TasksList tasks={demoTasks} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Activity alerts</h3>
              <div className="mt-4 space-y-3">
                {demoAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-slate-900">{alert.title}</p>
                      {!alert.read && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{alert.message}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Integration note</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This demo route intentionally uses local typed data instead of the attached Express and TypeORM backend.
                That keeps the main repository’s stable runtime, auth, and database layers unchanged while still integrating the portal experience.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
