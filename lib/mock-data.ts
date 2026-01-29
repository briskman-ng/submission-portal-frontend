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
   RESPONSES (ADMIN → SUBMITTER)
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
