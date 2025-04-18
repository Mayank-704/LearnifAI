import mongoose from 'mongoose';

const responseHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    responseText: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ResponseHistory = mongoose.model('ResponseHistory', responseHistorySchema);

export default ResponseHistory;
