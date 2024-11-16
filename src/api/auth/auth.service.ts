import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;

const jwtSecret = process.env.JWT_SECRET;

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    console.log('testtesterror', error);
    throw new Error('User registration failed');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      String(jwtSecret),
      {
        expiresIn: '1h',
      }
    );

    return {
      token,
      user,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};
