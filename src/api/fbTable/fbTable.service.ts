import { IFbTable } from '../../interfaces/fbTable.interface';
import { transformReferences } from '../../utils/transformRef';
import { FbTable } from './fbTable.model';

export const createFbTable = async (tableData: Partial<IFbTable>) => {
  return FbTable.create(tableData);
};

export const findFbTableById = async (id: string) => {
  const fbTable = await FbTable.findById(id).populate('userId');

  if (fbTable) {
    const transformedTable = transformReferences(fbTable.toObject(), {
      references: ['userId'],
      removeOriginal: true,
    });
    return transformedTable;
  }

  return null;
};

export const findAllFbTables = async (query: any) => {
  const { page = 1, limit = 10, userId } = query;
  const skip = (page - 1) * limit;

  const filter = userId ? { userId } : {};

  const tables = await FbTable.find(filter)
    .populate('userId')
    .skip(Number(skip))
    .limit(Number(limit))
    .exec();

  const transformedTable = transformReferences(
    tables.map((t) => t.toObject()),
    {
      references: ['userId'],
      removeOriginal: true,
    }
  );

  const total = await FbTable.countDocuments(filter).exec();

  return {
    tables: transformedTable,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const updateFbTableById = async (id: string, data: any) => {
  return FbTable.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFbTableById = async (id: string) => {
  return FbTable.findByIdAndDelete(id);
};
