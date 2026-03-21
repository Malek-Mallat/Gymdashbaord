import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Utilisateur from '@/models/Utilisateur';

export async function GET() {
  try {
    await connectDB();

    const count = await Utilisateur.countDocuments();

    return NextResponse.json(
      {
        count,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur lors du comptage des membres:", error);

    return NextResponse.json(
      { error: "Erreur serveur lors du comptage" },
      { status: 500 }
    );
  }
}
