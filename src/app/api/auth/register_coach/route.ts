import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coach from '@/models/Coach';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, gender, dob, phone, specialite } = body;

    // Validation
    if (!name || !email || !password || !gender || !dob || !phone || !specialite) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    if (!['homme', 'femme'].includes(gender)) {
      return NextResponse.json(
        { error: 'Genre invalide' },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Coach.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Créer le coach
    const coach = await Coach.create({
      name,
      email,
      password,
      gender,
      dob: new Date(dob),
      phone,
      specialite, // champ spécifique aux coaches
    });

    // Retourner le coach sans le password
    const coachResponse = {
      id: coach._id,
      name: coach.name,
      email: coach.email,
      gender: coach.gender,
      dob: coach.dob,
      phone: coach.phone,
      specialite: coach.specialite,
      createdAt: coach.createdAt,
    };

    return NextResponse.json(
      {
        message: 'Coach créé avec succès',
        user: coachResponse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de l\'inscription coach:', error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'inscription coach' },
      { status: 500 }
    );
  }
}
