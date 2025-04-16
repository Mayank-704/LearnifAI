
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true, // Firebase UID
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    voiceAssistant: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    }
  },
  usageStats: {
    totalQueries: {
      type: Number,
      default: 0,
    },
    lastUsed: {
      type: Date,
    }
  }
});

const User = mongoose.model('User', userSchema);
export default User;
