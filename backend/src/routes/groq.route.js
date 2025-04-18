// routes/groqRoutes.js
import express from 'express';
import { handleGroqQuery } from '../controllers/groq.controller.js'
import { generateGroqSpeech } from '../controllers/groqTTS.controller.js';
// import verifyFirebaseToken from '../middleware/auth.js';

const router = express.Router();

router.post('/ask', handleGroqQuery);
router.post('/tts', generateGroqSpeech);


export default router;
