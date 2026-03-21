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
  password: string;
  trainingType: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    gender: 'homme',
    trainingType: 'musculation',
    phone: '',
    email: '',
    password: '',
    dob: '', // <-- nouveau champ
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/get_users', { cache: 'no-store' });
      if (!res.ok) throw new Error('Erreur lors du chargement des utilisateurs');
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

  const deleteUser = async (_id: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    try {
      const res = await fetch('/api/delete_membre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: _id }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error);
      setUsers((prev) => prev.filter((u) => u._id !== _id));
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Erreur serveur lors de la suppression');
    }
  };

  const addUser = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error);

      setShowAddForm(false);
      setForm({
        name: '',
        gender: 'homme',
        trainingType: 'musculation',
        phone: '',
        email: '',
        password: '',
        dob: '',
      });

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (user: UserType) => {
    setEditUserId(user._id);
    setForm({
      name: user.name,
      gender: user.gender,
      trainingType: user.trainingType,
      phone: user.phone,
      email: user.email,
      password: '',
      dob: user.dob.split('T')[0], // format yyyy-mm-dd pour input date
    });
    setShowEditForm(true);
  };

  const updateUser = async () => {
    if (!editUserId) return;

    try {
      const res = await fetch(`/api/put_users?params=${editUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      setShowEditForm(false);
      setEditUserId(null);
      setForm({
        name: '',
        gender: 'homme',
        trainingType: 'musculation',
        phone: '',
        email: '',
        password: '',
        dob: '',
      });

      fetchUsers();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Erreur serveur lors de la mise à jour');
    }
  };

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 text-black bg-white">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Liste des utilisateurs</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition rounded"
        >
          Ajouter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="border-b border-gray-300 bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Nom</th>
              <th className="py-3 px-4 text-left">Genre</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Training Type</th>
              <th className="py-3 px-4 text-left">Téléphone</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Password</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.gender}</td>
                <td className="py-2 px-4">{new Date(u.dob).toLocaleDateString()}</td>
                <td className="py-2 px-4">{u.trainingType}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.password}</td>
                <td className="py-2 px-4 text-center flex justify-center gap-2">
                  <button
                    className="p-2 rounded bg-black hover:bg-gray-800 text-white"
                    onClick={() => startEdit(u)}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-2 rounded bg-white border border-black hover:bg-black hover:text-white transition"
                    onClick={() => deleteUser(u._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg border border-black">
            <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
            <input name="name" placeholder="Nom" value={form.name} onChange={handleInput} className="border p-2 w-full mb-2" />
            <select name="gender" value={form.gender} onChange={handleInput} className="border p-2 w-full mb-2">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
            <input type="date" name="dob" placeholder="Date de naissance" value={form.dob} onChange={handleInput} className="border p-2 w-full mb-2" />
            <select name="trainingType" value={form.trainingType} onChange={handleInput} className="border p-2 w-full mb-2">
              <option value="musculation">Musculation</option>
              <option value="fitness">Fitness</option>
              <option value="cardio">Cardio</option>
              <option value="danse">Danse</option>
            </select>
            <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleInput} className="border p-2 w-full mb-2" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleInput} className="border p-2 w-full mb-2" />
            <input name="password" placeholder="Mot de passe" type="password" value={form.password} onChange={handleInput} className="border p-2 w-full mb-4" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 text-black rounded">Annuler</button>
              <button onClick={addUser} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Form */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg border border-black">
            <h2 className="text-xl font-bold mb-4">Modifier l'utilisateur</h2>
            <input name="name" placeholder="Nom" value={form.name} onChange={handleInput} className="border p-2 w-full mb-2" />
            <select name="gender" value={form.gender} onChange={handleInput} className="border p-2 w-full mb-2">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
            <input type="date" name="dob" placeholder="Date de naissance" value={form.dob} onChange={handleInput} className="border p-2 w-full mb-2" />
            <select name="trainingType" value={form.trainingType} onChange={handleInput} className="border p-2 w-full mb-2">
              <option value="musculation">Musculation</option>
              <option value="fitness">Fitness</option>
              <option value="cardio">Cardio</option>
              <option value="danse">Danse</option>
            </select>
            <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleInput} className="border p-2 w-full mb-2" />
            <input name="email" placeholder="Email" value={form.email} onChange={handleInput} className="border p-2 w-full mb-2" />
            <input name="password" placeholder="Mot de passe (laisser vide si inchangé)" type="password" value={form.password} onChange={handleInput} className="border p-2 w-full mb-4" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowEditForm(false)} className="px-4 py-2 bg-gray-300 text-black rounded">Annuler</button>
              <button onClick={updateUser} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Mettre à jour</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
