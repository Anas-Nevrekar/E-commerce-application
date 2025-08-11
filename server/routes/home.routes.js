const express = require('express'); // Importing express to create a router
const router = express.Router(); 
const mongoose = require('mongoose'); // Importing mongoose for database operations
const {authMiddleware, generateToken} = require('../middlewares/jwt.middleware'); // Importing the JWT middleware for authentication

//Importing the User model
const User = require('../models/user.model'); // Importing the User model to interact with the

// Importing the controller
const homeController = require('../controllers/home.controller');
router.get('/', authMiddleware, homeController.showHome); // Route to render the home page after authentication


module.exports = router;