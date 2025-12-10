import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
// CORS configurado para permitir el frontend de Netlify
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Permite todos los orígenes si no se especifica
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'TODO List API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      tasks: {
        getAll: 'GET /api/tasks',
        create: 'POST /api/tasks',
        update: 'PUT /api/tasks/:id',
        delete: 'DELETE /api/tasks/:id'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

