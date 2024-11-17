import { z } from 'zod';

export const UserCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const GetUserSchema = z.object({
  params: z.object({
    id: z.string().optional(),
  }),
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
  }),
});

export const UserUpdateSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
  body: z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    email: z.string().trim().email('Invalid email format').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
  }),
});

export const DeleteUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});
