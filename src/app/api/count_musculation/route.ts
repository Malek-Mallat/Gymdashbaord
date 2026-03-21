import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Utilisateur from '@/models/Utilisateur';
import Contact from '@/models/Contact';


export async function GET() {
  try {
    await connectDB();

    const count = await Utilisateur.countDocuments({role:"membre",trainingType:"musculation"});

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
