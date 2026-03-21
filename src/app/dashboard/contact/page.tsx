"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    tel: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.nom,
          email: form.email,
          phone: form.tel,
          description: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur lors de l’envoi");
        setLoading(false);
        return;
      }

      setSent(true); // popup success
      setForm({ nom: "", email: "", tel: "", message: "" }); // reset form

    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-black">
        Contactez-nous
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 space-y-6"
      >
        {/* NOM COMPLET */}
        <div>
          <label className="font-semibold text-black">Nom complet</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg text-black"
            placeholder="Votre nom complet"
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-semibold text-black">Adresse email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg text-black"
            placeholder="exemple@email.com"
            required
          />
        </div>

        {/* TÉLÉPHONE */}
        <div>
          <label className="font-semibold text-black">Numéro de téléphone</label>
          <input
            type="tel"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg text-black"
            placeholder="Votre numéro"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold text-black">Description</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg text-black"
            placeholder="Décrivez votre demande..."
            rows={4}
            required
          />
        </div>

        {/* BOUTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Envoyer"}
        </motion.button>
      </form>

      {/* POPUP CONFIRMATION */}
      {sent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-black text-center space-y-4"
          >
            <h2 className="text-xl font-semibold">Message envoyé ✔</h2>
            <p>Nous vous répondrons dès que possible.</p>

            <button
              onClick={() => setSent(false)}
              className="bg-black text-white w-full py-2 rounded-lg font-semibold"
            >
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
