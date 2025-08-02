import Ticket from '../models/Ticket.js';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { subject, description, category } = req.body;

  try {
    const ticket = await Ticket.create({
      subject,
      description,
      category,
      createdBy: req.user._id, // req.user is available thanks to our 'protect' middleware
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error while creating ticket' });
  }
};

export { createTicket };