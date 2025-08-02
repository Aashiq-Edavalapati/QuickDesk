import multer from 'multer';

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage });

export default upload;