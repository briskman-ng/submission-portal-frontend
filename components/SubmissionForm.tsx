"use client";

import { useState } from "react";
import {
  FileText,
  Send,
  MessageSquare,
  BarChart3,
  Upload,
  ArrowRight,
  Phone,
  X,
  User,
} from "lucide-react";
import { submissionSchema } from "@/lib/validation";
import { ZodError, z } from "zod";
import useUserStore from "@/store/user-store";
import useCreateSubmission from "@/react-query/mutations/useCreateSubmission";
import Modal from "./modal/modal.component";
import SignInComponent from "./auth/sign-in/sign-in.component";
import useCreateModalProps from "@/hooks/useCreateModalProps";
import useCreateSubmissionForGuest from "@/react-query/mutations/useCreateSubmissionForGuest";
import { formatFileSize } from "@/utils/formatters";

type FormData = z.infer<typeof submissionSchema> & {
  name: string;
  phone: string;
  attachments: File[];
};

interface SubmissionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    type: "" as any,
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    attachments: [],
  });

  const createAccountModalProps = useCreateModalProps();

  const { mutate: createSubmission, isPending: isCreatingSubmission } =
    useCreateSubmission();
  const {
    mutate: createSubmissionForGuest,
    isPending: isCreatingSubmissionForGuest,
  } = useCreateSubmissionForGuest();

  const user = useUserStore((state) => state.user);

  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const submissionTypes: SubmissionType[] = [
    { id: "Proposal", label: "Project Proposal", icon: FileText },
    { id: "Report", label: "Progress Report", icon: BarChart3 },
    { id: "Request", label: "Formal Request", icon: Send },
    { id: "Complaint", label: "Complaint/Feedback", icon: MessageSquare },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrors({});

    try {
      // Validate form data
      submissionSchema.parse(formData);

      if (user) {
        const fd = new FormData();

        fd.append("type", formData.type.toLowerCase());
        fd.append("title", formData.subject);
        fd.append("description", formData.description);

        formData.attachments.forEach((file) => {
          fd.append("files", file);
        });

        createSubmission(fd);
      } else {
        // Request OTP
        return createAccountModalProps.open();
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        const flattened = err.flatten().fieldErrors;
        if (flattened && typeof flattened === "object") {
          Object.entries(flattened).forEach(([key, msgs]) => {
            if (Array.isArray(msgs) && msgs.length > 0) {
              fieldErrors[key as keyof FormData] = msgs[0];
            }
          });
        }
        setErrors(fieldErrors);
      } else {
        console.error("Submission error", err);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only PDF, DOCX, JPEG, PNG allowed.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert("File too large. Max size is 25MB.");
      return;
    }

    // Replace any existing file with the new one
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, file],
    }));
  };

  const removeFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a, idx) => idx !== index),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      const relatedTarget = e.relatedTarget as Node;
      const dropzone = e.currentTarget;

      if (!dropzone.contains(relatedTarget)) {
        setDragActive(false);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
      e.dataTransfer.clearData();
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-white">
            New Submission
          </h2>
          <p className="text-emerald-200 text-sm">
            Fill in the details to start
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Submission Type */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Submission Type <span className="text-orange-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {submissionTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: prev.type === type.id ? "" : (type.id as any),
                    }))
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                    formData.type === type.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                      : "border-stone-200 hover:border-stone-300 text-stone-600"
                  }`}
                >
                  <type.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
            {errors.type && (
              <p className="text-xs text-red-500 mt-1">{errors.type}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Full Name <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full pl-10 px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Contact Email <span className="text-orange-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Phone Number <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full pl-10 px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Subject <span className="text-orange-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Brief title for your submission"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 text-sm"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Description <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Provide details about your submission (max 5000 characters)"
              maxLength={5000}
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-stone-800 placeholder-stone-400 resize-none text-sm"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">
              Attachment
            </label>

            {/* File dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onClick={() => document.getElementById("fileInput")?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-all cursor-pointer ${
                dragActive
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-stone-300 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <Upload
                className={`w-5 h-5 mx-auto mb-2 ${dragActive ? "text-emerald-500" : "text-stone-400"}`}
              />
              <p className="text-xs text-stone-600 mb-1">
                <span className="text-emerald-600 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-stone-400">
                PDF, DOCX, JPEG, PNG up to 25MB
              </p>

              {/* Hidden file input */}
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
                accept=".pdf,.docx,.jpeg,.jpg,.png"
              />
            </div>

            {/* File preview */}
            {formData.attachments?.map((attachment, idx) => (
              <div key={idx} className="mt-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-800 truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {formatFileSize(attachment.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => removeFile(e, idx)}
                      className="ml-2 p-1.5 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-emerald-600 mt-2 text-center">
                    ✓ File will be saved with your submission
                  </p>
                </div>
              </div>
            ))}

            {errors.attachments && (
              <p className="text-xs text-red-500 mt-1">{errors.attachments}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isCreatingSubmissionForGuest || isCreatingSubmission}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingSubmissionForGuest || isCreatingSubmission ? (
              <>
                <span className="animate-spin">⟳</span>
                Sending response...
              </>
            ) : (
              <>
                Submit to NDDC
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-stone-500">
            By submitting, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>

      {/* Modal */}

      <Modal
        title="Create Account / Sign in"
        description="An NDDC Connect Hub account will be created for you if you don't already have one."
        {...createAccountModalProps}
      >
        <SignInComponent
          defaultValues={{
            email: formData.email,
            name: formData.name,
            onSuccess: () => {
              const fd = new FormData();

              fd.append("type", formData.type.toLowerCase());
              fd.append("title", formData.subject);
              fd.append("description", formData.description);

              formData.attachments.forEach((file) => {
                fd.append("files", file);
              });

              createSubmissionForGuest(fd);

              createAccountModalProps.close();
            },
          }}
        />
      </Modal>
    </>
  );
};

export default SubmissionForm;
