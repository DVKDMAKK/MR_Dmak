import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/mr_communication_tool?authSource=admin';

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  try {
    await mongoose.connect(mongoURI, options);
    
    logger.info('✅ Connected to MongoDB', { 
      uri: mongoURI.replace(/\/\/.*@/, '//***:***@'), // Hide credentials in logs
      database: mongoose.connection.db?.databaseName 
    });
  } catch (error: any) {
    logger.error('❌ MongoDB connection error:', error);
    // Optional: implement retry logic here
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Attempting to reconnect...');
    // Optional: implement reconnection logic here
  });
};

export default connectDB;
