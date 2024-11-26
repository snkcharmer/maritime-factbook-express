import { Schema, model } from 'mongoose';
import { IFbSubCategory } from '../../interfaces/fbSubCategory.interface';

const FbSubCategorySchema: Schema = new Schema<IFbSubCategory>(
  {
    fbCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'FbCategory',
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const FbSubCategory = model<IFbSubCategory & Document>(
  'FbSubCategory',
  FbSubCategorySchema
);
