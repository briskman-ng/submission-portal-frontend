'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useRequestOtpMutation } from "@/app/api/authApi";
import { useVerifyOtpMutation } from "@/app/api/authApi"; // verify endpoint
import { useCreateSubmissionMutation } from "@/app/api/submissionsApi";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const [email, setEmail] = useState("");
  const [submissionData, setSubmissionData] = useState<any>(null);

  const [requestOtp, { isLoading: isOtpLoading }] = useRequestOtpMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [createSubmission, { isLoading: isSubmitting }] = useCreateSubmissionMutation();

  // Load saved submission data and send OTP automatically
  useEffect(() => {
    const savedData = sessionStorage.getItem("submissionData");
    if (!savedData) {
      router.push("/"); // No data → redirect to form
      return;
    }

    const parsed = JSON.parse(savedData);
    setSubmissionData(parsed);
    setEmail(parsed.email || "");

    // Auto-request OTP
    (async () => {
      try {
        await requestOtp({ email: parsed.email }).unwrap();
        console.log(`OTP sent automatically to ${parsed.email}`);
      } catch (err: any) {
        console.error("Failed to send OTP automatically:", err);
      }
    })();
  }, [router, requestOtp]);

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

  // Verify OTP + submit original form
  const handleVerify = async () => {
    if (!submissionData) return;

    setIsVerifying(true);

    try {
      const enteredOtp = otp.join("");

      // 1️⃣ Verify OTP API call
      const verifyResponse: any = await verifyOtp({ email, otp: enteredOtp }).unwrap();
      const accessToken = verifyResponse.accessToken;

      // 2️⃣ Submit original form data with accessToken
      const payload = new FormData();
      payload.append("type", submissionData.type);
      payload.append("title", submissionData.subject);
      payload.append("description", submissionData.description);
      payload.append(
        "contactInformation",
        JSON.stringify({
          email: submissionData.email,
          phone: submissionData.phone,
        })
      );

      if (submissionData.attachments?.length > 0) {
        payload.append("files", submissionData.attachments[0]);
      }

      await createSubmission(payload).unwrap();

      sessionStorage.removeItem("submissionData");
      router.push("/success");

    } catch (err: any) {
      console.error(err);
      alert(err?.data?.message || "OTP verification or submission failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(59);
    try {
      await requestOtp({ email }).unwrap();
      alert(`OTP sent to ${email}`);
    } catch (err: any) {
      console.error("Failed to resend OTP:", err);
      alert(err?.data?.message || "Failed to send OTP");
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
                Verify Your Email
              </h2>
              <p className="text-emerald-200 text-sm mt-2">
                We&apos;ve sent a 6-digit code to
              </p>
              <p className="text-white font-medium">{email}</p>
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

              <button
                onClick={handleVerify}
                disabled={otp.some((d) => !d) || isVerifying || isSubmitting || isVerifyLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying || isSubmitting || isVerifyLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Verify & Submit
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
                      className="text-emerald-600 font-medium hover:underline"
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
