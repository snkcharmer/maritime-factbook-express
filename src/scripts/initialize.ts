import { User } from '../api/user/user.model';
import { connectDB } from '../config/database';
import logger from '../config/logger';

const initializeDatabase = async () => {
  try {
    await connectDB();

    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      logger.info('Initializing default users...');
      await User.create([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'securepassword',
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'securepassword',
        },
      ]);
      logger.info('Default users created!');
    } else {
      logger.warning('Users already exist, skipping initialization.');
    }

    process.exit(0);
  } catch (error) {
    logger.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
