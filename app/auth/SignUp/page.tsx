"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAEEF1] px-4">
      {/* Card */}
      <div className="w-full max-w-xl rounded-lg bg-[#FDFFFF] px-10 py-5 border-t-4 border-[#28B76F]">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="relative h-12 w-12">
            <Image
              src="/logo.svg"
              alt="NDDC Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-[#38494E]">
            Fill in your details to create a new account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black placeholder-[#4E5A6C] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4E5A6C]">
              User Type
            </label>
            <select
              className="w-full rounded-lg border border-gray-200 bg-[#F9FBFC] px-4 py-3 text-sm text-black outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="">Select user type</option>
              <option value="FREELANCER">FREELANCER</option>
              <option value="CLIENT">CLIENT</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center mt-4 gap-2 rounded-lg bg-[#1F8D56] py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            <Image
              src="/SignInKey-icon.svg"
              alt="Key Icon"
              width={16}
              height={16}
            />
            Sign Up
          </button>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm text-[#4E5A6C]">
            Already have an account?{" "}
            <Link
              href="/auth/SignIn"
              className="font-medium text-[#1F8D56] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
