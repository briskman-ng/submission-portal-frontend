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

  const handleRedirect = () => {
    return router.push(routes.home() + "?action=login");
  };

  useEffect(() => {
    if (userData && !user) updateUser(userData);
  }, [userData, user, updateUser]);

  if (isLoading && !user) {
    return <AuthLoader />;
  }

  if (!isLoading && !user && !userData) {
    handleRedirect();

    return <></>;
  }

  if (user && user?.user?.userType !== "individual") {
    toast.error("This is an application for players");
    logout();
    return <></>;
  }

  return (
    <>
      <Navigation />

      <section className="pt-20 min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
      </section>

      <Footer />
    </>
  );
}
