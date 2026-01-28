import { z } from "zod";

// Zod schema
export const submissionSchema = z.object({
  submissionType: z.enum(["proposal", "request", "report", "complaint"], {
    message: "Please select a submission type",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  topic: z.string().min(3, { message: "Topic must be at least 3 characters" }),
  referralSource: z
    .string()
    .min(3, { message: "Please let us know how you heard about this portal" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  file: z
    .any()
    .refine((files) => files?.length === 1, { message: "Please upload one file" }),
});

// TypeScript type
export type SubmissionFormData = z.infer<typeof submissionSchema>;
