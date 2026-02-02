"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Calendar,
  ArrowUpDown,
  X,
  Download,
  RefreshCw,
} from "lucide-react";
import { typeOptions } from "@/lib/admin-types";
import adminRoutes from "@/helpers/admin/routes";
import useGetAllSubmissions from "@/react-query/admin/queries/useGetAllSubmissions";
import dayjs from "dayjs";
import { statusOptions } from "@/components/admin/submission-actions/change-status.component";
import { priorityOptions } from "@/components/admin/submission-actions/set-submission-priority.component";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/util";
import getPaginationRange from "@/utils/getPaginationRange";

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: "all",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
    priority: "",
  });
  const [sortBy, setSortBy] = useState<"date" | "priority" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? 1);
  const status = searchParams.get("status") ?? "";

  const { data: submissionsData, isLoading: isLoadingSubmissions } =
    useGetAllSubmissions({ page, status });

  const filteredSubmissions = useMemo(() => {
    let result = [...(submissionsData?.submissions ?? [])];

    return result;
  }, [submissionsData]);

  // Filter and sort submissions
  // const filteredSubmissions = useMemo(() => {
  //   let result = [...mockSubmissions];

  //   // Search filter
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     result = result.filter(
  //       (s) =>
  //         s.trackingId.toLowerCase().includes(query) ||
  //         s.submitterName.toLowerCase().includes(query) ||
  //         s.subject.toLowerCase().includes(query) ||
  //         s.submitterEmail.toLowerCase().includes(query),
  //     );
  //   }

  //   // Type filter
  //   if (filters.type) {
  //     result = result.filter((s) => s.type === filters.type);
  //   }

  //   // Status filter
  //   if (filters.status) {
  //     result = result.filter((s) => s.status === filters.status);
  //   }

  //   // Priority filter
  //   if (filters.priority) {
  //     result = result.filter((s) => s.priority === filters.priority);
  //   }

  //   // Date range filter
  //   if (filters.dateRange !== "all") {
  //     const now = new Date();
  //     let startDate: Date;

  //     switch (filters.dateRange) {
  //       case "today":
  //         startDate = new Date(now.setHours(0, 0, 0, 0));
  //         break;
  //       case "week":
  //         startDate = new Date(now.setDate(now.getDate() - 7));
  //         break;
  //       case "month":
  //         startDate = new Date(now.setMonth(now.getMonth() - 1));
  //         break;
  //       case "custom":
  //         if (filters.startDate) {
  //           startDate = new Date(filters.startDate);
  //         }
  //         break;
  //       default:
  //         startDate = new Date(0);
  //     }

  //     result = result.filter((s) => new Date(s.submittedAt) >= startDate);

  //     if (filters.dateRange === "custom" && filters.endDate) {
  //       const endDate = new Date(filters.endDate);
  //       endDate.setHours(23, 59, 59, 999);
  //       result = result.filter((s) => new Date(s.submittedAt) <= endDate);
  //     }
  //   }

  //   // Sort
  //   result.sort((a, b) => {
  //     let comparison = 0;
  //     switch (sortBy) {
  //       case "date":
  //         comparison =
  //           new Date(a.submittedAt).getTime() -
  //           new Date(b.submittedAt).getTime();
  //         break;
  //       case "priority":
  //         const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
  //         comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
  //         break;
  //       case "status":
  //         comparison = a.status.localeCompare(b.status);
  //         break;
  //     }
  //     return sortOrder === "desc" ? -comparison : comparison;
  //   });

  //   return result;
  // }, [searchQuery, filters, sortBy, sortOrder]);

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

  const getTypeLabel = (type: string) => {
    return typeOptions.find((t) => t.value === type)?.label || type;
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "all",
      startDate: "",
      endDate: "",
      type: "",
      status: "",
      priority: "",
    });
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters.type ||
    filters.status ||
    filters.priority ||
    filters.dateRange !== "all";

  const start = useMemo(() => {
    if (!submissionsData) return 0;
    return (submissionsData.page - 1) * submissionsData.limit + 1;
  }, [submissionsData]);
  const end = useMemo(() => {
    if (!submissionsData) return 0;
    return Math.min(
      submissionsData.page * submissionsData.limit,
      submissionsData.total,
    );
  }, [submissionsData]);

  const pages = useMemo(() => {
    if (!submissionsData) return [];
    return getPaginationRange(submissionsData.page, submissionsData.totalPages);
  }, [submissionsData]);

  return (
    <>
      <AdminHeader
        title="Submissions"
        subtitle={`${filteredSubmissions.length} submissions found`}
      />

      <div className="p-6">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm mb-6 hidden">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by tracking ID, name, subject, or email..."
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
                    onClick={() => setFilters({ ...filters, dateRange: range })}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      filters.dateRange === range
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
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                    {
                      [filters.type, filters.status, filters.priority].filter(
                        Boolean,
                      ).length
                    }
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Submission Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">All Types</option>
                      {typeOptions.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">All Statuses</option>
                      {statusOptions.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={filters.priority}
                      onChange={(e) =>
                        setFilters({ ...filters, priority: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">All Priorities</option>
                      {priorityOptions.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Custom Date Range
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            startDate: e.target.value,
                            dateRange: "custom",
                          })
                        }
                        className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:border-emerald-500 outline-none"
                      />
                      <span className="text-stone-400">to</span>
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            endDate: e.target.value,
                            dateRange: "custom",
                          })
                        }
                        className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
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

        {/* Submissions Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Table Header Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc");
                }}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-800"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort by:{" "}
                {sortBy === "date"
                  ? "Date"
                  : sortBy === "priority"
                    ? "Priority"
                    : "Status"}
              </button>
            </div>
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Submitter
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={adminRoutes.viewSubmission(
                          submission.trackingNumber,
                        )}
                        className="font-mono text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        {submission.trackingNumber}
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-stone-800">
                          {submission.user?.name ?? "N/A"}
                        </p>
                        <p className="text-xs text-stone-500">
                          {submission.user?.email ?? "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-600">
                        {getTypeLabel(submission.type)}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm text-stone-800 truncate">
                        {submission.title}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getPriorityColor(submission.priority)}`}
                      >
                        {submission.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}
                      >
                        {
                          statusOptions.find(
                            (s) => s.value === submission.status,
                          )?.label
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4 text-nowrap">
                      <div className="text-sm text-stone-500">
                        {dayjs(submission.submittedAt).format("DD MMM YYYY")}
                      </div>
                      <div className="text-xs text-stone-400">
                        {dayjs(submission.submittedAt).format("hh:mm")}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={adminRoutes.viewSubmission(
                          submission.trackingNumber,
                        )}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredSubmissions.length === 0 && (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 font-medium">
                {isLoadingSubmissions
                  ? "Loading submissions..."
                  : "No submissions found"}
              </p>

              {!isLoadingSubmissions && (
                <p className="text-stone-400 text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 bg-stone-50">
            <p className="text-sm text-stone-500">
              Showing {start}–{end} of {submissionsData?.total} submissions
            </p>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 text-sm text-stone-600 hover:bg-white rounded border border-stone-300 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => router.push(`?page=${page - 1}`)}
              >
                Previous
              </button>

              {pages.map((p, i) =>
                p === "dots" ? (
                  <span key={`dots-${i}`} className="px-2 text-stone-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => router.push(`?page=${p}`)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded",
                      p === page
                        ? "text-white bg-emerald-700"
                        : "text-stone-600 hover:bg-white border border-stone-300",
                    )}
                  >
                    {p}
                  </button>
                ),
              )}

              <button
                className="px-3 py-1.5 text-sm text-stone-600 hover:bg-white rounded border border-stone-300"
                disabled={page === submissionsData?.totalPages}
                onClick={() => router.push(`?page=${page + 1}`)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
