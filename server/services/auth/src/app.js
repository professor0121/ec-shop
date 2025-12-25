import express from 'express';
import './config/dbConfig.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import './config/passportConfig.js';
import { configureSession } from './config/sessionCookieConfig.js';
import { connectRabbitMQ } from './config/rabbitMqConfig.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectRabbitMQ();
configureSession(app);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

export default app;