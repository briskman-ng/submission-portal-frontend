'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Download, FileCheck, FileText } from 'lucide-react';
import NDDCLogo from '@/components/NDDCLogo';

export default function AcknowledgementPage() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download would be triggered here');
  };

  return (
    <section className="pt-20 min-h-screen bg-stone-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
          {/* Document Header */}
          <div className="bg-emerald-800 px-8 py-6 text-white print:bg-emerald-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NDDCLogo size="lg" />
                <div>
                  <h1 className="font-display text-xl font-semibold">Niger Delta Development Commission</h1>
                  <p className="text-emerald-200 text-sm">Official Acknowledgement of Submission</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-200 text-xs">Document ID</p>
                <p className="font-mono font-medium">ACK-2024-00847</p>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-8 space-y-8">
            {/* Acknowledgement Statement */}
            <div className="text-center border-b border-stone-200 pb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-stone-900">Submission Acknowledged</h2>
              <p className="text-stone-600 mt-2">This document serves as official confirmation of your submission to NDDC</p>
            </div>

            {/* Submission Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-stone-800 border-b border-stone-200 pb-2">Submission Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tracking ID:</span>
                    <span className="font-mono font-medium text-emerald-700">NDDC-2024-00847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Submission Type:</span>
                    <span className="font-medium text-stone-800">Project Proposal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date Submitted:</span>
                    <span className="font-medium text-stone-800">January 29, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Time:</span>
                    <span className="font-medium text-stone-800">10:34:22 AM WAT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-stone-800 border-b border-stone-200 pb-2">Submitter Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Email:</span>
                    <span className="font-medium text-stone-800">john.doe@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Verification Status:</span>
                    <span className="font-medium text-emerald-600">Verified ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-sm text-stone-500 mb-1">Subject</p>
              <p className="font-medium text-stone-800">Rural Electrification Project - Bayelsa State</p>
            </div>

            {/* Description */}
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-sm text-stone-500 mb-1">Description</p>
              <p className="text-stone-700 text-sm leading-relaxed">
                Proposal for the implementation of a comprehensive rural electrification project covering 15 communities in Bayelsa State. The project aims to provide sustainable electricity access to approximately 25,000 residents through solar-hybrid mini-grid installations.
              </p>
            </div>

            {/* Attachments */}
            <div>
              <p className="text-sm text-stone-500 mb-2">Attached Documents</p>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg text-sm text-stone-700">
                  <FileText className="w-4 h-4" />
                  Project_Proposal_v1.pdf
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg text-sm text-stone-700">
                  <FileText className="w-4 h-4" />
                  Budget_Estimate.xlsx
                </span>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Please retain this acknowledgement for your records. Use your tracking ID (NDDC-2024-00847) to monitor the status of your submission at connect.nddc.gov.ng
              </p>
            </div>

            {/* Official Stamp Area */}
            <div className="flex items-center justify-between pt-8 border-t border-stone-200">
              <div>
                <p className="text-xs text-stone-400">Generated on</p>
                <p className="text-sm text-stone-600">January 29, 2026 at 10:35 AM</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto opacity-50">
                  <div className="text-center">
                    <p className="text-xs text-emerald-600 font-bold">NDDC</p>
                    <p className="text-[8px] text-emerald-500">RECEIVED</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400">Document Hash</p>
                <p className="font-mono text-xs text-stone-500">a7f3e2...b8c4d1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
