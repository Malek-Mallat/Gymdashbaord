import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Utilisateur from '@/models/Utilisateur';

export async function GET() {
  try {
    await connectDB();

    const users = await Utilisateur.find({role:"admin"}); 

    return NextResponse.json(
      {
        message: 'Liste des admin récupérée avec succès',
        users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}