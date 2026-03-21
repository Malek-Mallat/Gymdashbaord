'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

interface UserType {
  _id: string;
  name: string;
  email: string;
  gender: string;
  dob: string;
  phone: string;
  trainingType: string;
  role: string;
  password?: string;
  createdAt: string;
}

export default function AdminsPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    phone: '',
    trainingType: '',
    role: 'admin',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/get_admins', { cache: 'no-store' });
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addAdmin = async () => {
    try {
      const res = await fetch('/api/add_admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      setShowAddForm(false);
      setForm({
        name: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        phone: '',
        trainingType: '',
        role: 'admin',
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      const res = await fetch('/api/delete_membre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditForm = (user: UserType) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      gender: user.gender,
      dob: user.dob.split('T')[0],
      phone: user.phone,
      trainingType: user.trainingType,
      role: user.role,
    });
    setShowEditForm(true);
  };

  const updateAdmin = async () => {
    if (!editingUser) return;

    try {
      const query = new URLSearchParams({ params: editingUser._id }).toString();
      const res = await fetch(`/api/put_admin?${query}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
        return;
      }

      setShowEditForm(false);
      setEditingUser(null);
      setForm({
        name: '',
        email: '',
        password: '',
        gender: '',
        dob: '',
        phone: '',
        trainingType: '',
        role: 'admin',
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 text-black">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-800">Liste des admins</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Ajouter Admin
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-left text-gray-700">
              <th className="py-3 px-4 font-medium">Nom</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Password</th>
    
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{u.name}</td>
                <td className="py-3 px-4">{u.email}</td>
                <td className="py-3 px-4">{u.password}</td>
        

                <td className="py-3 px-4 flex gap-3">
                  <button
                    onClick={() => openEditForm(u)}
                    className="p-2 rounded-md border border-gray-400 hover:bg-gray-200 transition"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="p-2 rounded-md border border-red-400 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD FORM */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un admin</h2>

            <input name="name" placeholder="Nom" value={form.name} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button>
              <button onClick={addAdmin} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Ajouter</button>
            </div>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Modifier un admin</h2>

            <input name="name" placeholder="Nom" value={form.name} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="password" type="password" placeholder="Nouveau mot de passe" value={form.password} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="gender" placeholder="Genre" value={form.gender} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="dob" type="date" placeholder="Date de naissance" value={form.dob} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3" />
            <select name="trainingType" value={form.trainingType} onChange={handleInput} className="border p-2 w-full rounded-lg mb-3">
              <option value="">Sélectionner le type d'entraînement</option>
              <option value="musculation">Musculation</option>
              <option value="box">Box</option>
              <option value="cardio">Cardio</option>
              <option value="danse">Danse</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowEditForm(false)} className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button>
              <button onClick={updateAdmin} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Modifier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
