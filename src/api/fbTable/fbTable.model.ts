import { Schema, model } from 'mongoose';

const FbTableSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    chartType: { type: String, required: true },
    source: { type: String, required: true },
    data: { type: Array, required: true },
  },
  { timestamps: true }
);

export const FbTable = model('FbTable', FbTableSchema);
