import { z } from 'zod';

export const fbCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export const fbCategoryUpdateSchema = fbCategorySchema.partial();
