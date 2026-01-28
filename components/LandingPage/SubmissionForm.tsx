"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { submissionSchema, SubmissionFormData } from "@/types/landingPageSubmission";

export default function SubmissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const onSubmit = (data: SubmissionFormData) => {
    console.log("Dummy submission:", data);
    toast.success("Submission confirmed!");
    reset(); // reset form after submit
  };

  const borderColor = "border-[#D0E7E1] 2px border";
  const focusBorder = "focus:border-green-500 focus:ring-1 focus:ring-green-500";
  const inputBg = "bg-white";
  const textColor = "text-[#0E1B18]";
  const placeholderColor = "placeholder-[#868D8B]";

  return (
    <section className="mx-auto max-w-2xl px-6 py-10 bg-[#F6F8F7] rounded-2xl">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-[#0E1B18]">Submission Form</h2>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to start your submission process.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Submission Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">Submission Type</label>
          <select
            {...register("submissionType")}
            className={`w-full rounded-lg px-4 py-3 text-sm ${textColor} ${placeholderColor} outline-none ${inputBg} ${borderColor} ${focusBorder}`}
          >
            <option value="">Select submission category</option>
            <option value="proposal">Proposal</option>
            <option value="request">Request</option>
            <option value="report">Report</option>
            <option value="complaint">Complaint</option>
          </select>
          {errors.submissionType && (
            <p className="mt-1 text-xs text-red-500">{errors.submissionType?.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">Contact Email Address</label>
          <input
            type="email"
            placeholder="email@agency.gov.ng"
            {...register("email")}
            className={`w-full rounded-lg px-4 py-3 text-sm ${textColor} ${placeholderColor} outline-none ${inputBg} ${borderColor} ${focusBorder}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Topic */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">Topic</label>
          <input
            type="text"
            placeholder="Enter submission topic"
            {...register("topic")}
            className={`w-full rounded-lg px-4 py-3 text-sm ${textColor} ${placeholderColor} outline-none ${inputBg} ${borderColor} ${focusBorder}`}
          />
          {errors.topic && (
            <p className="mt-1 text-xs text-red-500">{errors.topic.message}</p>
          )}
        </div>

        {/* How did you hear about this portal */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">
            How did you hear about this portal?
          </label>
          <textarea
            rows={3}
            placeholder="Let us know how you found this portal..."
            {...register("referralSource")}
            className={`w-full resize-none rounded-lg px-4 py-3 text-sm ${textColor} ${placeholderColor} outline-none ${inputBg} ${borderColor} ${focusBorder}`}
          />
          {errors.referralSource && (
            <p className="mt-1 text-xs text-red-500">{errors.referralSource.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">Detailed Description</label>
          <textarea
            rows={4}
            placeholder="Briefly describe the purpose of this submission..."
            {...register("description")}
            className={`w-full resize-none rounded-lg px-4 py-3 text-sm ${textColor} ${placeholderColor} outline-none ${inputBg} ${borderColor} ${focusBorder}`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#0E1B18]">Document Upload (PDF, DOCX)</label>
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${borderColor} ${inputBg} px-6 py-10 text-center hover:border-green-400`}
          >
            <Image
              src="/UploadTwo.svg"
              alt="Upload Icon"
              width={24}
              height={24}
              className="mb-3"
            />
            <span className="text-sm font-medium text-gray-800">Click to upload or drag and drop</span>
            <span className="mt-1 text-xs text-gray-500">Maximum file size 25MB</span>
            <input type="file" {...register("file")} className="hidden" />
          </label>
          {errors.file && (
            <p className="mt-1 text-xs text-red-500">
              {typeof errors.file.message === "string" ? errors.file.message : "Invalid file"}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-4 text-sm font-semibold text-white hover:bg-green-600"
        >
          Submit Official Document
          <Image
            src="/SubmitOne.svg"
            alt="Submit Icon"
            width={20}
            height={20}
          />
        </button>
      </form>
    </section>
  );
}
