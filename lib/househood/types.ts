export type HousehoodRole = 'resident' | 'manager' | 'operations';

export interface HousehoodUser {
  id: string;
  email: string;
  role: HousehoodRole;
  firstName?: string;
  lastName?: string;
  displayName?: string;
}

export interface PortalWorkspace {
  id: string;
  code: string;
  name: string;
  description: string;
  lead: HousehoodUser;
  units: number;
  progress: number;
  color: string;
}

export interface PortalTask {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'submitted' | 'completed';
  points: number;
}

export interface PortalAlert {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}
