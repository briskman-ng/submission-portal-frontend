"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthLoader from "@/components/auth-loader/auth-loader.component";
import useGetCurrentUser from "@/react-query/queries/useGetCurrentUser";
import useUserStore from "@/store/user-store";
import { useRouter } from "next/navigation";
import routes from "@/helpers/routes";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useLogOut from "@/hooks/useLogOut";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, updateUser } = useUserStore((state) => state);

  const { data: userData, isLoading } = useGetCurrentUser(!user);

  const logout = useLogOut();

  useEffect(() => {
    if (isLoading) return;

    // Not logged in
    if (!user && !userData) {
      router.push(routes.home() + "?action=login");
      return;
    }

    // Sync store
    if (!user && userData) {
      updateUser(userData.user);
    }
  }, [isLoading, user, userData, updateUser, router]);

  useEffect(() => {
    if (!user) return;

    if (user.userType !== "individual") {
      toast.error("This is an application for individuals");
      logout();
    }
  }, [user, logout]);

  return (
    <>
      {isLoading && !user ? (
        <AuthLoader />
      ) : (
        <>
          <Navigation />

          <section className="pt-20 min-h-screen bg-stone-50">
            <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
}
