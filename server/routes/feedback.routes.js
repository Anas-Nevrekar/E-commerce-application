const express = require('express'); // Importing express to create a router
const router = express.Router(); 
const mongoose = require('mongoose'); // Importing mongoose for database operations
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication
// Importing the controller
const feedbackController = require('../controllers/feedback.controller');

// Defining the routes
router.post('/addFeedback/:id', authMiddleware, feedbackController.addFeedback);

module.exports = router;
