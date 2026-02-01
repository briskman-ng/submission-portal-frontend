"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import useAdminUserStore from "@/store/admin/admin-user-store";
import useLogOut from "@/hooks/useLogOut";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const user = useAdminUserStore((state) => state.user);

  const name = useMemo(() => {
    const [firstName, lastName] = user?.adminUser.name.split(" ") ?? [];

    return { firstName, lastName };
  }, [user]);

  const logout = useLogOut();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "New submission received - NDDC-2024-00848",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      message: "Submission NDDC-2024-00845 marked as urgent",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Monthly report ready for review",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div>
          <h1 className="font-display text-2xl font-semibold text-stone-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-stone-500 text-sm mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              className="pl-10 pr-4 py-2 w-64 bg-stone-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-800">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-stone-50 cursor-pointer border-b border-stone-50 ${
                        notif.unread ? "bg-emerald-50/50" : ""
                      }`}
                    >
                      <p className="text-sm text-stone-700">{notif.message}</p>
                      <p className="text-xs text-stone-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-stone-100">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {name?.firstName?.[0]}
                  {name?.lastName?.[0]}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-stone-800">
                  {user?.adminUser.name}
                </p>
                <p className="text-xs text-stone-500 capitalize">
                  {user?.adminUser.role.replaceAll("_", " ")}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-stone-100">
                  <p className="font-medium text-stone-800">
                    {user?.adminUser.name}
                  </p>
                  <p className="text-sm text-stone-500">
                    {user?.adminUser.email}
                  </p>
                </div>
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-stone-100 py-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
