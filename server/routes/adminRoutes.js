import express from 'express';
import { 
  getAllUsers, 
  updateUserRole,
  createCategory,
  getAllCategories
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are protected and require admin access
router.use(protect, isAdmin);

// User Management Routes
router.route('/users').get(getAllUsers);
router.route('/users/:id').put(updateUserRole);

// Category Management Routes
router.route('/categories').post(createCategory).get(getAllCategories);

export default router;