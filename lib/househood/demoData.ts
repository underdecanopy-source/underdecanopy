import type {
  HousehoodUser,
  PortalAlert,
  PortalTask,
  PortalWorkspace,
} from '@/lib/househood/types';

export const demoUser: HousehoodUser = {
  id: 'user-househood-1',
  email: 'adeola@househood.app',
  firstName: 'Adeola',
  lastName: 'Bello',
  role: 'manager',
};

export const demoWorkspaces: PortalWorkspace[] = [
  {
    id: 'ws-maple-court',
    code: 'MC-01',
    name: 'Maple Court Residences',
    description: 'Resident onboarding, service requests, and rent support for a 48-unit community.',
    lead: demoUser,
    units: 48,
    progress: 82,
    color: '#0f766e',
  },
  {
    id: 'ws-river-gate',
    code: 'RG-02',
    name: 'River Gate Estate',
    description: 'Operations dashboard for access control, announcements, and facility scheduling.',
    lead: demoUser,
    units: 72,
    progress: 64,
    color: '#1d4ed8',
  },
  {
    id: 'ws-cedar-hub',
    code: 'CH-03',
    name: 'Cedar Hub Mixed Use',
    description: 'Shared portal for residents, retail tenants, and maintenance teams.',
    lead: demoUser,
    units: 31,
    progress: 91,
    color: '#c2410c',
  },
];

export const demoTasks: PortalTask[] = [
  {
    id: 'task-1',
    workspaceId: 'ws-maple-court',
    title: 'Approve resident onboarding batch',
    description: 'Review five new applications and publish welcome credentials.',
    dueDate: '2026-05-10',
    priority: 'high',
    status: 'in_progress',
    points: 5,
  },
  {
    id: 'task-2',
    workspaceId: 'ws-river-gate',
    title: 'Publish gate access schedule',
    description: 'Update visitor access rules for the weekend maintenance window.',
    dueDate: '2026-05-11',
    priority: 'medium',
    status: 'not_started',
    points: 3,
  },
  {
    id: 'task-3',
    workspaceId: 'ws-cedar-hub',
    title: 'Close outstanding plumbing tickets',
    description: 'Confirm completion with residents and archive service notes.',
    dueDate: '2026-05-13',
    priority: 'high',
    status: 'submitted',
    points: 8,
  },
  {
    id: 'task-4',
    workspaceId: 'ws-maple-court',
    title: 'Export weekly finance summary',
    description: 'Generate the manager pack for collections, waivers, and arrears follow-up.',
    dueDate: '2026-05-15',
    priority: 'low',
    status: 'completed',
    points: 2,
  },
];

export const demoAlerts: PortalAlert[] = [
  {
    id: 'alert-1',
    title: 'Maintenance window',
    message: 'River Gate generator servicing starts Saturday at 9:00 AM.',
    createdAt: '2026-05-08T08:30:00.000Z',
    read: false,
  },
  {
    id: 'alert-2',
    title: 'Portal upload complete',
    message: 'Lease renewal files for Maple Court are now available to residents.',
    createdAt: '2026-05-08T06:15:00.000Z',
    read: true,
  },
];
