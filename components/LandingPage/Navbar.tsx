import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="NDDC Portal Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-bold text-[#0E1B18]">NDDC Portal</span>
        </div>

        {/* Nav links */}
        <div className="hidden items-center gap-8 font-medium md:flex">
          <a className="text-sm text-[#0E1B18] hover:text-gray-900">About</a>
          <a className="text-sm text-[#0E1B18] hover:text-gray-900">
            Guidelines
          </a>
          <a className="text-sm text-[#0E1B18] hover:text-gray-900">Support</a>

          <Link
            href="/auth/SignIn"
            className="w-30 h-10 flex items-center justify-center rounded-lg bg-[#2DCC7C] text-sm font-medium text-white hover:bg-green-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
