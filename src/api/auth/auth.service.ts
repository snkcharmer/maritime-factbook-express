import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import dotenv from 'dotenv';

interface DecodedToken {
  id: string;
  email: string;
  iat: number; // Issued At
  exp: number; // Expiration
}

dotenv.config();

export const saltRounds = 10;

const tokenBlacklist: Set<string> = new Set();

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

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

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      String(jwtSecret),
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      String(jwtRefreshSecret),
      {
        expiresIn: '7d',
      }
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const refreshToken = async (token: string) => {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, String(jwtRefreshSecret)) as DecodedToken;
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      String(jwtSecret),
      {
        expiresIn: '1h',
      }
    );

    return {
      accessToken: newAccessToken,
    };
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export const logoutUser = (token: string) => {
  // Optionally, perform any database actions for logout if necessary (e.g., blacklisting refresh tokens).
  // Here, we only focus on clearing cookies or token data.
  tokenBlacklist.add(token);
  return { message: 'Logged out successfully' };
};

export const isTokenBlacklisted = (token: string) => {
  return tokenBlacklist.has(token);
};
