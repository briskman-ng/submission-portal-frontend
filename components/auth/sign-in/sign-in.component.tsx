import routes from "@/helpers/routes";
import useRequestOTP from "@/react-query/mutations/useRequestOTP";
import useVerifyOTP from "@/react-query/mutations/useVerifyOTP";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface IProps {
  defaultValues?: { email: string; name: string; onSuccess: () => void };
}

export default function SignInComponent({ defaultValues }: IProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<"email" | "otp">("email"); // 'email' or 'otp'
  const [email, setEmail] = useState(defaultValues?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { mutate: requestOTP, isPending: isRequestingOTP } = useRequestOTP(() =>
    setTimeout(() => {
      setStep("otp");
    }, 100),
  );
  const { mutate: verifyOTP, isPending: isVerifyingOTP } = useVerifyOTP(() => {
    if (defaultValues) {
      setTimeout(() => {
        defaultValues?.onSuccess();
      }, 500);
    } else {
      setTimeout(() => {
        router.push(routes.dashboard());
      }, 100);
    }
  });

  const loading = useMemo(() => {
    return isRequestingOTP || isVerifyingOTP;
  }, [isRequestingOTP, isVerifyingOTP]);

  const handleEmailSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setError("");

    requestOTP({ email, name: defaultValues?.name });
  };

  const handleOTPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    verifyOTP({ email, otp });
  };

  const handleResendOTP = () => {
    setError("");
    requestOTP({ email });
  };

  const handleBack = () => {
    setStep("email");
    setOtp("");
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Email Step */}
      {step === "email" && (
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              disabled={!!defaultValues}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </form>
      )}

      {/* OTP Step */}
      {step === "otp" && (
        <form onSubmit={handleOTPSubmit}>
          <div className="mb-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium mb-4"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Change email
            </button>
          </div>

          <div className="mb-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">OTP sent to:</p>
            <p className="text-sm font-medium text-gray-800">{email}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              One-Time Password
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit OTP"
              required
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition text-center text-2xl tracking-widest font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="text-teal-600 hover:text-teal-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
