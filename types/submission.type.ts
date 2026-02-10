import { Status } from "@/components/status-badge/status.config";

export interface Submission {
  id: string;
  trackingNumber: string;
  type: string;
  title: string;
  description: string;
  contactInformation: {
    name: string;
    email: string;
  };
  status: Status;
  statusHistory: {
    status: string;
    timestamp: string;
  }[];
  priority: string;
  priorityUpdatedAt: string | null;
  priorityUpdatedBy: null;
  submittedAt: string;
  updatedAt: string;
  userId: string;
  files: never[];
  responses: never[];
  timeline: {
    name: string;
    status: Status;
    completedAt?: string;
  }[];
}
