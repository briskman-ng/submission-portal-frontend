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
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function TrackingContent() {
  const searchParams = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "description">(
    "status",
  );

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      setShowResult(true);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (trackingId) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const timeline = [
    {
      status: "Submitted",
      date: "Jan 29, 2026 • 10:34 AM",
      description: "Submission received and logged into system",
      completed: true,
    },
    {
      status: "Under Review",
      date: "Jan 29, 2026 • 2:15 PM",
      description: "Assigned to Projects Department for initial review",
      completed: true,
      current: true,
    },
    {
      status: "Processing",
      date: "Pending",
      description: "Detailed assessment and verification",
      completed: false,
    },
    {
      status: "Decision",
      date: "Pending",
      description: "Final decision and response preparation",
      completed: false,
    },
    {
      status: "Completed",
      date: "Pending",
      description: "Resolution communicated to submitter",
      completed: false,
    },
  ];

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
                disabled={!trackingId || isSearching}
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

        {/* Results */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-lg font-bold text-emerald-700">
                    {trackingId || "NDDC-2024-00847"}
                  </span>
                  <StatusBadge status="in-review" />
                </div>
                <p className="text-stone-600 text-sm">
                  Rural Electrification Project - Bayelsa State
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/acknowledgement"
                  className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Link>
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
                    {timeline.map((item, i) => (
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
                          {i < timeline.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 mt-2 ${item.completed ? "bg-emerald-300" : "bg-stone-200"}`}
                            />
                          )}
                        </div>
                        <div
                          className={`flex-1 ${item.current ? "bg-emerald-50 -mx-3 px-3 py-2 rounded-lg border border-emerald-100" : ""}`}
                        >
                          <div className="flex items-center justify-between">
                            <p
                              className={`font-medium ${item.completed ? "text-stone-800" : "text-stone-400"}`}
                            >
                              {item.status}
                            </p>
                            <span
                              className={`text-xs ${item.completed ? "text-stone-500" : "text-stone-300"}`}
                            >
                              {item.date}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 ${item.completed ? "text-stone-600" : "text-stone-400"}`}
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
                          Projects Directorate
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500">Expected Response</p>
                        <p className="font-medium text-stone-800">
                          Within 5 business days
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500">Last Updated</p>
                        <p className="font-medium text-stone-800">
                          2 hours ago
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
                  <p className="text-sm text-stone-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                    egestas odio, vitae scelerisque enim ligula venenatis dolor.
                    Maecenas nisl est, ultrices nec congue eget, auctor vitae
                    massa.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {!showResult && (
          <div className="text-center text-stone-500 text-sm">
            <p>
              Can&apos;t find your tracking ID? Check your email confirmation or{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                contact support
              </a>
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
