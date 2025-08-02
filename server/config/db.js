import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Try connecting to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Database connection failed: ', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;