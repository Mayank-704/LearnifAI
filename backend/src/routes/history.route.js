import express from 'express';
import History from "./../models/history.model.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router();

// Save question-answer pair
router.post('/save', protectRoute, async (req, res) => {
  const { question, answer } = req.body;

  try {
    const saved = await History.create({
      userId: req.user._id,
      question,
      answer
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving history:', err.message);
    res.status(500).json({ message: 'Failed to save history' });
  }
});

// Fetch user's history
router.get('/gethistory', protectRoute, async (req, res) => {
  try {
    const userHistory = await History.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(userHistory);
  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

// Delete a particular history item
router.delete('/delete/:id', protectRoute, async (req, res) => {
  const { id } = req.params;

  try {
    const historyItem = await History.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!historyItem) {
      return res.status(404).json({ message: 'History item not found' });
    }

    res.json({ message: 'History item deleted successfully' });
  } catch (err) {
    console.error('Error deleting history item:', err.message);
    res.status(500).json({ message: 'Failed to delete history item' });
  }
});


export default router;
