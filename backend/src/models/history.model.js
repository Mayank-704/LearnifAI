// models/History.js
import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const History =  mongoose.model('History', historySchema);
export default History
