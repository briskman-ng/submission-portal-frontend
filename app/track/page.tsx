"use client";

import { useState, useEffect, Suspense, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
import useUserStore from "@/store/user-store";
import Modal from "@/components/modal/modal.component";
import SignInComponent from "@/components/auth/sign-in/sign-in.component";
import useCreateModalProps from "@/hooks/useCreateModalProps";
import useGetSubmissionByTrackingNumber from "@/react-query/queries/useGetSubmissionByTrackingNumber";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/react-query/queryKeys";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const TIMELINE_DESC_MAP: Record<string, string> = {
  Submitted: "Submission received and logged into system",
  "Under Review": "Assigned for initial review",
  Processing: "Detailed assessment and verification",
  Decision: "Final decision and response preparation",
  Completed: "Resolution communicated to submitter",
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const autoFetchedRef = useRef(false);

  const [trackingId, setTrackingId] = useState(searchParams.get("id") ?? "");
  const [activeTab, setActiveTab] = useState<"status" | "description">(
    "status",
  );

  const urlTrackingId = useMemo(() => searchParams.get("id"), [searchParams]);

  const queryClient = useQueryClient();

  const user = useUserStore((state) => state.user);

  const signInModalProps = useCreateModalProps();

  const {
    mutate: getSubmissionByTrackingNumber,
    isPending: isLoadingSubmission,
    data: submission,
    isError,
    error,
  } = useGetSubmissionByTrackingNumber();

  useEffect(() => {
    if (!urlTrackingId) return;
    if (autoFetchedRef.current) return;

    autoFetchedRef.current = true;
    getSubmissionByTrackingNumber(urlTrackingId);
    router.replace(pathname);
  }, [urlTrackingId, getSubmissionByTrackingNumber, router, pathname]);

  useEffect(() => {
    autoFetchedRef.current = false;
  }, [urlTrackingId]);

  const handleSearch = () => {
    if (trackingId.trim()) {
      if (user) {
        getSubmissionByTrackingNumber(trackingId);
      } else {
        signInModalProps.open();
      }
    }
  };
  const handleSearchAfterLogin = () => {
    if (trackingId.trim()) {
      getSubmissionByTrackingNumber(trackingId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const visibleStages = useMemo(() => {
    const stages = submission?.timeline ?? [];

    return stages?.filter((stage, index) => {
      if (stage.status === "completed") return true;

      // check if any later stage is completed
      const hasCompletedAfter = stages
        .slice(index + 1)
        .some((s) => s.status === "completed" || s.status === "active");

      return !hasCompletedAfter;
    });
  }, [submission]);

  return (
    <>
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
                  disabled={!trackingId.trim() || isLoadingSubmission}
                  className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingSubmission ? (
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
          {isError && trackingId && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">
                    Submission Not Found
                  </h3>
                  <p className="text-red-600 text-sm">
                    {error && "data" in error
                      ? (error.data as AxiosError<{ message: string }>)
                          ?.message ||
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
                    {submission.title || "Submission Details"}
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
                      {visibleStages?.map((item, i, array) => (
                        <div key={i} className="flex gap-4 pb-8 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                                item.status === "completed"
                                  ? "bg-emerald-500 ring-4 ring-emerald-100"
                                  : "bg-stone-200"
                              }`}
                            >
                              {item.status === "completed" && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>

                            {i < array.length - 1 && (
                              <div
                                className={`w-0.5 flex-1 mt-2 ${
                                  item.status === "completed"
                                    ? "bg-emerald-300"
                                    : "bg-stone-200"
                                }`}
                              />
                            )}
                          </div>
                          <div
                            className={`flex-1 ${
                              item.status === "active"
                                ? "bg-emerald-50 -mx-3 px-3 py-2 rounded-lg border border-emerald-100"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <p
                                className={`font-medium ${
                                  item.status === "completed"
                                    ? "text-stone-800"
                                    : "text-stone-400"
                                }`}
                              >
                                {item.name}
                              </p>

                              <span
                                className={`capitalize text-xs ${
                                  item.status === "completed"
                                    ? "text-stone-500"
                                    : "text-stone-300"
                                }`}
                              >
                                {item.completedAt ? (
                                  dayjs(item.completedAt).format(
                                    "HH:mmA MMM DD, YYYY",
                                  )
                                ) : (
                                  <StatusBadge status={item.status} />
                                )}
                              </span>
                            </div>

                            <p
                              className={`text-sm mt-1 ${
                                item.status === "completed"
                                  ? "text-stone-600"
                                  : "text-stone-400"
                              }`}
                            >
                              {TIMELINE_DESC_MAP[item.name] ?? ""}
                            </p>

                            {item.status === "active" && (
                              <div className="flex items-center gap-2 mt-2 text-emerald-700 text-sm">
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                Currently at this stage
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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
                            "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!submission && !isError && !isLoadingSubmission && (
            <div className="text-center text-stone-500 text-sm">
              <p>
                Can&apos;t find your tracking ID? Check your email confirmation
                or{" "}
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

      {/* Modals */}
      <Modal
        title="Sign In"
        description="Sign in to your account to track a submission"
        {...signInModalProps}
      >
        <SignInComponent
          onSuccess={() => {
            queryClient.refetchQueries({
              queryKey: [queryKeys.GET_CURRENT_USER],
            });
            signInModalProps.close();
            handleSearchAfterLogin();
          }}
        />
      </Modal>
    </>
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
