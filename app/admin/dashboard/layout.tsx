"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AuthLoader from "@/components/auth-loader/auth-loader.component";
import adminRoutes from "@/helpers/admin/routes";
import useLogOut from "@/hooks/useLogOut";
import useGetCurrentUser from "@/react-query/admin/queries/useGetCurrentUser";
import useAdminUserStore from "@/store/admin/admin-user-store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const router = useRouter();
  const { user, updateUser } = useAdminUserStore((state) => state);

  const { data: userData, isLoading } = useGetCurrentUser(!user);

  const logout = useLogOut();

  useEffect(() => {
    if (isLoading) return;

    // Not logged in
    if (!user && !userData) {
      router.push(adminRoutes.signIn());
      return;
    }

    // Sync store
    if (!user && userData) {
      updateUser(userData);
    }
  }, [isLoading, user, userData, updateUser, router]);

  if (!user?.adminUser) {
    toast.error("Access denied");
    logout();

    return <></>;
  }

  return (
    <>
      {isLoading && !user ? (
        <AuthLoader />
      ) : (
        <>
          <div className="min-h-screen bg-stone-100">
            <AdminSidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div
              className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"}`}
            >
              <div className="min-h-screen">
                {/* <AdminHeader
              title="Dashboard"
              subtitle="Overview of submissions and activity"
            /> */}

                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
