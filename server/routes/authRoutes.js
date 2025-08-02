import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';
import passport from 'passport';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// --- Google OAuth Routes ---

// @desc    Auth with Google (the user clicks this first)
// @route   GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Google auth callback (Google redirects to this URL)
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    // On successful authentication, Passport attaches the user to req.user
    // We generate our own JWT and redirect back to the frontend
    generateToken(res, req.user._id);
    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
);

export default router;