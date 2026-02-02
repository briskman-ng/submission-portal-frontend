// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   CheckCircle2,
//   Copy,
//   CheckCircle,
//   Download,
//   Eye,
//   ArrowLeft,
//   AlertCircle,
// } from "lucide-react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";

// export default function SuccessPage() {
//   const [copied, setCopied] = useState(false);
//   const [submissionData, setSubmissionData] = useState({
//     type: "Project Proposal",
//     subject: "Rural Electrification Project - Bayelsa State",
//   });

//   const trackingId = "NDDC-2024-00847";
//   const currentDate = new Date().toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
//   const currentTime = new Date().toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   useEffect(() => {
//     const savedData = sessionStorage.getItem("submissionData");
//     if (savedData) {
//       const parsed = JSON.parse(savedData);
//       const typeLabels: Record<string, string> = {
//         proposal: "Project Proposal",
//         report: "Progress Report",
//         request: "Formal Request",
//         complaint: "Complaint/Feedback",
//       };
//       setSubmissionData({
//         type: typeLabels[parsed.type] || "Project Proposal",
//         subject:
//           parsed.subject || "Rural Electrification Project - Bayelsa State",
//       });
//     }
//   }, []);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(trackingId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <>
//       <Navigation />

//       <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
//         <div className="max-w-2xl mx-auto px-6 py-16">
//           <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
//             {/* Success Header */}
//             <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-10 text-center">
//               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <CheckCircle2 className="w-10 h-10 text-emerald-600" />
//               </div>
//               <h2 className="font-display text-2xl font-semibold text-white">
//                 Submission Successful!
//               </h2>
//               <p className="text-emerald-100 mt-2">
//                 Your submission has been received and is being processed
//               </p>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Tracking ID Card */}
//               <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
//                 <p className="text-sm text-emerald-700 font-medium mb-2">
//                   Your Tracking ID
//                 </p>
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="font-display text-2xl font-bold text-emerald-900">
//                     {trackingId}
//                   </span>
//                   <button
//                     onClick={handleCopy}
//                     className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm font-medium"
//                   >
//                     {copied ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : (
//                       <Copy className="w-4 h-4" />
//                     )}
//                     {copied ? "Copied!" : "Copy"}
//                   </button>
//                 </div>
//                 <p className="text-xs text-emerald-600 mt-3">
//                   Save this ID to track your submission status
//                 </p>
//               </div>

//               {/* Submission Details */}
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-stone-800">
//                   Submission Details
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="bg-stone-50 rounded-lg p-3">
//                     <p className="text-stone-500">Type</p>
//                     <p className="font-medium text-stone-800">
//                       {submissionData.type}
//                     </p>
//                   </div>
//                   <div className="bg-stone-50 rounded-lg p-3">
//                     <p className="text-stone-500">Date Submitted</p>
//                     <p className="font-medium text-stone-800">
//                       {currentDate} • {currentTime}
//                     </p>
//                   </div>
//                   <div className="bg-stone-50 rounded-lg p-3 col-span-2">
//                     <p className="text-stone-500">Subject</p>
//                     <p className="font-medium text-stone-800">
//                       {submissionData.subject}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Next Steps */}
//               <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
//                 <div className="flex gap-3">
//                   <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <p className="font-medium text-amber-800">
//                       What happens next?
//                     </p>
//                     <p className="text-sm text-amber-700 mt-1">
//                       Your submission will be reviewed within 48 hours.
//                       You&apos;ll receive email updates on any status changes.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Link
//                   href="/acknowledgement"
//                   className="flex-1 bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Download className="w-4 h-4" />
//                   Download Acknowledgement
//                 </Link>
//                 <Link
//                   href="/auth/SignIn"
//                   className="flex-1 border-2 border-emerald-700 text-emerald-700 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Eye className="w-4 h-4" />
//                   View Dashboard
//                 </Link>
//               </div>

//               {/* Back to Home */}
//               <Link
//                 href="/signin"
//                 className="w-full flex items-center justify-center gap-2 text-stone-500 hover:text-emerald-700 transition-colors text-sm"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Make another submission
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  CheckCircle,
  Download,
  Eye,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useGetSubmissionByTrackingNumberQuery } from "@/app/api/submissionsApi";
import routes from "@/helpers/routes";

export default function SuccessPage() {
  const [copied, setCopied] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  // Get tracking number from sessionStorage
  useEffect(() => {
    const savedTrackingNumber = sessionStorage.getItem(
      "lastSubmissionTrackingId",
    );
    if (savedTrackingNumber) {
      setTrackingNumber(savedTrackingNumber);
    }
  }, []);

  // Fetch the specific submission by tracking number
  const {
    data: submissionData,
    isLoading,
    error,
  } = useGetSubmissionByTrackingNumberQuery(trackingNumber!, {
    skip: !trackingNumber, // Skip if no trackingNumber
  });

  // Format submission type for display
  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      Proposal: "Project Proposal",
      Report: "Progress Report",
      Request: "Formal Request",
      Complaint: "Complaint/Feedback",
    };
    return typeLabels[type] || type;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = () => {
    if (trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Show loading state
  if (isLoading || !trackingNumber) {
    return (
      <>
        <Navigation />
        <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-10 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Submission Successful!
                </h2>
                <p className="text-emerald-100 mt-2">
                  Loading your submission details...
                </p>
              </div>
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
                <p className="text-stone-600 mt-4">
                  Fetching your submission details...
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Navigation />
        <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-10 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <AlertCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Submission Successful!
                </h2>
                <p className="text-emerald-100 mt-2">
                  Your submission has been received
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <p className="text-sm text-emerald-700 font-medium mb-2">
                    Your Tracking ID
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-2xl font-bold text-emerald-900">
                      {trackingNumber}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm font-medium"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-600 mt-3">
                    Save this ID to track your submission status
                  </p>
                </div>
                <div className="text-center text-stone-500">
                  <p>
                    Could not load full details. Please save your tracking ID
                    for reference.
                  </p>
                </div>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 text-stone-500 hover:text-emerald-700 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Make another submission
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const submission = submissionData?.data || submissionData;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Use tracking number from API response if available, otherwise use stored one
  const displayTrackingId =
    submission?.trackingNumber || submission?.trackingId || trackingNumber;

  return (
    <>
      <Navigation />

      <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-10 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-white">
                Submission Successful!
              </h2>
              <p className="text-emerald-100 mt-2">
                Your submission has been received and is being processed
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Tracking ID Card */}
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <p className="text-sm text-emerald-700 font-medium mb-2">
                  Your Tracking ID
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-2xl font-bold text-emerald-900 break-all">
                      {displayTrackingId}
                    </span>
                    {submission?.referenceNumber && (
                      <p className="text-sm text-emerald-600 mt-1">
                        Reference: {submission.referenceNumber}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-emerald-600 mt-3">
                  Save this ID to track your submission status
                </p>
              </div>

              {/* Submission Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-stone-800">
                  Submission Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-500">Type</p>
                    <p className="font-medium text-stone-800">
                      {submission?.type
                        ? getTypeLabel(submission.type)
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-500">Status</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        submission?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : submission?.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {submission?.status
                        ? submission.status.charAt(0).toUpperCase() +
                          submission.status.slice(1)
                        : "Pending"}
                    </span>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3 col-span-2">
                    <p className="text-stone-500">Subject</p>
                    <p className="font-medium text-stone-800">
                      {submission?.title ||
                        submission?.subject ||
                        "No title provided"}
                    </p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-500">Submitted Date</p>
                    <p className="font-medium text-stone-800">
                      {submission?.createdAt
                        ? formatDate(submission.createdAt).split(" at ")[0]
                        : currentDate}
                    </p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-stone-500">Submitted Time</p>
                    <p className="font-medium text-stone-800">
                      {submission?.createdAt
                        ? formatDate(submission.createdAt).split(" at ")[1]
                        : currentTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">
                      What happens next?
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Your submission will be reviewed within 48 hours.
                      You&apos;ll receive email updates on any status changes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* View Full Submission Button */}
                {displayTrackingId && (
                  <Link
                    href={routes.trackSubmission() + `?id=${displayTrackingId}`}
                    className="flex-1 bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Track Submission
                  </Link>
                )}

                {/* Download Acknowledgement Button */}
                {/* <button
                  onClick={() => {
                    // TODO: Implement download acknowledgement functionality
                    alert("Acknowledgement download feature coming soon!");
                  }}
                  className="flex-1 border-2 border-emerald-700 text-emerald-700 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Acknowledgement
                </button> */}
              </div>

              {/* Back to Home */}
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 text-stone-500 hover:text-emerald-700 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Make another submission
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
