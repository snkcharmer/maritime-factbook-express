import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './utils/swagger';
import authRoutes from './api/auth/auth.routes';
import userRoutes from './api/user/user.routes';
import { errorHandler } from './middlewares/error.middleware';
import { verifyApiKey } from './middlewares/apiKey.middleware';

const app = express();

// Middleware
app.use(verifyApiKey);
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

setupSwagger(app);

app.use(errorHandler);

export default app;
