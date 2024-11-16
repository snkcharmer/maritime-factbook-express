import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  dbUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  apiKey: process.env.API_KEY || '',
};
