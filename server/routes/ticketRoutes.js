import express from 'express';
import { addCommentToTicket, createTicket, downvoteTicket, getAllTickets, getMyTickets, getTicketById, updateTicketStatus, upvoteTicket } from '../controllers/ticketController.js';
import { isAgentOrAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// User Routes
router.route('/create').post(protect, createTicket); // Route for creating a ticket
router.route('/mytickets').get(protect, getMyTickets); // Route for getting the logged-in user's tickets
router.route('/user/:id').get(protect, getTicketById); // Route for getting a single ticket by its ID
router.route('/:id/comments').post(protect, addCommentToTicket); // Route for adding a comment to the ticket with  `id`
router.route('/:id/upvote').put(protect, upvoteTicket); // Route for upvoting a ticket
router.route('/:id/downvote').put(protect, downvoteTicket); // Route for downvoting a ticket

// Agent & Admin Routes
router.route('/get-tickets').get(protect, isAgentOrAdmin, getAllTickets); // Route to get all tickets
router.route('/:id/status').put(protect, isAgentOrAdmin, updateTicketStatus); // Route to update status of the ticket

export default router;