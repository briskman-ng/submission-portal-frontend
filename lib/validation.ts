import { z } from 'zod';

// Allowed submission types
const submissionTypes = ['proposal', 'report', 'request', 'complaint'] as const;

export const submissionSchema = z.object({
  type: z.enum(submissionTypes, {
    error: 'Submission type is required',
  }),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^(\+?\d{1,4}[\s-]?)?(\d{10,15})$/,
      'Invalid phone number format'
    ),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(255, 'Subject must be at most 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(5000, 'Description must be at most 5000 characters'),
  attachments: z
    .array(
      z
        .any()
        .refine(file => {
          if (!file) return true; // optional
          const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ];
          return allowedTypes.includes(file.type) && file.size <= 25 * 1024 * 1024;
        }, 'Invalid file type or file too large (max 25MB)')
    )
    .optional(),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
