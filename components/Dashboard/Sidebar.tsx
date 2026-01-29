'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: '/DashboardIcon.svg',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: '/SettingsIcon.svg',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-green-900 text-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 font-semibold text-lg border-b border-green-800">
        Submission Portal
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
                ${
                  isActive
                    ? 'bg-green-700'
                    : 'hover:bg-green-800 text-green-100'
                }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={18}
                height={18}
                className="shrink-0"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
