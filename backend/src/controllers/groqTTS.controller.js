// controllers/groqTTS.controller.js
import axios from 'axios';

export const generateGroqSpeech = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/audio/speech',
      {
        model: 'playai-tts', // or 'playai-tts-arabic'
        input: text,
        voice: 'Aaliyah-PlayAI', 
        response_format: 'mp3',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="groq-tts.mp3"',
    });

    res.send(response.data);
  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
    }

    const raw = error.response?.data;
    const decoded = raw ? Buffer.from(raw).toString('utf-8') : error.message;
    console.error('Groq TTS Error:', decoded);
    res.status(400).json({ message: 'Groq TTS failed', details: decoded });
  }
  
};
