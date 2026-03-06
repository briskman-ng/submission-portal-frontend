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
  priority: Status;
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
  files: {
    id: string;
    originalName: string;
    mimeType: string;
    size: string;
    uploadedAt: string;
    submissionId: string;
    downloadUrl: string;
  }[];
  auditEntries: {
    id: string;
    action: string;
    entityType: string;
    entityId: string;
    previousValue: string;
    newValue: string;
    timestamp: string;
    adminUserId: string;
    submissionId: string;
    responseId: null;
    adminUser: {
      name: string;
      email: string;
    };
  }[];
  internalNotes: {
    id: string;
    content: string;
    createdAt: string;
    submissionId: string;
    adminUserId: string;
    adminUser: {
      name: string;
      email: string;
    };
  }[];
  responses: never[];
}

export interface SubmissionResponses {
  id: string;
  responseType: string;
  subject: string;
  content: string;
  deliveryMethod: "email_only" | "portal_only" | "both";
  sentAt: string;
  sentBy: {
    id: string;
    name: string;
    email: string;
    azureObjectId: null;
    role: string;
    mustChangePassword: boolean;
    isActive: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
  deliveryStatus: {
    emailSent: boolean;
    emailDeliveredAt: string;
    portalStored: boolean;
    portalStoredAt: string;
  };
  requiresAction: boolean;
  actionItems: never[];
}
