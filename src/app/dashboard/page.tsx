import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import UserDashboard from '@/components/dashboard/UserDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user.role === 'admin';

  return (
    <div>
      {isAdmin ? (
        <AdminDashboard user={session.user} />
      ) : (
        <UserDashboard user={session.user} />
      )}
    </div>
  );
}