// controllers/groqController.js
import axios from 'axios';

export const handleGroqQuery = async (req, res) => {
  const { query, model } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  try {
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
      model: `${model}`, // or another model
      messages: [
        { role: 'system', content: 'You are an expert AI assistant. Answer in a very simple, clear, and easy-to-speak manner. Make sure to give a short, crisp, and concise response unless explicitly asked to provide full or detailed content.' },
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
    res.json({ response: reply });
  } catch (error) {
    console.error('Groq API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Groq' });
  }
};
