import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './utils/swagger';
import { errorHandler } from './middlewares/error.middleware';
import { verifyApiKey } from './middlewares/apiKey.middleware';
import { reqLogger } from './middlewares/logger.middleware';
import authRoutes from './api/auth/auth.routes';
import userRoutes from './api/user/user.routes';
import fbTableRoutes from './api/fbTable/fbTable.routes';
import fbCategoryRoutes from './api/fbCategory/fbCategory.routes';
import fbSubCategoryRoutes from './api/fbSubCategory/fbSubCategory.routes';

const app = express();

// Middleware
app.use(helmet());

// CORS middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  })
);

// Preflight handler for all routes
app.options('*', cors());

// logger middleware to log all requests and responses
app.use(reqLogger);

// API key verification middleware
app.use(verifyApiKey);

// JSON body parser and other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fbTable', fbTableRoutes);
app.use('/api/fbCategory', fbCategoryRoutes);
app.use('/api/fbSubCategory', fbSubCategoryRoutes);

setupSwagger(app);

app.use(errorHandler);

export default app;
