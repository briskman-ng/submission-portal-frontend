import { Status } from "@/components/status-badge/status.config";

export interface Submissions {
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
  priority: string;
  priorityUpdatedAt: string | null;
  priorityUpdatedBy: string | null;
  submittedAt: string;
  updatedAt: string;
  userId: string;
  files: never[];
}
