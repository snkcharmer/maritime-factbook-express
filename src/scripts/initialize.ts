import { saltRounds } from '../api/auth/auth.service';
import { User } from '../api/user/user.model';
import { connectDB } from '../config/database';
import logger from '../config/logger';
import bcrypt from 'bcrypt';

const initializeDatabase = async () => {
  try {
    await connectDB();

    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
      logger.info('Initializing default users...');

      const hashedAdminPassword = await bcrypt.hash(
        'securepassword',
        saltRounds
      );
      const hashedUserPassword = await bcrypt.hash(
        'securepassword',
        saltRounds
      );

      await User.create([
        {
          name: 'Admin User',
          email: 'admin@gmail.com',
          password: hashedAdminPassword,
          role: 'admin',
        },
        {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          password: hashedUserPassword,
          role: 'end_user',
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
