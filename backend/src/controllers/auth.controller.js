import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ uid: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login an existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
