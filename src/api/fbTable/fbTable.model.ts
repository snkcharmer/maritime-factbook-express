import { Schema, model } from 'mongoose';
import { IFbTable } from '../../interfaces/fbTable.interface';

const FbTableSchema: Schema = new Schema<IFbTable>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    chartType: { type: String, required: true },
    source: { type: String, required: true },
    data: { type: Array, required: true },
  },
  { timestamps: true }
);

export const FbTable = model<IFbTable & Document>('FbTable', FbTableSchema);
