import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'end_user' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
