import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Assuming you have a User model to interact with your DB

export const handleGroqQuery = async (req, res) => {
  console.log("GROQ API Key:", process.env.GROQ_API_KEY);

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // 'Bearer token'

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here

    // Find the user associated with the token (assuming the token contains the user ID)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Proceed to make the request to Groq
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

    // Save the query and response to the user's record in the database
    user.queryHistory.push({
      query,
      response: reply,
      timestamp: new Date(),
    });

    await user.save(); // Save the updated user record with query history

    // Respond to the frontend with the Groq response
    res.json({ response: reply });
  } catch (error) {
    console.error('Groq API error:', error?.response?.data || error.message);
    res.status(500).json(error);
  }
};
