import express from 'express';
import { createTicket, getAllTickets, getMyTickets, getTicketById, updateTicketStatus } from '../controllers/ticketController.js';
import { isAgentOrAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// User Routes
router.route('/create').post(protect, createTicket); // Route for creating a ticket
router.route('/mytickets').get(protect, getMyTickets); // Route for getting the logged-in user's tickets
router.route('/user/:id').get(protect, getTicketById); // Route for getting a single ticket by its ID


// Agent & Admin Routes
router.route('/get-tickets').get(protect, isAgentOrAdmin, getAllTickets);
router.route('/:id/status').put(protect, isAgentOrAdmin, updateTicketStatus);

export default router;