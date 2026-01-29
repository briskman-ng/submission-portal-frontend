/* =======================
   ADMIN USERS
======================= */

export type AdminRole = 'super_admin' | 'admin' | 'staff';
export type AdminStatus = 'active' | 'inactive';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  createdAt: string;
}

/* =======================
   SUBMISSION CORE TYPES
======================= */

export type SubmissionType =
  | 'proposal'
  | 'report'
  | 'request'
  | 'complaint';

export type SubmissionStatus =
  | 'new'
  | 'pending'
  | 'in-review'
  | 'forwarded'
  | 'processed'
  | 'completed'
  | 'resolved'
  | 'rejected';

export type SubmissionPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

/* =======================
   UI OPTION TYPES
======================= */

export interface StatusOption {
  value: SubmissionStatus;
  label: string;
  color: string;
}

export interface PriorityOption {
  value: SubmissionPriority;
  label: string;
  color: string;
}

export interface TypeOption {
  value: SubmissionType;
  label: string;
}

/* =======================
   UI OPTIONS (USED BY DASHBOARD)
======================= */

export const statusOptions: StatusOption[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  { value: 'in-review', label: 'In Review', color: 'bg-purple-100 text-purple-800' },
  { value: 'forwarded', label: 'Forwarded', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'processed', label: 'Processed', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
];

export const priorityOptions: PriorityOption[] = [
  { value: 'low', label: 'Low', color: 'bg-stone-100 text-stone-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
];

export const typeOptions: TypeOption[] = [
  { value: 'proposal', label: 'Project Proposal' },
  { value: 'report', label: 'Progress Report' },
  { value: 'request', label: 'Formal Request' },
  { value: 'complaint', label: 'Complaint / Feedback' }
];

/* =======================
   ATTACHMENTS
======================= */

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedAt?: string;
}

/* =======================
   INTERNAL NOTES
======================= */

export interface InternalNote {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  isPrivate: boolean;
}

/* =======================
   RESPONSES
======================= */

export type ResponseType = 'holding' | 'detailed';
export type ResponseChannel = 'email' | 'sms' | 'both';

export interface SubmissionResponse {
  id: string;
  type: ResponseType;
  content: string;
  authorId: string;
  authorName: string;
  sentAt: string;
  sentVia: ResponseChannel;
}

/* =======================
   ACTIVITY LOGS
======================= */

export type ActivityAction =
  | 'created'
  | 'viewed'
  | 'assigned'
  | 'forwarded'
  | 'status_changed'
  | 'priority_changed'
  | 'note_added'
  | 'response_sent'
  | 'downloaded';

export interface ActivityLogEntry {
  id: string;
  action: ActivityAction;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

/* =======================
   ADMIN SUBMISSION
======================= */

export interface AdminSubmission {
  id: string;
  trackingId: string;

  submitterName: string;
  submitterEmail: string;
  submitterPhone?: string;

  type: SubmissionType;
  subject: string;
  description: string;

  status: SubmissionStatus;
  priority: SubmissionPriority;

  assignedTo?: string;
  assignedDepartment?: string;

  submittedAt: string;
  lastUpdated: string;

  attachments: Attachment[];
  internalNotes: InternalNote[];
  responses: SubmissionResponse[];
  activityLog: ActivityLogEntry[];
}

/* =======================
   DASHBOARD
======================= */

export interface DashboardStats {
  totalSubmissions: number;
  newSubmissions: number;
  pendingReview: number;
  completedToday?: number;
  resolvedToday?: number;
  urgentCount?: number;
  avgResponseTime: string;
}

/* =======================
   DEPARTMENTS
======================= */

export const departments: string[] = [
  'Finance',
  'Legal',
  'Human Resources',
  'IT & Digital Services',
  'Operations',
  'Procurement',
  'Engineering',
  'Community Development',
  'Environmental Affairs',
  'Public Relations',
  'Research & Strategy'
];

export type RoleValue = 'super_admin' | 'admin' | 'staff';

export interface RoleOption {
  value: RoleValue;
  label: string;
  description?: string;
}

export const roleOptions: RoleOption[] = [
  { value: 'super_admin', label: 'Super Admin', description: 'Full access to all features' },
  { value: 'admin', label: 'Admin', description: 'Limited admin access' },
  { value: 'staff', label: 'Staff', description: 'Standard staff user' },
];

