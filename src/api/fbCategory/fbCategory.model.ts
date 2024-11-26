import { Schema, model } from 'mongoose';
import { IFbCategory } from '../../interfaces/fbCategory.interface';

const FbCategorySchema: Schema = new Schema<IFbCategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const FbCategory = model<IFbCategory & Document>(
  'FbCategory',
  FbCategorySchema
);
