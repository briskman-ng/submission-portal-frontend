'use client';

import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-semibold">Submission Portal</h1>
        <p className="text-xs text-gray-500">
          Submit and request proposal to the commission
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Image
            src="/icons/bell.svg"
            alt="Notifications"
            width={18}
            height={18}
          />
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">Daniel Wealth</p>
            <p className="text-xs text-gray-500">Individual</p>
          </div>
        </div>
      </div>
    </header>
  );
}
