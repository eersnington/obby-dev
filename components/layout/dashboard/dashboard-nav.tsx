'use client';

import Link from 'next/link';
import {
  ArrowRight,
  User,
  Settings,
  LayoutDashboard,
  Archive,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: User,
    label: 'Users',
  },
  {
    title: 'Audit Logs',
    href: '/dashboard/audit-logs',
    icon: Archive,
    label: 'Audit Logs',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="w-[300px]">
      <div className="flex flex-1 flex-col items-stretch gap-1 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon ?? ArrowRight;
          const isSelected = pathname === item.href;
          return (
            item.href && (
              <div className="flex flex-col gap-1 p-1" key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      isSelected
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </div>
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
