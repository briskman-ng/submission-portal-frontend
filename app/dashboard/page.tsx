"use client";

import { useMemo, useState } from "react";
import SubmissionsTable from "@/components/SubmissionTable";
import Link from "next/link";
import routes from "@/helpers/routes";
import { FileText, Clock, RefreshCw, CheckCircle2, Send } from "lucide-react";
import useGetMySubmissions from "@/react-query/queries/useGetMySubmissions";
import useGetMySubmissionStats from "@/react-query/queries/useGetMySubmissionsStats";
import { formatNumber } from "@/utils/formatters";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all",
  );

  const { data: submissionsData, isLoading: isLoadingSubmissions } =
    useGetMySubmissions();
  const { data: submissionsStats } = useGetMySubmissionStats();

  const filteredSubmissions = useMemo(() => {
    return (
      (activeTab === "all"
        ? submissionsData?.submissions
        : activeTab === "pending"
          ? submissionsData?.submissions.filter(
              (submission) => submission.status !== "completed",
            )
          : submissionsData?.submissions.filter(
              (submission) => submission.status === "completed",
            )) ?? []
    );
  }, [submissionsData?.submissions, activeTab]);

  const stats = useMemo(() => {
    return [
      {
        label: "Total Submissions",
        value: formatNumber(submissionsStats?.totalSubmissions ?? 0),
        icon: FileText,
        color: "bg-emerald-500",
      },
      {
        label: "Pending Review",
        value: formatNumber(submissionsStats?.pendingSubmissions ?? 0),
        icon: Clock,
        color: "bg-amber-500",
      },
      {
        label: "In Progress",
        value: formatNumber(submissionsStats?.inReviewSubmissions ?? 0),
        icon: RefreshCw,
        color: "bg-blue-500",
      },
      {
        label: "Completed",
        value: formatNumber(submissionsStats?.completedSubmissions ?? 0),
        icon: CheckCircle2,
        color: "bg-green-500",
      },
    ];
  }, [submissionsStats]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-emerald-950">
            My Submissions
          </h1>
          <p className="text-stone-600 mt-1">
            Track and manage all your submissions to NDDC
          </p>
        </div>
        <Link
          href={routes.createSubmission()}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2 w-fit"
        >
          <Send className="w-4 h-4" />
          New Submission
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-stone-900">
                  {stat.value}
                </p>
                <p className="text-xs text-stone-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submissions Table */}
      <div className="mb-8">
        <div className="flex border-b border-stone-200 mb-4">
          {[
            { id: "all", label: "All Submissions" },
            { id: "pending", label: "Pending" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-emerald-700 border-b-2 border-emerald-700"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <SubmissionsTable
          isLoading={isLoadingSubmissions}
          submissions={filteredSubmissions}
        />
      </div>
    </>
  );
}
