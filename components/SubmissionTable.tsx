"use client";

import Link from "next/link";
import { Eye, Download, FileText } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Submissions } from "@/types/submissions.type";
import dayjs from "dayjs";

interface SubmissionsTableProps {
  submissions: Submissions[];
  isLoading?: boolean;
}

export default function SubmissionsTable({
  submissions,
  isLoading,
}: SubmissionsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Tracking ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Document
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-stone-50 transition-colors"
              >
                <td className="px-6 py-4 max-w-[120px] truncate">
                  <span className="font-mono text-sm font-medium text-emerald-700">
                    {submission.trackingNumber}
                  </span>
                </td>

                <td className="px-6 py-4 max-w-[250px] truncate">
                  <p className="text-sm text-stone-800 font-medium">
                    {submission.title}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-stone-600">
                    {submission.type}
                  </span>
                </td>

                <td className="px-6 py-4 capitalize">
                  <StatusBadge status={submission.status} />
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-stone-500">
                    {dayjs(submission.submittedAt).format("MMM DD, YYYY")}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors">
                    Preview
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/track?id=${submission.trackingNumber}`}
                      className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/acknowledgement"
                      className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {submissions.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">
              {isLoading ? "Loading submissions..." : "No submissions found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
