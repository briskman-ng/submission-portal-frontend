'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Activity, 
  Settings, 
  LogOut,
  ChevronLeft,
  Bell
} from 'lucide-react';
import NDDCLogo from '@/components/NDDCLogo';

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed = false, onToggle }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/submissions', icon: FileText, label: 'Submissions' },
    { href: '/admin/users', icon: Users, label: 'Admin Users' },
    { href: '/admin/activity', icon: Activity, label: 'Activity Log' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard' || pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-emerald-950 text-white transition-all duration-300 z-40 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-emerald-900">
        <NDDCLogo size="md" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-display font-semibold text-sm">NDDC</p>
            <p className="text-emerald-400 text-xs">Connect Hub Admin</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald-800 text-white'
                    : 'text-emerald-300 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-emerald-900">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-emerald-300 hover:bg-emerald-900 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
