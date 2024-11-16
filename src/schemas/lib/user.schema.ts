import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const GetUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
