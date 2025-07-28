const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
