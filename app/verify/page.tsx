'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useVerifyOtpMutation, useRequestOtpMutation } from "@/app/api/authApi";
import { useCreateSubmissionMutation } from "@/app/api/submissionsApi";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submissionData, setSubmissionData] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  // API mutations
  const [verifyOtp] = useVerifyOtpMutation();
  const [requestOtp, { isLoading: isOtpLoading }] = useRequestOtpMutation();
  const [createSubmission] = useCreateSubmissionMutation();

  // Load saved submission data AND files
  useEffect(() => {
    const savedData = sessionStorage.getItem("submissionData");
    if (!savedData) {
      router.push("/"); 
      return;
    }

    const parsed = JSON.parse(savedData);
    setSubmissionData(parsed);
    setEmail(parsed.email || "");
    setName(parsed.name || "");
    
    // Load files from sessionStorage if they exist
    const savedFiles = sessionStorage.getItem("submissionFiles");
    if (savedFiles) {
      try {
        const fileData = JSON.parse(savedFiles);
        // Convert base64 strings back to File objects
        const loadedFiles = fileData.map((fileObj: any) => {
          const byteCharacters = atob(fileObj.base64.split(',')[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: fileObj.type });
          return new File([blob], fileObj.name, { type: fileObj.type });
        });
        setFiles(loadedFiles);
      } catch (error) {
        console.error("Error loading files from sessionStorage:", error);
      }
    }
  }, [router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Single button handles both OTP verification AND form submission
  const handleVerifyAndSubmit = async () => {
    if (!submissionData) return;

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const enteredOtp = otp.join("");
      
      if (!enteredOtp || enteredOtp.length !== 6) {
        setStatusMessage(" Please enter a valid 6-digit OTP");
        setIsProcessing(false);
        return;
      }

      // STEP 1: Verify OTP
      const verifyResponse = await verifyOtp({ 
        email: email, 
        otp: enteredOtp 
      }).unwrap();
      
      setStatusMessage('OTP verified! Now submitting form...');

      // Save token to sessionStorage
      sessionStorage.setItem("authToken", verifyResponse.accessToken);

      // STEP 2: Prepare form data
      const typeMapping: Record<string, string> = {
        'proposal': 'Proposal',
        'request': 'Request', 
        'report': 'Report',
        'complaint': 'Complaint'
      };
      
      const apiType = typeMapping[submissionData.type] || 'Request';

      // Create FormData for submission (especially important for files)
      const formData = new FormData();
      
      // Add JSON data as a field
      const jsonPayload = {
        type: apiType,
        title: submissionData.subject,
        description: submissionData.description,
        contactInformation: {
          email: submissionData.email,
          phone: submissionData.phone,
          name: submissionData.name
        }
      };
      
      formData.append('data', JSON.stringify(jsonPayload));
      
      // Add files if they exist
      if (files.length > 0) {
        files.forEach((file, index) => {
          formData.append('files', file);
        });
      }

      // STEP 3: Submit form data with FormData (not JSON)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/submissions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${verifyResponse.accessToken}`,
          // DON'T set Content-Type header for FormData - let browser set it with boundary
        },
        body: formData
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map((err: any) => 
            `${err.field || 'unknown'}: ${err.message}`
          ).join(', ');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(result.message || 'Failed to submit form');
      }
      
      setStatusMessage('OTP verified and form submitted successfully!');

      let trackingId = null;
      
      // Check for trackingNumber (from email example: NDDC-20260130-5249)
      if (result.data?.trackingNumber) {
        trackingId = result.data.trackingNumber;
      } else if (result.trackingNumber) {
        trackingId = result.trackingNumber;
      } 
      // Check for trackingId (alternative field name)
      else if (result.data?.trackingId) {
        trackingId = result.data.trackingId;
      } else if (result.trackingId) {
        trackingId = result.trackingId;
      }
      // Check for referenceNumber (another possible field)
      else if (result.data?.referenceNumber) {
        trackingId = result.data.referenceNumber;
      } else if (result.referenceNumber) {
        trackingId = result.referenceNumber;
      }
      // Fallback to database ID
      else if (result.data?.id) {
        trackingId = result.data.id;
      } else if (result.id) {
        trackingId = result.id;
      }
      
      // Save the tracking ID to sessionStorage
      if (trackingId) {
        sessionStorage.setItem("lastSubmissionTrackingId", trackingId);
        console.log('Saved tracking ID for success page:', trackingId);
      } else {
        console.warn('No tracking ID found in API response:', result);
      }

      // Clear session storage (but keep authToken and tracking ID)
      sessionStorage.removeItem("submissionData");
      sessionStorage.removeItem("submissionFiles");
      
      // Redirect to success page after 1.5 seconds
      setTimeout(() => {
        router.push("/success");
      }, 1500);

    } catch (err: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      if (err?.message) {
        errorMessage = err.message;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      }
      
      setStatusMessage(` ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(59);
    setStatusMessage(null);
    
    try {
      // Use direct fetch since API requires name field
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send OTP');
      }
      
      setStatusMessage(` OTP resent to ${email}`);
    } catch (err: any) {
      setStatusMessage(`Failed to resend OTP`);
    }
  };

  return (
    <>
      <Navigation />
      <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
        <div className="max-w-md mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-6 py-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display text-xl font-semibold text-white">
                Verify & Submit
              </h2>
              <p className="text-emerald-200 text-sm mt-2">
                Enter OTP to verify and submit your form
              </p>
              <p className="text-white font-medium">{email}</p>
              {files.length > 0 && (
                <p className="text-emerald-100 text-xs mt-1">
                  {files.length} file(s) attached
                </p>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-3 text-center">
                  Enter Verification Code
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Status Message Display */}
              {statusMessage && (
                <div className={`p-3 rounded-lg text-center text-sm font-medium ${
                  statusMessage.includes('OTP verified') 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {statusMessage}
                </div>
              )}

              {/* File preview if files exist */}
              {files.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Files to be submitted:
                  </p>
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li key={index} className="text-xs text-gray-600 truncate">
                        📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Single button for both verify and submit */}
              <button
                onClick={handleVerifyAndSubmit}
                disabled={otp.some((d) => !d) || isProcessing}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying & Submitting...
                  </>
                ) : (
                  <>
                    Verify OTP & Submit Form
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-stone-500">
                  Didn&apos;t receive the code?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-stone-400">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={isOtpLoading}
                      className="text-emerald-600 font-medium hover:underline disabled:text-stone-400"
                    >
                      {isOtpLoading ? "Sending..." : "Resend Code"}
                    </button>
                  )}
                </p>
              </div>

              <button
                onClick={() => router.push("/")}
                className="w-full flex items-center justify-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to submission form
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}