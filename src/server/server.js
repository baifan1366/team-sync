import express from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const prisma = new PrismaClient();
import cors from 'cors';


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  credentials: true, // Allows cookies and other credentials to be sent
}));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

import expressSwagger from 'express-swagger-generator';
const swaggerGenerator = expressSwagger(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'API for a Teams-like application with team, chat, task, and project management features',
      title: 'Teams-Sync API Docs',
      version: '1.0.0',
  },
  host: 'localhost:3001',
  basePath: '/api',
  produces: [
      "application/json"
  ],
    schemes: ['http', 'https'],
    // securityDefinitions: {
    //     JWT: {
    //         type: 'apiKey',
    //         in: 'header',
    //         name: 'Authorization',
    //         description: "Bearer token",
    //     }
    // },
  },
  basedir: path.join(__dirname, '/../'), // 设置为 src 的绝对路径
  files: ['./server/routes/**/*.js'], // 这里的路径相对于 basedir
};
swaggerGenerator(options)

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
    prisma.$disconnect()
  })
})
export default app;