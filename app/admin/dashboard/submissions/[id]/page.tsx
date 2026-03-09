"use client";

import { useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  ArrowLeft,
  FileText,
  Download,
  Mail,
  MessageSquare,
  User,
  Paperclip,
  Send,
  AlertCircle,
  History,
  Edit2,
  Flag,
  Forward,
  Eye,
} from "lucide-react";
import adminRoutes from "@/helpers/admin/routes";
import useGetSubmissionDetailsByTrackingNumber from "@/react-query/admin/queries/useGetSubmissionDetailsByTrackingNumber";
import { formatFileSize } from "@/utils/formatters";
import StatusBadge from "@/components/status-badge/status-badge.component";
import Modal from "@/components/modal/modal.component";
import useCreateModalProps from "@/hooks/useCreateModalProps";
import ChangeSubmissionStatus from "@/components/admin/submission-actions/change-status.component";
import SetSubmissionPriority from "@/components/admin/submission-actions/set-submission-priority.component";
import { Button } from "@/components/ui/button";
import AddNoteToSubmission from "@/components/admin/submission-actions/add-note-to-submission.component";
import ForwardSubmission from "@/components/admin/submission-actions/forward-submission.component";
import SubmissionResponses from "@/components/submission/submission-responses/submission-responses.component";
import useGetSubmissionResponses from "@/react-query/admin/queries/useGetSubmissionResponses";
import SendSubmissionResponse from "@/components/submission/send-submission-response/send-submission-response.component";
import { Submission } from "@/types/admin/submission.type";
import ViewAttachment from "@/components/admin/view-attachment/view-attachment.component";

interface PageProps {
  params: { id: string };
}

export default function SubmissionDetailPage({ params }: PageProps) {
  const { data: submission, isLoading: isLoadingSubmission } =
    useGetSubmissionDetailsByTrackingNumber(params.id);

  const [attachmentToView, setAttachmentToView] =
    useState<Submission["files"][number]>();

  const sendResponseModalProps = useCreateModalProps();

  const changeStatusModalProps = useCreateModalProps();
  const setPriorityModalProps = useCreateModalProps();
  const addNoteModalProps = useCreateModalProps();
  const forwardSubmissionModalProps = useCreateModalProps();
  const viewAttachmentModalProps = useCreateModalProps();

  const [activeTab, setActiveTab] = useState<
    "details" | "notes" | "responses" | "history"
  >("details");

  const { data: responsesData } = useGetSubmissionResponses(
    submission?.id as string,
  );

  const handleViewAttachment = (file: typeof attachmentToView) => {
    if (!file) return;

    setAttachmentToView(file);
    viewAttachmentModalProps.open();
  };

  if (isLoadingSubmission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-stone-800">
            Loading submission details...
          </h2>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-800">
            Submission Not Found
          </h2>
          <p className="text-stone-500 mt-2">
            The submission you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={adminRoutes.submissions()}
            className="mt-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Submissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <AdminHeader
        title={submission.trackingNumber}
        subtitle={submission.title}
      />

      <div className="p-6">
        <Link
          href={adminRoutes.submissions()}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Submissions
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={"ghost"}
                  onClick={changeStatusModalProps.open}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                >
                  <Edit2 className="w-4 h-4" /> Change Status
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={setPriorityModalProps.open}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                >
                  <Flag className="w-4 h-4" /> Set Priority
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={forwardSubmissionModalProps.open}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Forward className="w-4 h-4" /> Forward to Department
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={addNoteModalProps.open}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  <MessageSquare className="w-4 h-4" /> Add Note
                </Button>

                <Button
                  variant={"ghost"}
                  onClick={sendResponseModalProps.open}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors text-sm font-medium"
                >
                  <Send className="w-4 h-4" /> Send Response
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-stone-200">
                {[
                  { id: "details", label: "Details", icon: FileText },
                  {
                    id: "notes",
                    label: "Internal Notes",
                    icon: MessageSquare,
                    count: submission.internalNotes.length,
                  },
                  {
                    id: "responses",
                    label: "Responses",
                    icon: Send,
                    count: responsesData?.total ?? "-",
                  },
                  {
                    id: "history",
                    label: "Activity Log",
                    icon: History,
                    count: submission.auditEntries.length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? "text-emerald-700 border-b-2 border-emerald-700 bg-emerald-50/50" : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"}`}
                  >
                    <tab.icon className="w-4 h-4" /> {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-1 px-2 py-0.5 bg-stone-200 text-stone-600 text-xs rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Details Tab */}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                        Submission Content
                      </h3>
                      <div className="prose prose-stone max-w-none">
                        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                          {submission.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                        Attachments ({submission.files?.length})
                      </h3>
                      <div className="grid gap-3">
                        {submission.files?.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg border border-stone-200 flex items-center justify-center">
                                <Paperclip className="w-5 h-5 text-stone-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-stone-800">
                                  {file.originalName}
                                </p>
                                <p className="text-xs text-stone-500">
                                  {formatFileSize(Number(file.size))}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewAttachment(file)}
                                className="p-2 text-stone-400 hover:text-stone-600 hover:bg-white rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <a
                                href={file.downloadUrl}
                                download={file.originalName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer p-2 text-stone-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-colors"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <div className="space-y-4">
                    {submission.internalNotes.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageSquare className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                        <p className="text-stone-500">No internal notes yet</p>
                        <button
                          onClick={addNoteModalProps.open}
                          className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                          Add the first note
                        </button>
                      </div>
                    ) : (
                      submission.internalNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-4 bg-stone-50 rounded-lg border border-stone-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-emerald-700">
                                  {note.adminUser.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-stone-800">
                                  {note.adminUser.name}
                                </p>
                                <p className="text-xs text-stone-500">
                                  {new Date(note.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {/* {note.isPrivate && (
                              <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded">
                                Private
                              </span>
                            )} */}
                          </div>
                          <p className="text-stone-700 text-sm">
                            {note.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Responses Tab */}
                {activeTab === "responses" && (
                  <SubmissionResponses submissionId={submission.id} />
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                  <div className="space-y-0">
                    {submission?.auditEntries.length
                      ? submission.auditEntries.map((log, index) => (
                          <div key={log.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`min-w-3 min-h-3 rounded-full ${log.action === "created" ? "bg-blue-500" : log.action === "status_changed" ? "bg-emerald-500" : log.action === "forwarded" ? "bg-cyan-500" : log.action === "priority_changed" ? "bg-orange-500" : log.action === "response_sent" ? "bg-purple-500" : "bg-stone-400"}`}
                              />
                              {index < submission.auditEntries.length - 1 && (
                                <div className="w-0.5 h-full bg-stone-200 my-1" />
                              )}
                            </div>
                            <div className="pb-6 flex-1">
                              <p className="text-sm text-stone-800">
                                {log.action.replaceAll("_", " ")}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-stone-500">
                                  {log?.adminUser?.name ?? "N/A"}
                                </span>
                                <span className="text-stone-300">•</span>
                                <span className="text-xs text-stone-400">
                                  {new Date(log.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      : "N/A"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority Card */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-stone-800 mb-4">
                Status & Priority
              </h3>
              <div className="space-y-4">
                <div className="capitalize">
                  <p className="text-xs text-stone-500 mb-1">Current Status</p>

                  <StatusBadge status={submission.status} />
                </div>

                <div className="capitalize">
                  <p className="text-xs text-stone-500 mb-1">Priority</p>

                  <StatusBadge status={submission.priority} />
                </div>

                {/* {submission.assignedDepartment && (
                  <div>
                    <p className="text-xs text-stone-500 mb-1">Assigned To</p>
                    <p className="text-sm font-medium text-stone-800">
                      {submission.assignedDepartment}
                    </p>
                    {submission.assignedTo && (
                      <p className="text-xs text-stone-500">
                        {submission.assignedTo}
                      </p>
                    )}
                  </div>
                )} */}
              </div>
            </div>

            {/* Submitter Info */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-stone-800 mb-4">
                Submitter Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">
                    {submission.user?.name ?? "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <a
                    href={`mailto:${submission.user?.email}`}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    {submission?.user?.email}
                  </a>
                </div>
                {/* {submission.submitterPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span className="text-sm text-stone-700">
                      {submission.submitterPhone}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Change Status"
        description="Change submission status"
        {...changeStatusModalProps}
      >
        <ChangeSubmissionStatus
          status={submission.status}
          closeModal={changeStatusModalProps.close}
          identifier={{
            id: submission.id,
            trackingNumber: submission.trackingNumber,
          }}
        />
      </Modal>

      <Modal
        title="Send Response"
        description="Respond to a submission"
        {...sendResponseModalProps}
      >
        <SendSubmissionResponse
          submissionId={submission.id}
          handleCloseModal={sendResponseModalProps.close}
        />
      </Modal>

      <Modal
        title="Set Priority"
        description="Change submission priority"
        {...setPriorityModalProps}
      >
        <SetSubmissionPriority
          priority={submission.priority}
          closeModal={setPriorityModalProps.close}
          identifier={{
            id: submission.id,
            trackingNumber: submission.trackingNumber,
          }}
        />
      </Modal>

      <Modal title="Add Note" description="" {...addNoteModalProps}>
        <AddNoteToSubmission
          closeModal={addNoteModalProps.close}
          identifier={{
            id: submission.id,
            trackingNumber: submission.trackingNumber,
          }}
        />
      </Modal>

      <Modal
        title="Forward Submission"
        description=""
        {...forwardSubmissionModalProps}
      >
        <ForwardSubmission
          closeModal={forwardSubmissionModalProps.close}
          identifier={{
            id: submission.id,
            trackingNumber: submission.trackingNumber,
          }}
        />
      </Modal>

      <Modal
        title="View Attachment"
        description=""
        {...viewAttachmentModalProps}
        className="max-w-[800px] h-full"
      >
        <ViewAttachment file={attachmentToView} />
      </Modal>
    </div>
  );
}
