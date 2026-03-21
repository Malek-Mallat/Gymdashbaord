'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Building2 } from "lucide-react";

export default function PaiementPage() {
  const [typePaiement, setTypePaiement] = useState("en_ligne");
  const [duree, setDuree] = useState("1_mois");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Paiement de l'abonnement
        </h1>

        {/* Choix type de paiement */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-4 text-gray-700">
            Mode de paiement
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTypePaiement("en_ligne")}
              className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition shadow-sm hover:shadow-md ${
                typePaiement === "en_ligne"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <CreditCard className="w-8 h-8" />
              <span className="font-semibold">En ligne</span>
            </button>

            <button
              onClick={() => setTypePaiement("presentiel")}
              className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition shadow-sm hover:shadow-md ${
                typePaiement === "presentiel"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <Building2 className="w-8 h-8" />
              <span className="font-semibold">Présentiel</span>
            </button>
          </div>
        </div>

        {/* Durée abonnement */}
        {typePaiement === "en_ligne" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <label className="block text-lg font-semibold mb-3 text-gray-700">
              Durée de l'abonnement
            </label>

            <select
              className="w-full p-4 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
            >
              <option value="1_mois">1 mois — 90 DT</option>
              <option value="3_mois">3 mois — 230 DT</option>
              <option value="6_mois">6 mois — 450 DT</option>
            </select>
          </motion.div>
        )}

        {/* Bouton final */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
        >
          Continuer
        </motion.button>
      </motion.div>
    </div>
  );
}
