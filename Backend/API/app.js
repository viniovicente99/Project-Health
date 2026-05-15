import express from 'express';
import projectRoutes from './routes/project.routes.js';
import healthCheckRoutes from './routes/healthCheck.routes.js';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors ({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
    credentials: true
}))

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/projects', healthCheckRoutes);

export default app;