import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to protect routes and verify JWT
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Get token from Bearer header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user ID to the request object
    req.user = { id: decoded.uid };

    next();  // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default protect;
