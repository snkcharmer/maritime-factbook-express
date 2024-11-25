import { FbTable } from './fbTable.model';

export const createFbTable = async (tableData: any) => {
  return FbTable.create(tableData);
};

export const findFbTableById = async (id: string) => {
  return FbTable.findById(id);
};

export const findAllFbTables = async (query: any) => {
  const { page = 1, limit = 10, userId } = query;
  const skip = (page - 1) * limit;

  const filter = userId ? { userId } : {};

  const tables = await FbTable.find(filter)
    .skip(Number(skip))
    .limit(Number(limit))
    .exec();

  const total = await FbTable.countDocuments(filter).exec();

  return {
    tables,
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
