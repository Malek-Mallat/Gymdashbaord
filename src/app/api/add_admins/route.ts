import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Utilisateur from '@/models/Utilisateur';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, } = body;

    // Rôle par défaut
    const userRole = 'admin';
    // Validation des champs obligatoires
    if (!name || !email || !password) {
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

   

    const rolesAutorises = ['admin', 'membre'];
    if (!rolesAutorises.includes(userRole)) {
      return NextResponse.json(
        { error: 'Rôle invalide' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    const user = await Utilisateur.create({
      name,
      email,
      password,
      role: userRole,
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      password:user.password,
      role: userRole,
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

 

    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription" },
      { status: 500 }
    );
  }
}
