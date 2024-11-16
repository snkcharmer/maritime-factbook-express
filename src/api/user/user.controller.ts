import {
  createUser,
  findUserById,
  findAllUsers,
  updateUserById,
  deleteUserById,
} from './user.service';
import { UserCreateSchema, GetUserSchema } from '../../schemas/lib/user.schema';
import { CustomRequest, CustomResponse } from '../../types/custom';

export const createUserController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { name, email, password } = UserCreateSchema.parse(req.body);

    const user = await createUser(name, email, password);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data', details: error });
  }
};

export const getUserController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await findUserById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ success: true, user });
    } else {
      const usersData = await findAllUsers(req.query);
      res.json({ success: true, data: usersData });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

export const updateUserController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { params } = GetUserSchema.parse(req.params);
    const { id } = params;

    const updatedData = UserCreateSchema.parse(req.body);

    const updatedUser = await updateUserById(id, updatedData);
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ success: true, updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Invalid data or ID format', details: error });
  }
};

export const deleteUserController = async (
  req: CustomRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
