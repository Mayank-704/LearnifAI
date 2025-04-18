// controllers/groqController.js
import axios from 'axios';

export const handleGroqQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  try {
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'compound-beta', // or other model
        messages: [{ role: 'user', content: query }],
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
