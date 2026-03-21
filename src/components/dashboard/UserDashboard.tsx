'use client';

import { motion } from 'framer-motion';
import {
  Dumbbell,
  Clock,
  TrendingUp,
  Zap,
  BarChart3,
  ArrowRight,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const stats = [
    {
      label: 'Séances effectuées',
      value: '24',
      icon: Dumbbell,
      color: 'bg-gray-100',
      iconColor: 'text-gray-900',
      change: '+4 cette semaine',
    },
    {
      label: 'Calories brûlées',
      value: '3.450 kcal',
      icon: Zap,
      color: 'bg-gray-100',
      iconColor: 'text-gray-900',
      change: '+780 kcal cette semaine',
    },
    {
      label: 'Temps d’entraînement',
      value: '12.4h',
      icon: Clock,
      color: 'bg-gray-100',
      iconColor: 'text-gray-900',
      change: 'Ce mois-ci',
    },
    {
      label: 'Progression physique',
      value: '82%',
      icon: TrendingUp,
      color: 'bg-gray-100',
      iconColor: 'text-gray-900',
      change: '+6% vs mois dernier',
    },
  ];

  const quickActions = [
    {
      title: 'Plan nutrition',
      description: 'Consulter votre plan de nutrition',
      icon: Dumbbell,
      href: '/dashboard/coaches',
      color: 'bg-gray-50',
      iconColor: 'text-gray-900',
    },
    {
      title: 'Plan Entrainement',
      description: 'Consulter votre plan entrainement  ',
      icon: BarChart3,
      href: '/dashboard/plan_entrenement',
      color: 'bg-gray-50',
      iconColor: 'text-gray-900',
    },
    {
      title: 'Contact',
      description: 'passer votre réclamation ',
      icon: CalendarDays,
      href: '/dashboard/contact',
      color: 'bg-gray-50',
      iconColor: 'text-gray-900',
    },
  ];

  return (
    <div className="space-y-10 pt-4">

      {/* Welcome Section */}
      <div className="text-center mt-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          Bienvenue, {user.name.split(' ')[0]} 💪
        </motion.h1>

        <p className="text-gray-600 mt-3 text-lg">
          Prêt à repousser vos limites aujourd’hui ?
        </p>
      </div>

      {/* Motivation Videos */}
    {/* Motivation Videos */}
<div>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Vidéos de Motivation</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* VIDEO 1 */}
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative w-full h-84">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/2tM1LFFxeKg?autoplay=1&mute=1&loop=1&playlist=2tM1LFFxeKg"
          title="Motivation Musculation"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4 text-center font-semibold text-gray-800">
        Reste motivé — chaque séance compte 💪
      </div>
    </div>

    {/* VIDEO 2 */}
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative w-full h-84">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/ml6cT4AZdqI?autoplay=1&mute=1&loop=1&playlist=ml6cT4AZdqI"
          title="Motivation Cardio"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4 text-center font-semibold text-gray-800">
        Donne le meilleur de toi-même — tu progresses 🔥
      </div>
    </div>

  </div>
</div>


      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${action.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>

                  <div className="flex items-center text-gray-900 text-sm font-medium mt-4">
                    Ouvrir
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
