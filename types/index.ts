export interface Login {
  email: string;
  password: string;
}

// types/index.ts
export interface ContactInformation {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

export interface SubmissionRequest {
  type: string;
  title: string;
  description: string;
  contactInformation: ContactInformation;
  file?: File;
  name: string;
  email: string;
}

export interface SubmissionResponse {
  id: string;
  trackingNumber: string;
  title: string;
  type: string;
  status: string;
  contactInformation: ContactInformation;
  submittedAt: string;
  message: string;
  name: string;
  email: string;
}

export interface SubmissionError {
  status: number;
  data: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}

// Form types (for your current form)
export interface FormData {
  type: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  attachments: File[];
}

// Redux state types
export interface SubmissionState {
  formData: FormData | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  trackingNumber: string | null;
}
