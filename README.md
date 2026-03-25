
# Fitness Pro

> Plateforme de gestion et d’accompagnement sportif avec intégration d’IA

---

## Présentation

Fitness Pro est une application web moderne dédiée à la gestion de salles de sport, l’accompagnement des membres, la gestion des coachs et des administrateurs, et l’optimisation de l’expérience utilisateur grâce à l’intelligence artificielle. Elle propose un dashboard complet, un système d’authentification sécurisé, un chat, et des outils d’analyse avancés.

## Fonctionnalités principales

- Gestion des membres (inscription, modification, suppression)
- Gestion des coachs et administrateurs
- Dashboard interactif pour admins, coachs et utilisateurs
- Système de chat intégré
- Gestion des contacts et demandes
- Intégration d’un assistant virtuel IA dans la génération et gestion de plans d’entraînement et plan de nutrition 
- Statistiques et visualisations (Recharts)


## Stack technique

- **Framework** : Next.js (React)
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : NextAuth.js
- **UI/UX** : TailwindCSS, Framer Motion, Lucide React
- **Graphiques** : Recharts
- **Backend** : API REST Next.js (app/api)
- **Autres** : Socket.io, OpenAI, PDF-parse, React Hook Form

## Installation et lancement

1. **Cloner le projet**
	```bash
	git clone <url-du-repo>
	cd fitness-pro
	```
2. **Installer les dépendances**
	```bash
	npm install
	# ou
	yarn install
	```
3. **Configurer les variables d’environnement**
	- Créez un fichier `.env.local` à la racine avec vos clés MongoDB, NextAuth, OpenAI, etc.
4. **Lancer le serveur de développement**
	```bash
	npm run dev
	```
5. Accédez à [http://localhost:3000](http://localhost:3000)

## Structure du projet

- `src/app/` : pages, API routes, layouts
- `src/components/` : composants réutilisables (dashboard, sidebar, header, etc.)
- `src/models/` : schémas Mongoose (User, Admin, Coach, Contact, etc.)
- `src/lib/` : utilitaires (connexion MongoDB)
- `public/` et `assets/` : ressources statiques

## Utilisation

- Inscription et connexion pour membres, coachs, admins
- Accès à un dashboard personnalisé selon le rôle
- Gestion des membres, contacts, plans d’entraînement
- Paiement et suivi des abonnements
- Utilisation du chat et de l’assistant IA pour poser des questions ou obtenir de l’aide


---

© 2026 Fitness Pro. Tous droits réservés.
