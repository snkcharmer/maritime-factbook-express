import dotenv from 'dotenv';

import app from './app';
import logger from './config/logger';
import { connectDB } from './config/database';

dotenv.config();
const PORT = process.env.PORT || 5000;

logger.info(`Attempting to start the server on port ${PORT}`);

connectDB()
  .then(() => {
    logger.info('Database connection successful');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to the database', { error: error.message });
    process.exit(1);
  });
