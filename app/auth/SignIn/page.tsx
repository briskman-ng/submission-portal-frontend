'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally validate credentials or call API
    // For now, we just redirect to /dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAEEF1] px-4">
      <div className="w-full max-w-md rounded-lg bg-[#FDFFFF] p-10 border-t-4 border-[#28B76F]">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-12 w-12">
            <Image src="/logo.svg" alt="NDDC Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-[#38494E]">
            Enter email address and password to sign in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter temporary key"
                className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 pr-12 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 flex items-center justify-center text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F8D56] py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            <Image src="/SignInKey-icon.svg" alt="Key Icon" width={16} height={16} />
            Sign in
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-[#4E5A6C]">
            Don't have an account?{" "}
            <Link
              href="/auth/SignUp"
              className="font-medium text-[#1F8D56] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
