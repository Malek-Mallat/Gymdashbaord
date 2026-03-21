import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // Vérification des champs
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Veuillez remplir tous les champs" },
        { status: 400 }
      );
    }

    // Vérifier si admin existe déjà
    const adminExiste = await Admin.findOne({ email });
    if (adminExiste) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Administrateur créé avec succès",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur register admin:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
