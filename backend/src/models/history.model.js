import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  queryText: {
    type: String,
    required: true, 
  },
  aiResponse: {
    type: String,
    required: true, 
  },
  sourceURL: {
    type: String,
    required: false, 
  },
  method: {
    type: String,
    enum: ['voice', 'text', 'screen'],
    default: 'text', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const History = mongoose.model('History', historySchema);
export default History;
