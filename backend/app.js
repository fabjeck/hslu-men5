import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import tokenRoute from './api/routes/token';
import userRoutes from './api/routes/users';
import postRoutes from './api/routes/posts';

// Create Express application
const app = express();

const corsOptions = {
  // Access-Control-Allow-Origin
  origin: 'http://localhost:3000',
  // Access-Control-Allow-Methods
  methods:  'PUT, POST, PATCH, DELETE, GET',
  // Access-Control-Allow-Headers
  allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  // Access-Control-Allow-Credentials
  credentials: true,
}

app.use(cors(corsOptions));

// Serve files from static directory
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Use Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Cookie Parser
app.use(cookieParser());

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
