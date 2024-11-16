import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
