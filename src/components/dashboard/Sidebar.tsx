'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  TrendingUp,
  Users,
  Settings,
  Shield,
  Bot,
  User,
} from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const userNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Plan entrainement', href: '/dashboard/plan_entrenement', icon: TrendingUp },
    { name: 'Plan nutrition  ', href: '/dashboard/coaches', icon: User },
    { name: 'Contact', href: '/dashboard/contact', icon: FileText },
   
  ];

  const adminNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Gestion Membre', href: '/dashboard/Gestion_membres', icon: Users },
    { name: 'Gestion Admins', href: '/dashboard/gestion_admins', icon: Users },
    { name: 'Contact', href: '/dashboard/admin_contact', icon: FileText },
  ];

  const navigation = user.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
        
          <div>
            <h1 className="text-xl font-black text-black">FITNESS PRO</h1>
            {user.role === 'admin' && (
              <div className="flex items-center gap-1 text-xs text-purple-600">
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}