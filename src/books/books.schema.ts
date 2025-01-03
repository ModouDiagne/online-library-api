import { Schema, Document } from 'mongoose';

export interface Review {
  userId: string; // Identifiant de l'utilisateur
  rating: number; // Note de l'utilisateur (de 1 à 5 par exemple)
  comment: string; // Commentaire de l'utilisateur
  createdAt: Date; // Date de la revue
}

export interface Book extends Document {
  title: string;
  author: string;
  description: string;
  genre: string;
  reviews: Review[]; // Tableau des revues
  averageRating: number; // Note moyenne calculée
}

export const BookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  reviews: [{
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
  averageRating: { type: Number, default: 0 }, // Note moyenne du livre
});
