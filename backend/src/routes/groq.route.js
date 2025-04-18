// routes/groqRoutes.js
import express from 'express';
import { handleGroqQuery } from '../controllers/groq.controller.js'
import { generateGroqSpeech } from '../controllers/groqTTS.controller.js';
import protect from '../middlewares/auth.middleware.js'
// import verifyFirebaseToken from '../middleware/auth.js';


const router = express.Router();

router.post('/ask', protect, handleGroqQuery);
router.post('/tts', generateGroqSpeech);


export default router;
