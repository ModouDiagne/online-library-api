import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  username: string;
  role: string; // Par exemple, 'user' ou 'admin'
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, default: 'user' },
});
