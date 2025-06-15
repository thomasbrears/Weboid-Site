import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import ticketRoutes from './routes/ticketRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Cors policy (v1.2)
const corsOptions = {
  origin: (origin, callback) => {
    // List of allowed origins
    const allowedOrigins = [
      'https://weboid.dev',
      'https://www.weboid.dev',
      'https://weboidev.vercel.app'
    ];

    // Check for weboid-teams-projects pattern matching
    const IS_WEBOID_PROJECT = origin &&
      (origin.startsWith('https://weboid-teams-projects.vercel.app') ||
       origin.includes('-weboid-teams-projects.vercel.app'));

    // In production, check against allowed list or pattern
    if (process.env.NODE_ENV === 'production') {
      // Check if origin is allowed or matches WEBOID Project pattern
      if (!origin || allowedOrigins.includes(origin) || IS_WEBOID_PROJECT) {
        callback(null, true);
      } else {
        console.log(`CORS rejected: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // In development, allow all origins
      callback(null, true);
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;