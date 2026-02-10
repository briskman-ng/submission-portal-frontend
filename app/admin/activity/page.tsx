"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Search,
  Filter,
  Activity,
  Eye,
  Edit2,
  Forward,
  MessageSquare,
  Send,
  Flag,
  Download,
  RefreshCw,
  ChevronDown,
  User,
  FileText,
  X,
} from "lucide-react";
import { mockSubmissions, mockAdminUsers } from "@/lib/admin-mock-data";

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Combine all activity from all submissions
  const allActivity = useMemo(() => {
    return mockSubmissions
      .flatMap((submission) =>
        submission.activityLog.map((log) => ({
          ...log,
          submissionId: submission.id,
          trackingId: submission.trackingId,
          subject: submission.subject,
          submitterName: submission.submitterName,
        })),
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
  }, []);

  // Filter activity
  const filteredActivity = useMemo(() => {
    return allActivity.filter((activity) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          activity.trackingId.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.userName.toLowerCase().includes(query) ||
          activity.subject.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Action filter
      if (actionFilter && activity.action !== actionFilter) return false;

      // User filter
      if (userFilter && activity.userId !== userFilter) return false;

      // Date filter
      if (dateFilter !== "all") {
        const activityDate = new Date(activity.timestamp);
        const now = new Date();

        switch (dateFilter) {
          case "today":
            if (activityDate.toDateString() !== now.toDateString())
              return false;
            break;
          case "week":
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            if (activityDate < weekAgo) return false;
            break;
          case "month":
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            if (activityDate < monthAgo) return false;
            break;
          case "custom":
            if (startDate && activityDate < new Date(startDate)) return false;
            if (endDate) {
              const end = new Date(endDate);
              end.setHours(23, 59, 59, 999);
              if (activityDate > end) return false;
            }
            break;
        }
      }

      return true;
    });
  }, [
    allActivity,
    searchQuery,
    actionFilter,
    userFilter,
    dateFilter,
    startDate,
    endDate,
  ]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return FileText;
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
      case "assigned":
        return User;
      case "downloaded":
        return Download;
      default:
        return Activity;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-blue-100 text-blue-600";
      case "viewed":
        return "bg-stone-100 text-stone-600";
      case "status_changed":
        return "bg-emerald-100 text-emerald-600";
      case "forwarded":
        return "bg-cyan-100 text-cyan-600";
      case "note_added":
        return "bg-purple-100 text-purple-600";
      case "response_sent":
        return "bg-indigo-100 text-indigo-600";
      case "priority_changed":
        return "bg-orange-100 text-orange-600";
      case "assigned":
        return "bg-pink-100 text-pink-600";
      case "downloaded":
        return "bg-teal-100 text-teal-600";
      default:
        return "bg-stone-100 text-stone-600";
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "created":
        return "Created";
      case "viewed":
        return "Viewed";
      case "status_changed":
        return "Status Changed";
      case "forwarded":
        return "Forwarded";
      case "note_added":
        return "Note Added";
      case "response_sent":
        return "Response Sent";
      case "priority_changed":
        return "Priority Changed";
      case "assigned":
        return "Assigned";
      case "downloaded":
        return "Downloaded";
      default:
        return action;
    }
  };

  const actionOptions = [
    "created",
    "viewed",
    "status_changed",
    "forwarded",
    "note_added",
    "response_sent",
    "priority_changed",
    "assigned",
    "downloaded",
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("all");
    setActionFilter("");
    setUserFilter("");
    setStartDate("");
    setEndDate("");
  };

  const hasActiveFilters =
    actionFilter || userFilter || dateFilter !== "all" || searchQuery;

  // Group activity by date
  const groupedActivity = useMemo(() => {
    const groups: Record<string, typeof filteredActivity> = {};
    filteredActivity.forEach((activity) => {
      const date = new Date(activity.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(activity);
    });
    return groups;
  }, [filteredActivity]);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Activity Log"
        subtitle="Track all actions across the system"
      />

      <div className="p-6">
        {/* Search and Quick Filters */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by tracking ID, user, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>

              {/* Quick Date Filters */}
              <div className="flex items-center gap-2">
                {["all", "today", "week", "month"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateFilter(range)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      dateFilter === range
                        ? "bg-emerald-700 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {range === "all"
                      ? "All"
                      : range === "today"
                        ? "Today"
                        : range === "week"
                          ? "This Week"
                          : "This Month"}
                  </button>
                ))}
              </div>

              {/* More Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                  showFilters || hasActiveFilters
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-white border-stone-300 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Action Filter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Action Type
                    </label>
                    <select
                      value={actionFilter}
                      onChange={(e) => setActionFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">All Actions</option>
                      {actionOptions.map((action) => (
                        <option key={action} value={action}>
                          {getActionLabel(action)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* User Filter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Admin User
                    </label>
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">All Users</option>
                      {mockAdminUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Date Range */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Custom Date Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setDateFilter("custom");
                        }}
                        className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:border-emerald-500 outline-none"
                      />
                      <span className="text-stone-400">to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setDateFilter("custom");
                        }}
                        className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-2xl font-bold text-stone-900">
              {filteredActivity.length}
            </p>
            <p className="text-xs text-stone-500">Total Activities</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-2xl font-bold text-stone-900">
              {
                filteredActivity.filter((a) => a.action === "status_changed")
                  .length
              }
            </p>
            <p className="text-xs text-stone-500">Status Changes</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-2xl font-bold text-stone-900">
              {filteredActivity.filter((a) => a.action === "forwarded").length}
            </p>
            <p className="text-xs text-stone-500">Forwards</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-2xl font-bold text-stone-900">
              {
                filteredActivity.filter((a) => a.action === "response_sent")
                  .length
              }
            </p>
            <p className="text-xs text-stone-500">Responses Sent</p>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
            <h2 className="font-semibold text-stone-800">Activity Timeline</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {Object.keys(groupedActivity).length === 0 ? (
            <div className="py-12 text-center">
              <Activity className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 font-medium">No activity found</p>
              <p className="text-stone-400 text-sm mt-1">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {Object.entries(groupedActivity).map(([date, activities]) => (
                <div key={date}>
                  {/* Date Header */}
                  <div className="px-6 py-2 bg-stone-50 sticky top-0">
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      {new Date(date).toLocaleDateString("en-NG", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Activities for this date */}
                  {activities.map((activity) => {
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
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <Link
                                href={`/admin/submissions/${activity.submissionId}`}
                                className="text-xs text-emerald-600 hover:text-emerald-700 font-mono hover:underline"
                              >
                                {activity.trackingId}
                              </Link>
                              <span className="text-stone-300">•</span>
                              <span className="text-xs text-stone-500 truncate max-w-xs">
                                {activity.subject}
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-medium text-stone-700">
                              {activity.userName}
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
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredActivity.length > 0 && (
            <div className="px-6 py-4 border-t border-stone-200 text-center bg-stone-50">
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Load more activity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
