import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's payload (excluding the password)
      req.user = await User.findById(decoded.userId).select('-password');

      next(); // Move on to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for Agent or Admin roles
const isAgentOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'Support Agent' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Not authorized as an Agent or Admin' });
  }
};

// Middleware to check for Admin roles
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Requires Admin role' });
  }
};

export { 
  protect, 
  isAgentOrAdmin, 
  isAdmin 
};