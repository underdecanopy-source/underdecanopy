export interface HousehoodUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'resident' | 'manager' | 'operations';
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
