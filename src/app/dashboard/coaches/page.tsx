'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

type FormData = {
  age: number;
  taille: number;
  entrainement: string;
  objectifs: string;
  poids_actuel: number;
  repas: string;
  allergies: string[];
  aliments_detestes: string;
  poids_cible: number;
};

export default function NutritionAIForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyCKyaYLmnaaFb29_BkkNMO5Vkifb9bCVJI";

  const handleFormSubmit = async (data: FormData) => {
    const prompt = `
Tu es un coach nutritionnel expert.

Voici les données de l'utilisateur :
- Âge : ${data.age}
- Taille : ${data.taille} cm
- Poids actuel : ${data.poids_actuel} kg
- Poids cible : ${data.poids_cible} kg
- Type d’entraînement : ${data.entrainement}
- Objectif : ${data.objectifs}
- Allergies : ${
      Array.isArray(data.allergies) ? data.allergies.join(", ") : "Aucune"
    }
- Aliments détestés : ${data.aliments_detestes}
- Nombre de repas : ${data.repas}

Génère un plan nutritionnel quotidien clair, court et bien structuré.

Règles :
1. Donne un titre en gras pour chaque partie :
   **Calories recommandées**
   **Protéines recommandées**
   **Repas du jour**

2. Pour les calories et les protéines : 
   - Une seule phrase simple contenant un nombre précis.

3. Pour les repas :
   - Minimum 3 repas.
   - Chaque repas doit être séparé clairement :
     **Petit-déjeuner :**
     **Déjeuner :**
     **Dîner :**
   - Brève description + calories et protéines.
   - Prends en compte les allergies et aliments à éviter.

Format lisible, concis et propre.
`;

    setMessages([]);
    setLoading(true);

    try {
      const result = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const json = await result.json();

      const aiText =
        json?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Erreur : aucune réponse reçue.";

      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Erreur lors de la requête." },
      ]);
    }

    setLoading(false);
  };

  const objectifsOptions = [
    "Perdre du gras",
    "Rester sec et musclé",
    "Prendre du muscle proprement",
  ];

  const entrainementOptions = ["Musculation", "Cardio", "Boxe", "Danse"];

  const repasOptions = ["3 repas", "4 repas", "5-6 repas"];

  const allergiesOptions = [
    "Poissons / fruits de mer",
    "Œufs",
    "Produits laitiers",
    "Gluten",
    "Arachides",
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-2xl shadow-md p-6 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-black">
          Plan nutrition
        </h1>

        {/* AGE */}
        <div>
          <label className="font-semibold text-black">Âge</label>
          <input
            type="number"
            {...register("age")}
            className="w-full mt-2 p-3 border rounded-lg text-black"
          />
        </div>

        {/* TAILLE */}
        <div>
          <label className="font-semibold text-black">Taille (cm)</label>
          <input
            type="number"
            {...register("taille")}
            className="w-full mt-2 p-3 border rounded-lg text-black"
          />
        </div>

        {/* POIDS */}
        <div>
          <label className="font-semibold text-black">Poids actuel (kg)</label>
          <input
            type="number"
            {...register("poids_actuel")}
            className="w-full mt-2 p-3 border rounded-lg text-black"
          />
        </div>

        {/* POIDS CIBLE */}
        <div>
          <label className="font-semibold text-black">Poids cible (kg)</label>
          <input
            type="number"
            {...register("poids_cible")}
            className="w-full mt-2 p-3 border rounded-lg text-black"
          />
        </div>

        {/* OBJECTIF */}
        <div>
          <label className="font-semibold text-black">Objectif</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {objectifsOptions.map((obj) => (
              <label
                key={obj}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border cursor-pointer text-black"
              >
                <input type="radio" value={obj} {...register("objectifs")} />
                {obj}
              </label>
            ))}
          </div>
        </div>

        {/* TYPE D’ENTRAÎNEMENT */}
        <div>
          <label className="font-semibold text-black">
            Type d’entraînement
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {entrainementOptions.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border cursor-pointer text-black"
              >
                <input
                  type="radio"
                  value={type}
                  {...register("entrainement")}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* ALLERGIES */}
        <div>
          <label className="font-semibold text-black">Allergies</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {allergiesOptions.map((a) => (
              <label
                key={a}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border cursor-pointer text-black"
              >
                <input type="checkbox" value={a} {...register("allergies")} />
                {a}
              </label>
            ))}
          </div>
        </div>

        {/* ALIMENTS DÉTESTÉS */}
        <div>
          <label className="font-semibold text-black">Aliments détestés</label>
          <textarea
            {...register("aliments_detestes")}
            className="w-full mt-3 p-3 border rounded-lg text-black"
            placeholder="Ex : je déteste le brocoli..."
          />
        </div>

        {/* NOMBRE DE REPAS */}
        <div>
          <label className="font-semibold text-black">Nombre de repas</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {repasOptions.map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border cursor-pointer text-black"
              >
                <input type="radio" value={r} {...register("repas")} />
                {r}
              </label>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold"
        >
          Obtenir mon plan nutrition
        </motion.button>
      </form>

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-black space-y-4 flex flex-col items-center"
          >
            <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full" />
            <p className="text-lg font-semibold">Chargement...</p>
          </motion.div>
        </div>
      )}

      {/* POPUP RESULT IA */}
      {messages.length > 0 && !loading && (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-full h-full max-w-none max-h-none text-black space-y-4 flex flex-col"
          >
            <h2 className="text-2xl font-semibold">Résultat IA</h2>

            <div className="flex-1 overflow-y-auto p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
              {messages[0].text}
            </div>

            <button
              onClick={() => setMessages([])}
              className="w-full bg-black text-white py-2 rounded-lg font-semibold"
            >
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
