import express from 'express';
import { createTicket, getMyTickets, getTicketById } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for creating a ticket
router.route('/').post(protect, createTicket);

// Route for getting the logged-in user's tickets
router.route('/mytickets').get(protect, getMyTickets);

// Route for getting a single ticket by its ID
router.route('/:id').get(protect, getTicketById);

export default router;