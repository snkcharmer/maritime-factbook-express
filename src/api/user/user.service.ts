import { IUser } from '../../interfaces/user.interface';
import { User } from './user.model';

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const newUser = await User.create({ name, email, password });
  return newUser;
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const findAllUsers = async (query: any) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const users = await User.find({})
    .skip(Number(skip))
    .limit(Number(limit))
    .exec();

  const total = await User.countDocuments().exec();

  return {
    users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const updateUserById = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserById = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};
