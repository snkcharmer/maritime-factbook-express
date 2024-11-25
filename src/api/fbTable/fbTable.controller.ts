import {
  createFbTable,
  findFbTableById,
  findAllFbTables,
  updateFbTableById,
  deleteFbTableById,
} from './fbTable.service';
import { CustomRequest, CustomResponse } from '../../types/custom';

export const createFbTableController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { userId, name, chartType, source, data, category } = req.body;

    const fbTable = await createFbTable({
      userId,
      category,
      name,
      chartType,
      source,
      data,
    });
    res.status(201).json({ success: true, fbTable });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data', details: error });
  }
};

export const getFbTableController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    if (id) {
      const fbTable = await findFbTableById(id);

      if (!fbTable) {
        res.status(404).json({ error: 'Table not found' });
        return;
      }

      res.json({ success: true, fbTable });
    } else {
      const fbTablesData = await findAllFbTables(req.query);
      res.json({ success: true, data: fbTablesData });
    }
  } catch (error) {
    console.error('Error fetching fbTable:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export const updateFbTableController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedFbTable = await updateFbTableById(id, updatedData);
    if (!updatedFbTable) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }

    res.json({ success: true, updatedFbTable });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Invalid data or ID format', details: error });
  }
};

export const deleteFbTableController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFbTable = await deleteFbTableById(id);
    if (!deletedFbTable) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }

    res.json({ success: true, message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
