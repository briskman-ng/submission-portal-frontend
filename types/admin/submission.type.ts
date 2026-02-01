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
  status: string;
  priority: string;
  priorityUpdatedAt: null;
  priorityUpdatedBy: null;
  submittedAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    isEmailVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  files: never[];
  auditEntries: never[];
  internalNotes: never[];
  responses: never[];
}
