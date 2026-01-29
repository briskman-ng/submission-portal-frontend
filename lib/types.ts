export interface Submission {
  id: string;
  trackingId: string;
  type: string;
  subject: string;
  status: 'pending' | 'in-review' | 'processed' | 'completed' | 'rejected';
  date: string;
  lastUpdate: string;
  description?: string;
  email?: string;
  attachments?: string[];
}

export interface TimelineItem {
  status: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface SubmissionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel: string;
}

export interface StatCard {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}
