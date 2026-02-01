"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Loader2,
  Download,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetSubmissionByTrackingNumberQuery } from "@/app/api/submissionsApi";
import dayjs from "dayjs";

function TrackingContent() {
  const searchParams = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [activeTab, setActiveTab] = useState<"status" | "description">(
    "status",
  );
  const [searchTrigger, setSearchTrigger] = useState(false);

  // Use the query hook with skip option
  const {
    data: submission,
    isLoading: isSearching,
    isError,
    error,
    refetch,
  } = useGetSubmissionByTrackingNumberQuery(trackingId, {
    skip: !trackingId || !searchTrigger,
  });

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setTrackingId(idFromUrl.toUpperCase());
      setSearchTrigger(true);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (trackingId.trim()) {
      setSearchTrigger(true);
      refetch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Format timeline from API data
  const getTimeline = () => {
    if (!submission) return [];

    const timeline = [
      {
        status: "Submitted",
        date: dayjs(submission.createdAt).format("MMM DD, YYYY"),
        description: "Submission received and logged into system",
        completed: true,
      },
      {
        status: "Under Review",
        date: submission.reviewDate
          ? dayjs(submission.reviewDate).format("MMM DD, YYYY")
          : "Pending",
        description: submission.department
          ? `Assigned to ${submission.department} for initial review`
          : "Assigned for initial review",
        completed: !!submission.reviewDate,
        current: submission.status === "under_review",
      },
      {
        status: "Processing",
        date: submission.processingDate
          ? dayjs(submission.processingDate).format("MMM DD, YYYY")
          : "Pending",
        description: "Detailed assessment and verification",
        completed: !!submission.processingDate,
        current: submission.status === "processing",
      },
      {
        status: "Decision",
        date: submission.decisionDate
          ? dayjs(submission.decisionDate).format("MMM DD, YYYY")
          : "Pending",
        description: "Final decision and response preparation",
        completed: !!submission.decisionDate,
        current: submission.status === "decision_pending",
      },
      {
        status: "Completed",
        date: submission.completedDate
          ? dayjs(submission.completedDate).format("MMM DD, YYYY")
          : "Pending",
        description: "Resolution communicated to submitter",
        completed: !!submission.completedDate,
        current: submission.status === "completed",
      },
    ];

    return timeline;
  };

  // Calculate last updated time
  const getLastUpdated = () => {
    if (!submission) return "Unknown";

    const lastUpdated = submission.updatedAt || submission.createdAt;
    const now = new Date();
    const updated = new Date(lastUpdated);
    const diffInHours = Math.floor(
      (now.getTime() - updated.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - updated.getTime()) / (1000 * 60),
      );
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };

  // Get expected response time
  const getExpectedResponse = () => {
    if (!submission) return "Unknown";

    const created = new Date(submission.createdAt);
    const expected = new Date(created);
    expected.setDate(expected.getDate() + (submission.expectedDays || 5));

    const today = new Date();
    const diffInDays = Math.ceil(
      (expected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays <= 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Tomorrow";
    } else {
      return `Within ${diffInDays} days`;
    }
  };

  return (
    <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-6 py-6 text-center">
            <Search className="w-10 h-10 text-white/80 mx-auto mb-3" />
            <h1 className="font-display text-xl font-semibold text-white">
              Track Your Submission
            </h1>
            <p className="text-emerald-200 text-sm mt-1">
              Enter your tracking ID to view the current status
            </p>
          </div>

          <div className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g., NDDC-2024-00847"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-mono text-stone-800 placeholder-stone-400"
              />
              <button
                onClick={handleSearch}
                disabled={!trackingId.trim() || isSearching}
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {isError && searchTrigger && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 animate-fade-in-up">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  Submission Not Found
                </h3>
                <p className="text-red-600 text-sm">
                  {error && "data" in error
                    ? (error.data as any)?.message ||
                      "The tracking ID you entered could not be found."
                    : "The tracking ID you entered could not be found."}
                </p>
                <p className="text-red-500 text-sm mt-2">
                  Please check the tracking ID and try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {submission && !isError && (
          <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1 capitalize">
                  <span className="font-mono text-lg font-bold text-emerald-700">
                    {submission.trackingNumber || trackingId}
                  </span>
                  <StatusBadge status={submission.status || "pending"} />
                </div>
                <p className="text-stone-600 text-sm">
                  {submission.projectTitle ||
                    submission.title ||
                    "Submission Details"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Implement download functionality
                    const link = document.createElement("a");
                    link.href = `/api/submissions/${submission.id}/acknowledgement`;
                    link.download = `acknowledgement-${submission.trackingNumber}.pdf`;
                    link.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors text-sm font-medium"
                  disabled={!submission.id}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => setActiveTab("status")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "status"
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Tracking Status
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "description"
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Description
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "status" && (
                <>
                  {/* Timeline */}
                  <h3 className="font-semibold text-stone-800 mb-6">
                    Submission Timeline
                  </h3>
                  <div className="relative">
                    {getTimeline().map((item, i, array) => (
                      <div key={i} className="flex gap-4 pb-8 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                              item.completed
                                ? item.current
                                  ? "bg-emerald-500 ring-4 ring-emerald-100"
                                  : "bg-emerald-500"
                                : "bg-stone-200"
                            }`}
                          >
                            {item.completed && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          {i < array.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 mt-2 ${
                                item.completed
                                  ? "bg-emerald-300"
                                  : "bg-stone-200"
                              }`}
                            />
                          )}
                        </div>
                        <div
                          className={`flex-1 ${
                            item.current
                              ? "bg-emerald-50 -mx-3 px-3 py-2 rounded-lg border border-emerald-100"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p
                              className={`font-medium ${
                                item.completed
                                  ? "text-stone-800"
                                  : "text-stone-400"
                              }`}
                            >
                              {item.status}
                            </p>
                            <span
                              className={`text-xs ${
                                item.completed
                                  ? "text-stone-500"
                                  : "text-stone-300"
                              }`}
                            >
                              {item.date}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              item.completed
                                ? "text-stone-600"
                                : "text-stone-400"
                            }`}
                          >
                            {item.description}
                          </p>
                          {item.current && (
                            <div className="flex items-center gap-2 mt-2 text-emerald-700 text-sm">
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              Currently at this stage
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="px-6 pb-6">
                    <div className="bg-stone-50 rounded-xl p-4 grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-stone-500">Assigned Department</p>
                        <p className="font-medium text-stone-800">
                          {submission.department || "Not yet assigned"}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500">Expected Response</p>
                        {/* <p className="font-medium text-stone-800">
                          {getExpectedResponse()}
                        </p> */}
                        <p className="font-medium text-stone-800">
                          Within 3 days
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500">Last Updated</p>
                        <p className="font-medium text-stone-800">
                          {getLastUpdated()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "description" && (
                <div>
                  <h3 className="font-semibold text-stone-800 mb-4">
                    Submission Description
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-stone-600 whitespace-pre-line">
                        {submission.description ||
                          submission.projectDescription ||
                          "No description available."}
                      </p>
                    </div>

                    {/* Additional details if available */}
                    {(submission.category ||
                      submission.location ||
                      submission.submitterName) && (
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                        {submission.category && (
                          <div>
                            <p className="text-stone-500 text-sm">Category</p>
                            <p className="font-medium text-stone-800 text-sm">
                              {submission.category}
                            </p>
                          </div>
                        )}
                        {submission.location && (
                          <div>
                            <p className="text-stone-500 text-sm">Location</p>
                            <p className="font-medium text-stone-800 text-sm">
                              {submission.location}
                            </p>
                          </div>
                        )}
                        {submission.submitterName && (
                          <div className="md:col-span-2">
                            <p className="text-stone-500 text-sm">
                              Submitted By
                            </p>
                            <p className="font-medium text-stone-800 text-sm">
                              {submission.submitterName}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!submission && !isError && !isSearching && (
          <div className="text-center text-stone-500 text-sm">
            <p>
              Can't find your tracking ID? Check your email confirmation or{" "}
              <Link
                href="/contact"
                className="text-emerald-600 hover:underline"
              >
                contact support
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrackingPage() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <section className="pt-20 min-h-screen mesh-gradient pattern-overlay flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </section>
        }
      >
        <TrackingContent />
      </Suspense>
      <Footer />
    </>
  );
}
