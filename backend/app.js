import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import tokenRoute from './api/routes/token';
import userRoutes from './api/routes/users';
import postRoutes from './api/routes/posts';

// Create Express application
const app = express();

// Use Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Cookie Parser
app.use(cookieParser());

// Serve files from static directory
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Define headers
app.use((req, res, next) => {
  // Define allowed request origins
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Allow credentials (Set-Cookie)
  res.header('Access-Control-Allow-Credentials', true);
  // Define allowed request headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Define allowed request methods
  // Browser always checks allowed methods by sending OPTIONS request prior to executing method
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    // Return empty response, to avoid request continuing to routes
    return res.status(200).json({});
  }
  return next();
});

// Routes which handle incoming requests.
app.use('/refresh-token', tokenRoute);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Catch requests that didn't match the defined routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Catch all errors (including undefined routes but e.g. also from database operations)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
  next();
});

export default app;
