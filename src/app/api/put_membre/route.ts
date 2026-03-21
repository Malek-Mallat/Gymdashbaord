import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Utilisateur from '@/models/Utilisateur';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, name, email, password, gender, dob, phone, trainingType, role } = body;

    if (!_id) {
      return NextResponse.json({ error: 'ID utilisateur manquant' }, { status: 400 });
    }

    // Validation rôle
    const rolesAutorises = ['admin', 'membre'];
    if (role && !rolesAutorises.includes(role)) {
      return NextResponse.json({ error: 'Rôle invalide' }, { status: 400 });
    }

    // Validation genre
    if (gender && !['homme', 'femme'].includes(gender)) {
      return NextResponse.json({ error: 'Genre invalide' }, { status: 400 });
    }

    // Validation type d'entraînement
    const typesAutorises = ['musculation', 'box', 'cardio', 'danse'];
    if (trainingType && !typesAutorises.includes(trainingType)) {
      return NextResponse.json({ error: "Type d'entraînement invalide" }, { status: 400 });
    }

    // Validation mot de passe
    if (password && password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Connexion DB
    await connectDB();

    // Récupérer l'utilisateur par ID
    const user = await Utilisateur.findById(_id);
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Mise à jour des champs
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (gender) user.gender = gender;
    if (dob) user.dob = new Date(dob);
    if (phone) user.phone = phone;
    if (trainingType) user.trainingType = trainingType;
    if (role) user.role = role;

    await user.save();

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      typeEntrainement: user.trainingType,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      { message: 'Utilisateur mis à jour avec succès', user: userResponse },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}
