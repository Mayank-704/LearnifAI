// index.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDataBase.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

//import routes
import groqRoutes from './routes/groq.route.js';
import authRoutes from "./routes/auth.routes.js";
import historyRoutes from "./routes/history.route.js"

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const allowedOrigins = [
  'https://learnifai-3.onrender.com', // your deployed frontend
  'http://localhost:5173', // your local frontend (optional for dev)
  'chrome-extension://dcpnpggjlefcpknpnodokplkgkdkcafh' // your Chrome extension
];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  credentials: true
}))

app.use(cookieParser());

// Connect to MongoDB
connectDB();

app.use('/api/groq', groqRoutes);
app.use('/api/auth/',authRoutes);
app.use('/api/history',historyRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('LearnifAI backend is running ✅');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
