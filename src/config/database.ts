import { connect } from 'mongoose';
import logger from './logger';
import { env } from './environment';

export const connectDB = async () => {
  try {
    if (!env.dbUri) {
      logger.error('Database connection string is missing');
      throw new Error('Database connection string is missing');
    }

    console.log('Connecting to:', env.dbUri);
    await connect(env.dbUri);

    logger.info('Connected to the database successfully');
  } catch (error) {
    logger.error('Error connecting to the database', error);
    throw new Error('Database connection failed');
  }
};
