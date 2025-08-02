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

// @desc    Get tickets for the logged-in user
// @route   GET /api/tickets/mytickets
// @access  Private
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Security Check: Ensure the user is the creator OR an admin/agent
    // This prevents a user from viewing another user's ticket by guessing the ID
    if (ticket.createdBy.toString() !== req.user._id.toString() && req.user.role === 'End User') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // To show user/category names instead of just IDs, we can populate them
    await ticket.populate('createdBy', 'name email');
    await ticket.populate('category', 'name');

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all tickets (for agents/admins)
// @route   GET /api/tickets
// @access  Private/Agent/Admin
const getAllTickets = async (req, res) => {
  try {
    // We can add filtering/pagination logic here later
    const tickets = await Ticket.find({}).populate('createdBy', 'name email');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a ticket's status
// @route   PUT /api/tickets/:id/status
// @access  Private/Agent/Admin
const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = req.body.status || ticket.status;
    
    // You could also update assignedTo here if you want
    // ticket.assignedTo = req.user._id;

    const updatedTicket = await ticket.save();
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { 
    createTicket, 
    getMyTickets, 
    getTicketById,
    getAllTickets,
    updateTicketStatus
};