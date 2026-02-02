"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Eye,
} from "lucide-react";
import { mockSubmissions, mockDashboardStats } from "@/lib/admin-mock-data";
import { typeOptions } from "@/lib/admin-types";
import useGetTodayDashboardStatistics from "@/react-query/admin/queries/useGetTodayDashboardStatistics";
import { formatNumber } from "@/utils/formatters";
import { statusOptions } from "@/components/admin/submission-actions/change-status.component";
import { priorityOptions } from "@/components/admin/submission-actions/set-submission-priority.component";

const typeLabels: Record<string, string> = {
  proposal: "Project Proposal",
  report: "Progress Report",
  request: "Formal Request",
  complaint: "Complaint/Feedback",
};

export default function AdminDashboardPage() {
  const [dateFilter, setDateFilter] = useState<
    "today" | "week" | "month" | "custom"
  >("today");

  const { data: todayDashboardStatistics } = useGetTodayDashboardStatistics();

  const stats = useMemo(() => {
    return [
      {
        label: "Total Submissions",
        value: formatNumber(todayDashboardStatistics?.totalSubmissions ?? 0),
        icon: FileText,
        color: "bg-blue-500",
        change: "+12%",
        changeType: "up",
      },
      {
        label: "New Today",
        value: formatNumber(todayDashboardStatistics?.newSubmissions ?? 0),
        icon: Clock,
        color: "bg-amber-500",
        change: "+3",
        changeType: "up",
      },
      {
        label: "Pending Review",
        value: formatNumber(todayDashboardStatistics?.pendingSubmissions ?? 0),
        icon: AlertTriangle,
        color: "bg-orange-500",
        change: "-5",
        changeType: "down",
      },
      {
        label: "Completed Today",
        value: formatNumber(
          todayDashboardStatistics?.completedSubmissions ?? 0,
        ),
        icon: CheckCircle2,
        color: "bg-emerald-500",
        change: "+2",
        changeType: "up",
      },
    ];
  }, [todayDashboardStatistics]);

  const recentSubmissions = mockSubmissions.slice(0, 5);

  const getStatusColor = (status: string) => {
    return (
      statusOptions.find((s) => s.value === status)?.color ||
      "bg-stone-100 text-stone-800"
    );
  };

  const getPriorityColor = (priority: string) => {
    return (
      priorityOptions.find((p) => p.value === priority)?.color ||
      "bg-stone-100 text-stone-800"
    );
  };

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="Overview of submissions and activity"
      />

      <div className="p-6">
        {/* Quick Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-stone-200">
            {[
              { id: "today", label: "Today" },
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
              { id: "custom", label: "Custom" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setDateFilter(filter.id as typeof dateFilter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  dateFilter === filter.id
                    ? "bg-emerald-700 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {dateFilter === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="px-3 py-2 border border-stone-300 rounded-lg text-sm"
              />
              <span className="text-stone-400">to</span>
              <input
                type="date"
                className="px-3 py-2 border border-stone-300 rounded-lg text-sm"
              />
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.changeType === "up"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.changeType === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-stone-900 mt-4">
                {stat.value}
              </p>
              <p className="text-stone-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Submissions */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">
                Recent Submissions
              </h2>
              <Link
                href="/admin/submissions"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-stone-100">
              {recentSubmissions.map((submission) => (
                <Link
                  key={submission.id}
                  href={`/admin/submissions/${submission.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-medium text-emerald-700">
                        {submission.trackingId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(submission.priority)}`}
                      >
                        {submission.priority}
                      </span>
                    </div>
                    <p className="text-sm text-stone-800 font-medium truncate">
                      {submission.subject}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {submission.submitterName} • {typeLabels[submission.type]}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}
                    >
                      {
                        statusOptions.find((s) => s.value === submission.status)
                          ?.label
                      }
                    </span>
                    <span className="text-xs text-stone-400">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Submissions by Status */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="px-6 py-4 border-b border-stone-200">
              <h2 className="font-semibold text-stone-800">
                Submissions by Status
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {statusOptions.slice(0, 6).map((status) => {
                const count = mockSubmissions.filter(
                  (s) => s.status === status.value,
                ).length;
                const percentage = (count / mockSubmissions.length) * 100;
                return (
                  <div key={status.value}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-stone-600">
                        {status.label}
                      </span>
                      <span className="text-sm font-medium text-stone-800">
                        {count}
                      </span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${status.color.replace("text-", "bg-").replace("-800", "-500")}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "New Submissions",
              count: 12,
              href: "/admin/submissions?status=new",
              color: "border-blue-500",
            },
            {
              label: "Urgent Priority",
              count: 3,
              href: "/admin/submissions?priority=urgent",
              color: "border-red-500",
            },
            {
              label: "Awaiting Response",
              count: 8,
              href: "/admin/submissions?status=in-review",
              color: "border-amber-500",
            },
            {
              label: "This Week",
              count: 47,
              href: "/admin/submissions?range=week",
              color: "border-emerald-500",
            },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`bg-white rounded-xl p-4 border-l-4 ${action.color} border border-stone-200 hover:shadow-md transition-shadow`}
            >
              <p className="font-display text-2xl font-bold text-stone-800">
                {action.count}
              </p>
              <p className="text-sm text-stone-600">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
