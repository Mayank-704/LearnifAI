import User from '../models/user.model.js';
import ResponseHistory from '../models/responseHistory.model.js'; // Assuming you have a ResponseHistory model

// Fetch user history
export const getUserHistory = async (req, res) => {
  try {
    // Get the user ID from the token (added by the middleware)
    const userId = req.user.id;

    // Fetch the user's history from the ResponseHistory model
    const history = await ResponseHistory.find({ userId }).sort({ createdAt: -1 });

    // Check if history exists
    if (history.length === 0) {
      return res.status(404).json({ message: 'No history found' });
    }

    // Return the user's history
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
};
