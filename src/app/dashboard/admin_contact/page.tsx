'use client';

import { useEffect, useState } from 'react';

interface ContactType {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  description: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/get_contact', { cache: 'no-store' });
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setContacts(data.contacts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-800 mb-6">
        Liste des messages contact
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-left text-gray-700">
              <th className="py-3 px-4 font-medium">Nom complet</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Téléphone</th>
              <th className="py-3 px-4 font-medium">Description</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{c.fullName}</td>
                <td className="py-3 px-4">{c.email}</td>
                <td className="py-3 px-4">{c.phone}</td>
                <td className="py-3 px-4">{c.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
