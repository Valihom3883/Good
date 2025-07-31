require('dotenv').config();
   const express = require('express');
   const connectDB = require('./config/db');
   const authRoutes = require('./routes/auth');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Connect to database
   connectDB();

   // Middleware
   app.use(express.json());

   // Routes
   app.use('/api', authRoutes);

   app.listen(PORT, () => {
     console.log(`Backend server running on port ${PORT}`);
   });
