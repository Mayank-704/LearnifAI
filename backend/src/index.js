// index.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDataBase.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

//protected routes
app.get('/secure-data', verifyToken, (req, res) => {
  res.json({
    message: 'This is protected backend data ✅',
    uid: req.uid, // from verified token
  });
});

// Sample route
app.get('/', (req, res) => {
  res.send('LearnifAI backend is running ✅');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
