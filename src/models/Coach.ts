import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ICoach extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: 'homme' | 'femme';
  dob: Date;
  phone?: string;
  specialite: 'musculation' | 'fitness' | 'cardio';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const CoachSchema = new Schema<ICoach>(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez fournir un email valide',
      ],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false,
    },
    gender: {
      type: String,
      required: [true, 'Le genre est requis'],
      enum: ['homme', 'femme'],
    },
    dob: {
      type: Date,
      required: [true, 'La date de naissance est requise'],
    },
    phone: {
      type: String,
      trim: true,
    },
    specialite: {
      type: String,
      required: [true, 'La spécialité est requise'],
      enum: ['musculation', 'fitness', 'cardio'],
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password avant sauvegarde
CoachSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
CoachSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch {
    return false;
  }
};

// Éviter la redéfinition du modèle
const Coach: Model<ICoach> =
  mongoose.models.Coach || mongoose.model<ICoach>('Coach', CoachSchema);

export default Coach;
