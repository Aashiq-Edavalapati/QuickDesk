import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport.js';

dotenv.config();

// Initialize express app
const app = express();

// Middleware to check whether a request is coming!
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('QuickDesk API is running...');
});

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await connectDb(); // Ensure DB connection is established
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server or connect to database", error);
    process.exit(1); // Exit with failure if startup fails
  }
})();