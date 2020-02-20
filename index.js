import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mysql from 'mysql';

import postRoutes from './api/routes/posts';

const rds = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

rds.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
  rds.end();
});


const port = process.env.PORT || 3000;

// Create Express application
const app = express();

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define headers
app.use((req, res, next) => {
  // Define allowed request origins
  res.header('Access-Control-Allow-Origin', '*');
  // Define allowed request types
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Define allowed request headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

// Routes which handle incoming requests.
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

const server = http.createServer(app);

server.listen(port);
