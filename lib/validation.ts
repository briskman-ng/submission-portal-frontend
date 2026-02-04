import { z } from "zod";

// Allowed submission types
const submissionTypes = [
  "project_proposal",
  "report",
  "request",
  "complaint",
] as const;

export const submissionSchema = z.object({
  // Use string validation with refine instead of enum
  type: z
    .string()
    .min(1, "Submission type is required")
    .refine(
      (val) =>
        submissionTypes.includes(val as (typeof submissionTypes)[number]),
      "Please select a valid submission type",
    ),

  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+?\d{1,4}[\s-]?)?(\d{10,15})$/, "Invalid phone number format"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(255, "Subject must be at most 255 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description must be at most 5000 characters"),
  attachments: z
    .array(
      z.any().refine((file) => {
        if (!file) return true; // optional
        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
        ];
        return (
          allowedTypes.includes(file.type) && file.size <= 25 * 1024 * 1024
        );
      }, "Invalid file type or file too large (max 25MB)"),
    )
    .optional(),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
