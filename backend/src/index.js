// index.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDataBase.js';
import cors from 'cors';
import cookieSession from "cookie-session"


//import routes
import groqRoutes from './routes/groq.route.js';
import authRoutes from './routes/auth.route.js'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173/",
  credential: true
}));
// Connect to MongoDB
connectDB();

app.use('/api/groq', groqRoutes);
app.use('/api/auth',authRoutes)

app.use(cookieSession({
name: "learnifai-session",
secret: process.env.SESSION_COOKIE_SECRET,
sameSite: "none",
maxAge: 31 * 24 * 60 * 60 * 1000,
secure: true
}))
app.use((req,res,next)=>{
if(req.session.userId){
  req.session.lastAccess = Date.now()
}
next()
})

//protected routes
// app.get('/secure-data', verifyToken, (req, res) => {
//   res.json({
//     message: 'This is protected backend data ✅',
//     uid: req.uid, // from verified token
//   });
// });

// Sample route
app.get('/', (req, res) => {
  res.send('LearnifAI backend is running ✅');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
