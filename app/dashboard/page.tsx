"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Clock, RefreshCw, CheckCircle2, Send } from "lucide-react";
import { Submission } from "@/lib/types";
import SubmissionsTable from "@/components/SubmissionTable";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all",
  );

  const submissions: Submission[] = [
    {
      id: "1",
      trackingId: "NDDC-2024-00847",
      type: "Project Proposal",
      subject: "Rural Electrification Project - Bayelsa State",
      status: "in-review",
      date: "Jan 29, 2026",
      lastUpdate: "2 hours ago",
    },
    {
      id: "2",
      trackingId: "NDDC-2024-00832",
      type: "Progress Report",
      subject: "Q4 2025 Water Supply Project Update",
      status: "completed",
      date: "Jan 15, 2026",
      lastUpdate: "Jan 20, 2026",
    },
    {
      id: "3",
      trackingId: "NDDC-2024-00819",
      type: "Formal Request",
      subject: "Funding Request for Community Health Center",
      status: "pending",
      date: "Jan 8, 2026",
      lastUpdate: "Jan 8, 2026",
    },
    {
      id: "4",
      trackingId: "NDDC-2024-00798",
      type: "Complaint",
      subject: "Road Construction Quality Concerns",
      status: "processed",
      date: "Dec 28, 2025",
      lastUpdate: "Jan 5, 2026",
    },
  ];

  const filteredSubmissions =
    activeTab === "all"
      ? submissions
      : activeTab === "pending"
        ? submissions.filter((s) => ["pending", "in-review"].includes(s.status))
        : submissions.filter((s) =>
            ["completed", "processed"].includes(s.status),
          );

  const stats = [
    {
      label: "Total Submissions",
      value: "4",
      icon: FileText,
      color: "bg-emerald-500",
    },
    { label: "Pending Review", value: "2", icon: Clock, color: "bg-amber-500" },
    { label: "In Progress", value: "1", icon: RefreshCw, color: "bg-blue-500" },
    {
      label: "Completed",
      value: "1",
      icon: CheckCircle2,
      color: "bg-green-500",
    },
  ];

  return (
    <>
      <Navigation />
      <section className="pt-20 min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
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
              href="/"
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
            <SubmissionsTable submissions={filteredSubmissions} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
