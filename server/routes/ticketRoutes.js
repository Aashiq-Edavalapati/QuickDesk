import express from 'express';
import { createTicket } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// We apply the 'protect' middleware to this route.
// The request will only reach createTicket if the middleware successfully verifies the user.
router.route('/create').post(protect, createTicket);

export default router;