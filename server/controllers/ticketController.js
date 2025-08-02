import Ticket from '../models/Ticket.js';
import sendEmail from '../utils/sendEmail.js';
import cloudinary from '../config/cloudinary.js';
import DatauriParser from 'datauri/parser.js';
import path from 'path';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { subject, description, category } = req.body;
  
  try {
    let attachmentUrl = '';

    // Check if a file was uploaded
    if (req.file) {
      const parser = new DatauriParser();
      // Format the buffer from multer into a data URI
      const dataUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri.content, {
        resource_type: 'auto', // Automatically detect the file type
      });
      attachmentUrl = result.secure_url;
    }

    const ticket = await Ticket.create({
      subject,
      description,
      category,
      createdBy: req.user._id,
      attachmentUrl: attachmentUrl, // Save the Cloudinary URL
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

// @desc    Get all tickets (for agents/admins) with filtering and sorting
// @route   GET /api/tickets
// @access  Private/Agent/Admin
const getAllTickets = async (req, res) => {
  try {
    // --- Filtering ---
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status; // e.g., ?status=Open
    }
    if (req.query.category) {
      filter.category = req.query.category; // e.g., ?category=63f8a...
    }
    
    // --- Sorting ---
    const sortBy = {};
    if (req.query.sortBy === 'updatedAt') {
      sortBy.updatedAt = -1; // -1 for descending (newest first)
    } else {
      sortBy.createdAt = -1; // Default sort
    }

    // --- Searching (Simple implementation) ---
    if (req.query.search) {
        // This creates a case-insensitive search on the subject field
        filter.subject = { $regex: req.query.search, $options: 'i' };
    }

    const tickets = await Ticket.find(filter)
      .populate('createdBy', 'name email')
      .sort(sortBy);
      
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
    
    // Find the user who created the ticket to get their email
    const ticketCreator = await User.findById(ticket.createdBy);

    // Send email notification
    if (ticketCreator) {
      await sendEmail({
        to: ticketCreator.email,
        subject: `Ticket Status Updated: #${ticket._id}`,
        text: `Hi ${ticketCreator.name},\n\nThe status of your ticket "${ticket.subject}" has been updated to: ${ticket.status}.\n\nThank you,\nThe QuickDesk Team`,
      });
    }

    const updatedTicket = await ticket.save();
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a comment to a ticket
// @route   POST /api/tickets/:id/comments
// @access  Private
const addCommentToTicket = async (req, res) => {
  try {
    const { text } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const comment = {
      text,
      author: req.user._id,
    };

    ticket.comments.push(comment);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Upvote a ticket
// @route   PUT /api/tickets/:id/upvote
// @access  Private
const upvoteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Remove user from downvotes if they exist there
    ticket.downvotes.pull(req.user._id);

    // Add user to upvotes if they are not already there
    if (!ticket.upvotes.includes(req.user._id)) {
      ticket.upvotes.push(req.user._id);
    }

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Downvote a ticket
// @route   PUT /api/tickets/:id/downvote
// @access  Private
const downvoteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Remove user from upvotes if they exist there
    ticket.upvotes.pull(req.user._id);

    // Add user to downvotes if they are not already there
    if (!ticket.downvotes.includes(req.user._id)) {
      ticket.downvotes.push(req.user._id);
    }
    
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Assign a ticket to an agent
// @route   PUT /api/tickets/:id/assign
// @access  Private/Agent/Admin
const assignTicketToAgent = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Assign the ticket to the agent making the request
    ticket.assignedTo = req.user._id;
    ticket.status = 'In Progress'; // Automatically set status to In Progress

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
    updateTicketStatus,
    addCommentToTicket,
    downvoteTicket,
    upvoteTicket,  
    assignTicketToAgent
};