import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { Types } from 'mongoose';
import Utilisateur from '@/models/Utilisateur';

export async function POST(req: Request) {
  try {
    await connectDB();

    // Get JSON body from the request
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: '_id manquant' }, { status: 400 });
    }

    // Check if the id is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const deletedUser = await Utilisateur.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Utilisateur supprimé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression' },
      { status: 500 }
    );
  }
}