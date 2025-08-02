import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// Initialize express app
const app = express();

// Middleware to check whether a request is coming!
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

// 
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