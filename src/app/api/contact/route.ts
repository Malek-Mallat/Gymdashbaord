import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, description } = body;

    // Validation basique
    if (!fullName || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Tous les champs doivent être remplis" },
        { status: 400 }
      );
    }
    // Format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    await connectDB();

    // Enregistrer le message contact
    const contact = await Contact.create({
      fullName,
      email,
      phone,
      description,
    });

    return NextResponse.json(
      {
        message: "Message envoyé avec succès",
        contact: {
          id: contact._id,
          fullName: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          description: contact.description,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l’envoi du contact:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Données invalides", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur serveur lors de l’envoi du message" },
      { status: 500 }
    );
  }
}
