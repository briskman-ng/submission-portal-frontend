"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { X, Menu } from "lucide-react";
import NDDCLogo from "./NDDCLogo";
import useGetCurrentUser from "@/react-query/queries/useGetCurrentUser";
import useUserStore from "@/store/user-store";
import Modal from "./modal/modal.component";
import useCreateModalProps from "@/hooks/useCreateModalProps";
import SignInComponent from "./auth/sign-in/sign-in.component";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const action = searchParams.get("action");

  const { updateUser, user } = useUserStore();

  const { data: currentUser } = useGetCurrentUser(!user);

  const isLoggedIn = useMemo(() => {
    return !!user;
  }, [user]);

  console.log(currentUser);

  useEffect(() => {
    if (currentUser && !user) updateUser(currentUser);
  }, [currentUser]);

  const loginModalProps = useCreateModalProps();

  useEffect(() => {
    if (action && action === "login") {
      loginModalProps?.open();
      router.push(pathname);
    }
  }, [action, loginModalProps?.open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <NDDCLogo />
            <div>
              <span className="font-display font-semibold text-emerald-900 text-lg">
                NDDC
              </span>
              <span className="text-stone-400 text-sm ml-2">Connect Hub</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link
              href="/"
              className={`hover:text-emerald-700 transition-colors ${pathname === "/" ? "text-emerald-700" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/#process"
              className="hover:text-emerald-700 transition-colors"
            >
              Process
            </Link>
            <Link
              href="/#footer"
              className="hover:text-emerald-700 transition-colors"
            >
              Support
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                My Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={loginModalProps.open}
                  className="border border-emerald-700 text-emerald-700 px-5 py-2.5 rounded-lg hover:border-transparent hover:bg-emerald-700 hover:text-white transition-colors"
                >
                  Login
                </button>

                <Link
                  href="/track"
                  className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Track Submission
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
            >
              Home
            </Link>

            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
            >
              Track Submission
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={loginModalProps.open}
                className="block w-full text-left py-2 text-stone-700 hover:text-emerald-700"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      <Modal
        title="Welcome back"
        description="Sign in to your NDDC Connect Hub account"
        {...loginModalProps}
      >
        <SignInComponent />
      </Modal>
    </>
  );
};

export default Navigation;
