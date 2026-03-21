'use client';

import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  FileText,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface AdminDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    musculation: 0,
    box: 0,
    contacts: 0,
  });

  const fetchStats = async () => {
    try {
      const [usersRes, muscuRes, boxRes, contactRes] = await Promise.all([
        fetch('/api/count_users'),
        fetch('/api/count_musculation'),
        fetch('/api/count_box'),
        fetch('/api/count_contact'),
      ]);

      const users = await usersRes.json();
      const muscu = await muscuRes.json();
      const box = await boxRes.json();
      const contacts = await contactRes.json();

      setStats({
        totalUsers: users.count ?? 0,
        musculation: muscu.count ?? 0,
        box: box.count ?? 0,
        contacts: contacts.count ?? 0,
      });
    } catch (error) {
      console.log("Erreur stats :", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    {
      label: 'Total utilisateurs',
      value: stats.totalUsers,
      icon: Users,
    },
    {
      label: 'Musculation',
      value: stats.musculation,
      icon: Activity,
    },
    {
      label: 'Box',
      value: stats.box,
      icon: Activity,
    },
    {
      label: 'Messages contact',
      value: stats.contacts,
      icon: MessageSquare,
    },
  ];

  const quickActions = [
    {
      title: 'Gérer les membres',
      description: 'Voir, ajouter et supprimer des comptes',
      icon: Users,
      href: '/dashboard/Gestion_membres',
    },
    {
      title: 'Gérer les admins',
      description: 'Voir, ajouter et supprimer des comptes',
      icon: Activity,
      href: '/dashboard/gestion_admins',
    },
    {
      title: 'Contact',
      description: 'Exporter les statistiques et données',
      icon: FileText,
      href: '/dashboard/admin_contact',
    },
  ];

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Bonjour, {user.name.split(' ')[0]} 🛡️
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Voici le tableau de bord administratif
        </p>
      </motion.div>

      {/* Stats */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-gray-900" />
                </div>

                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.a
                href={action.href}
                key={action.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer block"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-gray-900" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{action.description}</p>

                <div className="flex items-center text-gray-900 text-sm font-medium mt-4">
                  Ouvrir
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
