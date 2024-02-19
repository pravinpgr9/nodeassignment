const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const filesRoutes = require('./routes/files');
const errorHandler = require('./middlewares/errorHandler');
const fileValidator = require('./middlewares/fileValidator');

const authenticateUser = require('./middlewares/authMiddleware');
const authorizeUser = require('./middlewares/authzMiddleware');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const app = express();

app.use(express.json());
app.use(errorHandler);

// Use routes
//app.use('/api/users', userRoutes);
//app.use('/api/files', filesRoutes);

// routes for login and register without authentication middleware
app.use('/api/users', userRoutes);

// routes that require authentication and authorization middleware
app.use('/api/files', authenticateUser, filesRoutes);
app.use('/api/users', authenticateUser, authorizeUser, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
