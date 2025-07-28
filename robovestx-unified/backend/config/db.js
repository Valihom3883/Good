import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
