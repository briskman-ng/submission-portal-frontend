'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const [email, setEmail] = useState('your@email.com');

  useEffect(() => {
    // Get email from session storage
    const savedData = sessionStorage.getItem('submissionData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setEmail(parsed.email || 'your@email.com');
    }
  }, []);

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
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      router.push('/success');
    }, 2000);
  };

  const handleResend = () => {
    setResendTimer(59);
    // Trigger resend API
  };

  return (
    <section className="pt-20 min-h-screen mesh-gradient pattern-overlay">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-xl font-semibold text-white">Verify Your Email</h2>
            <p className="text-emerald-200 text-sm mt-2">We&apos;ve sent a 6-digit code to</p>
            <p className="text-white font-medium">{email}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* OTP Input */}
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

            {/* Verify Button */}
            <button 
              onClick={handleVerify}
              disabled={otp.some(d => !d) || isVerifying}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend */}
            <div className="text-center">
              <p className="text-sm text-stone-500">
                Didn&apos;t receive the code?{' '}
                {resendTimer > 0 ? (
                  <span className="text-stone-400">Resend in {resendTimer}s</span>
                ) : (
                  <button 
                    onClick={handleResend}
                    className="text-emerald-600 font-medium hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>

            {/* Back Button */}
            <button 
              onClick={() => router.push('/')}
              className="w-full flex items-center justify-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to submission form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
