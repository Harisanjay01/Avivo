require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Centralized Error Handling
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`🚀 REST API Server running on http://localhost:${port}`);
});
