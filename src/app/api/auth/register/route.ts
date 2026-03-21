import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Utilisateur from '@/models/Utilisateur';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, gender, dob, phone, trainingType, role } = body;

    // Rôle par défaut
    const userRole = role || 'membre';

    // Validation des champs obligatoires
    if (!name || !email || !password || !gender || !dob || !phone || !trainingType) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Validation du genre
    if (!['homme', 'femme'].includes(gender)) {
      return NextResponse.json(
        { error: 'Genre invalide' },
        { status: 400 }
      );
    }

    // Validation du type d'entraînement
    const typesAutorises = ['musculation', 'box', 'cardio', 'danse'];
    if (!typesAutorises.includes(trainingType)) {
      return NextResponse.json(
        { error: "Type d'entraînement invalide" },
        { status: 400 }
      );
    }

    // Validation du rôle
    const rolesAutorises = ['admin', 'membre'];
    if (!rolesAutorises.includes(userRole)) {
      return NextResponse.json(
        { error: 'Rôle invalide' },
        { status: 400 }
      );
    }

    // Connexion à la base
    await connectDB();

    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Création de l'utilisateur
    const user = await Utilisateur.create({
      name,
      email,
      password,
      gender,
      dob: new Date(dob),
      phone,
      trainingType,
      role: userRole,
    });

    // Préparer la réponse (sans password)
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
      {
        message: 'Compte créé avec succès',
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
