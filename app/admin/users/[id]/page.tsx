"use client";

import { useState, use } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  ArrowLeft,
  Mail,
  Shield,
  Calendar,
  Clock,
  Activity,
  Eye,
  Send,
  MessageSquare,
  Forward,
  Flag,
  Edit2,
  AlertCircle,
  Filter,
} from "lucide-react";
import { mockAdminUsers, mockSubmissions } from "@/lib/admin-mock-data";
import { roleOptions } from "@/lib/admin-types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const user = mockAdminUsers.find((u) => u.id === resolvedParams.id);

  const [dateFilter, setDateFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-800">
            User Not Found
          </h2>
          <Link
            href="/admin/users"
            className="mt-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  // Filter activity logs for this user

  // Get user's submission interactions
  const userSubmissions = mockSubmissions.filter((s) =>
    s.activityLog.some((log) => log.userId === user.id),
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-stone-100 text-stone-800";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "viewed":
        return Eye;
      case "status_changed":
        return Edit2;
      case "forwarded":
        return Forward;
      case "note_added":
        return MessageSquare;
      case "response_sent":
        return Send;
      case "priority_changed":
        return Flag;
      default:
        return Activity;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "viewed":
        return "bg-stone-100 text-stone-600";
      case "status_changed":
        return "bg-emerald-100 text-emerald-600";
      case "forwarded":
        return "bg-cyan-100 text-cyan-600";
      case "note_added":
        return "bg-purple-100 text-purple-600";
      case "response_sent":
        return "bg-blue-100 text-blue-600";
      case "priority_changed":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-stone-100 text-stone-600";
    }
  };

  // All activity for this user across submissions
  const allUserActivity = mockSubmissions
    .flatMap((submission) =>
      submission.activityLog
        .filter((log) => log.userId === user.id)
        .map((log) => ({
          ...log,
          submissionId: submission.id,
          trackingId: submission.trackingId,
          subject: submission.subject,
        })),
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  // Filter activity
  const filteredActivity = allUserActivity.filter((activity) => {
    if (actionFilter && activity.action !== actionFilter) return false;
    if (dateFilter !== "all") {
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      switch (dateFilter) {
        case "today":
          if (activityDate.toDateString() !== now.toDateString()) return false;
          break;
        case "week":
          const weekAgo = new Date(now.setDate(now.getDate() - 7));
          if (activityDate < weekAgo) return false;
          break;
        case "month":
          const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
          if (activityDate < monthAgo) return false;
          break;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen pb-8">
      <AdminHeader title="User Activity" subtitle={user.name} />

      <div className="p-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden sticky top-24">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-2xl font-bold text-emerald-700">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-white mt-4">
                  {user.name}
                </h2>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mt-2 ${getRoleBadgeColor(user.role)}`}
                >
                  {roleOptions.find((r) => r.value === user.role)?.label}
                </span>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">
                    Status:{" "}
                    <span
                      className={`font-medium ${user.status === "active" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">
                    Last login: {new Date(user.lastLogin).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <span className="text-sm text-stone-700">
                    Member since:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-stone-200 p-6">
                <h3 className="text-sm font-semibold text-stone-800 mb-4">
                  Activity Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-stone-800">
                      {allUserActivity.length}
                    </p>
                    <p className="text-xs text-stone-500">Total Actions</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-stone-800">
                      {userSubmissions.length}
                    </p>
                    <p className="text-xs text-stone-500">
                      Submissions Handled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
              {/* Filters */}
              <div className="px-6 py-4 border-b border-stone-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-stone-400" />
                    <span className="text-sm font-medium text-stone-700">
                      Filter:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["all", "today", "week", "month"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setDateFilter(range)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          dateFilter === range
                            ? "bg-emerald-700 text-white"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {range === "all"
                          ? "All Time"
                          : range.charAt(0).toUpperCase() + range.slice(1)}
                      </button>
                    ))}
                  </div>
                  <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-stone-300 rounded-lg focus:border-emerald-500 outline-none"
                  >
                    <option value="">All Actions</option>
                    <option value="viewed">Viewed</option>
                    <option value="status_changed">Status Changed</option>
                    <option value="forwarded">Forwarded</option>
                    <option value="note_added">Note Added</option>
                    <option value="response_sent">Response Sent</option>
                    <option value="priority_changed">Priority Changed</option>
                  </select>
                </div>
              </div>

              {/* Activity List */}
              <div className="divide-y divide-stone-100">
                {filteredActivity.length === 0 ? (
                  <div className="py-12 text-center">
                    <Activity className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500 font-medium">
                      No activity found
                    </p>
                    <p className="text-stone-400 text-sm mt-1">
                      Try adjusting your filters
                    </p>
                  </div>
                ) : (
                  filteredActivity.map((activity) => {
                    const ActionIcon = getActionIcon(activity.action);
                    return (
                      <div
                        key={`${activity.id}-${activity.submissionId}`}
                        className="px-6 py-4 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActionColor(activity.action)}`}
                          >
                            <ActionIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-stone-800">
                              {activity.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Link
                                href={`/admin/submissions/${activity.submissionId}`}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-mono hover:underline"
                              >
                                {activity.trackingId}
                              </Link>
                              <span className="text-stone-300">•</span>
                              <span className="text-xs text-stone-500 truncate">
                                {activity.subject}
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs text-stone-500">
                              {new Date(
                                activity.timestamp,
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-stone-400">
                              {new Date(activity.timestamp).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Load More */}
              {filteredActivity.length > 0 && (
                <div className="px-6 py-4 border-t border-stone-200 text-center">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Load more activity
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
