// index.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDataBase.js';
import cors from 'cors';

//import routes
import groqRoutes from './routes/groq.route.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin :"http://localhost:5173",
  credentials: true
}))

// Connect to MongoDB
connectDB();

app.use('/api/groq', groqRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('LearnifAI backend is running ✅');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
