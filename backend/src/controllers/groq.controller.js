// controllers/groqController.js
import axios from 'axios';

function makeSpeechFriendly(text) {
  let friendly = text.replace(/,/g, ', ');
  friendly = friendly.replace(/\.\s*/g, '. ');
  if (friendly.length > 300) {
    friendly = friendly.match(/[^\.!\?]+[\.!\?]+/g)?.join(' ') || friendly;
  }
  return friendly.trim();
}

export const handleGroqQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  try {
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'compound-beta',
        messages: [
          { role: 'system', content: 'You are an expert AI assistant. Answer in a very simple, clear, and easy-to-speak manner, like explaining to a beginner.' },
          { role: 'user', content: `Please explain this in a way that's easy to recite aloud: ${query}` }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = groqRes.data.choices[0].message.content;
    const speechFriendlyReply = makeSpeechFriendly(reply);

    res.json({ response: speechFriendlyReply });
  } catch (error) {
    console.error('Groq API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Groq' });
  }
};
